globalThis._importMeta_=globalThis._importMeta_||{url:"file:///_entry.js",env:process.env};import 'node-fetch-native/polyfill';
import { Server as Server$1 } from 'node:http';
import { Server } from 'node:https';
import destr from 'destr';
import { defineEventHandler, handleCacheHeaders, createEvent, eventHandler, setHeaders, sendRedirect, proxyRequest, getRequestHeader, setResponseStatus, setResponseHeader, getRequestHeaders, createError, lazyEventHandler, createApp, createRouter as createRouter$1, toNodeListener, fetchWithEvent } from 'h3';
import { createFetch as createFetch$1, Headers } from 'ofetch';
import { createCall, createFetch } from 'unenv/runtime/fetch/index';
import { createHooks } from 'hookable';
import { snakeCase } from 'scule';
import defu, { defuFn } from 'defu';
import { hash } from 'ohash';
import { parseURL, withoutBase, joinURL, withQuery, withLeadingSlash, withoutTrailingSlash } from 'ufo';
import { createStorage, prefixStorage } from 'unstorage';
import { toRouteMatcher, createRouter } from 'radix3';
import { promises } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'pathe';
import { createIPX, createIPXMiddleware } from 'ipx';

const defineAppConfig = (config) => config;

const appConfig0 = defineAppConfig({
  nuxtIcon: {
    size: "30px",
    class: "icon",
    aliases: {
      nuxt: "logos:nuxt-icon"
    }
  }
});

const inlineAppConfig = {};

const appConfig = defuFn(appConfig0, inlineAppConfig);

const _runtimeConfig = {"app":{"baseURL":"/","buildAssetsDir":"/_nuxt/","cdnURL":""},"nitro":{"envPrefix":"NUXT_","routeRules":{"/__nuxt_error":{"cache":false},"/_nuxt/**":{"headers":{"cache-control":"public, max-age=31536000, immutable"}}}},"public":{"baseUrl":"http://192.168.166.110/api"},"ipx":{"dir":"../public","domains":[],"sharp":{},"alias":{}}};
const ENV_PREFIX = "NITRO_";
const ENV_PREFIX_ALT = _runtimeConfig.nitro.envPrefix ?? process.env.NITRO_ENV_PREFIX ?? "_";
overrideConfig(_runtimeConfig);
const runtimeConfig = deepFreeze(_runtimeConfig);
const useRuntimeConfig = () => runtimeConfig;
deepFreeze(appConfig);
function getEnv(key) {
  const envKey = snakeCase(key).toUpperCase();
  return destr(
    process.env[ENV_PREFIX + envKey] ?? process.env[ENV_PREFIX_ALT + envKey]
  );
}
function isObject(input) {
  return typeof input === "object" && !Array.isArray(input);
}
function overrideConfig(obj, parentKey = "") {
  for (const key in obj) {
    const subKey = parentKey ? `${parentKey}_${key}` : key;
    const envValue = getEnv(subKey);
    if (isObject(obj[key])) {
      if (isObject(envValue)) {
        obj[key] = { ...obj[key], ...envValue };
      }
      overrideConfig(obj[key], subKey);
    } else {
      obj[key] = envValue ?? obj[key];
    }
  }
}
function deepFreeze(object) {
  const propNames = Object.getOwnPropertyNames(object);
  for (const name of propNames) {
    const value = object[name];
    if (value && typeof value === "object") {
      deepFreeze(value);
    }
  }
  return Object.freeze(object);
}

const _assets = {

};

function normalizeKey(key) {
  if (!key) {
    return "";
  }
  return key.split("?")[0].replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "");
}

const assets$1 = {
  getKeys() {
    return Promise.resolve(Object.keys(_assets))
  },
  hasItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(id in _assets)
  },
  getItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].import() : null)
  },
  getMeta (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].meta : {})
  }
};

const storage = createStorage({});

storage.mount('/assets', assets$1);

function useStorage(base = "") {
  return base ? prefixStorage(storage, base) : storage;
}

const defaultCacheOptions = {
  name: "_",
  base: "/cache",
  swr: true,
  maxAge: 1
};
function defineCachedFunction(fn, opts = {}) {
  opts = { ...defaultCacheOptions, ...opts };
  const pending = {};
  const group = opts.group || "nitro/functions";
  const name = opts.name || fn.name || "_";
  const integrity = hash([opts.integrity, fn, opts]);
  const validate = opts.validate || (() => true);
  async function get(key, resolver, shouldInvalidateCache) {
    const cacheKey = [opts.base, group, name, key + ".json"].filter(Boolean).join(":").replace(/:\/$/, ":index");
    const entry = await useStorage().getItem(cacheKey) || {};
    const ttl = (opts.maxAge ?? opts.maxAge ?? 0) * 1e3;
    if (ttl) {
      entry.expires = Date.now() + ttl;
    }
    const expired = shouldInvalidateCache || entry.integrity !== integrity || ttl && Date.now() - (entry.mtime || 0) > ttl || !validate(entry);
    const _resolve = async () => {
      const isPending = pending[key];
      if (!isPending) {
        if (entry.value !== void 0 && (opts.staleMaxAge || 0) >= 0 && opts.swr === false) {
          entry.value = void 0;
          entry.integrity = void 0;
          entry.mtime = void 0;
          entry.expires = void 0;
        }
        pending[key] = Promise.resolve(resolver());
      }
      try {
        entry.value = await pending[key];
      } catch (error) {
        if (!isPending) {
          delete pending[key];
        }
        throw error;
      }
      if (!isPending) {
        entry.mtime = Date.now();
        entry.integrity = integrity;
        delete pending[key];
        if (validate(entry)) {
          useStorage().setItem(cacheKey, entry).catch((error) => console.error("[nitro] [cache]", error));
        }
      }
    };
    const _resolvePromise = expired ? _resolve() : Promise.resolve();
    if (opts.swr && entry.value) {
      _resolvePromise.catch(console.error);
      return entry;
    }
    return _resolvePromise.then(() => entry);
  }
  return async (...args) => {
    const shouldBypassCache = opts.shouldBypassCache?.(...args);
    if (shouldBypassCache) {
      return fn(...args);
    }
    const key = await (opts.getKey || getKey)(...args);
    const shouldInvalidateCache = opts.shouldInvalidateCache?.(...args);
    const entry = await get(key, () => fn(...args), shouldInvalidateCache);
    let value = entry.value;
    if (opts.transform) {
      value = await opts.transform(entry, ...args) || value;
    }
    return value;
  };
}
const cachedFunction = defineCachedFunction;
function getKey(...args) {
  return args.length > 0 ? hash(args, {}) : "";
}
function escapeKey(key) {
  return key.replace(/[^\dA-Za-z]/g, "");
}
function defineCachedEventHandler(handler, opts = defaultCacheOptions) {
  const _opts = {
    ...opts,
    getKey: async (event) => {
      const key = await opts.getKey?.(event);
      if (key) {
        return escapeKey(key);
      }
      const url = event.node.req.originalUrl || event.node.req.url;
      const friendlyName = escapeKey(decodeURI(parseURL(url).pathname)).slice(
        0,
        16
      );
      const urlHash = hash(url);
      return `${friendlyName}.${urlHash}`;
    },
    validate: (entry) => {
      if (entry.value.code >= 400) {
        return false;
      }
      if (entry.value.body === void 0) {
        return false;
      }
      return true;
    },
    group: opts.group || "nitro/handlers",
    integrity: [opts.integrity, handler]
  };
  const _cachedHandler = cachedFunction(
    async (incomingEvent) => {
      const reqProxy = cloneWithProxy(incomingEvent.node.req, { headers: {} });
      const resHeaders = {};
      let _resSendBody;
      const resProxy = cloneWithProxy(incomingEvent.node.res, {
        statusCode: 200,
        getHeader(name) {
          return resHeaders[name];
        },
        setHeader(name, value) {
          resHeaders[name] = value;
          return this;
        },
        getHeaderNames() {
          return Object.keys(resHeaders);
        },
        hasHeader(name) {
          return name in resHeaders;
        },
        removeHeader(name) {
          delete resHeaders[name];
        },
        getHeaders() {
          return resHeaders;
        },
        end(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2();
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return this;
        },
        write(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2();
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return this;
        },
        writeHead(statusCode, headers2) {
          this.statusCode = statusCode;
          if (headers2) {
            for (const header in headers2) {
              this.setHeader(header, headers2[header]);
            }
          }
          return this;
        }
      });
      const event = createEvent(reqProxy, resProxy);
      event.context = incomingEvent.context;
      const body = await handler(event) || _resSendBody;
      const headers = event.node.res.getHeaders();
      headers.etag = headers.Etag || headers.etag || `W/"${hash(body)}"`;
      headers["last-modified"] = headers["Last-Modified"] || headers["last-modified"] || (/* @__PURE__ */ new Date()).toUTCString();
      const cacheControl = [];
      if (opts.swr) {
        if (opts.maxAge) {
          cacheControl.push(`s-maxage=${opts.maxAge}`);
        }
        if (opts.staleMaxAge) {
          cacheControl.push(`stale-while-revalidate=${opts.staleMaxAge}`);
        } else {
          cacheControl.push("stale-while-revalidate");
        }
      } else if (opts.maxAge) {
        cacheControl.push(`max-age=${opts.maxAge}`);
      }
      if (cacheControl.length > 0) {
        headers["cache-control"] = cacheControl.join(", ");
      }
      const cacheEntry = {
        code: event.node.res.statusCode,
        headers,
        body
      };
      return cacheEntry;
    },
    _opts
  );
  return defineEventHandler(async (event) => {
    if (opts.headersOnly) {
      if (handleCacheHeaders(event, { maxAge: opts.maxAge })) {
        return;
      }
      return handler(event);
    }
    const response = await _cachedHandler(event);
    if (event.node.res.headersSent || event.node.res.writableEnded) {
      return response.body;
    }
    if (handleCacheHeaders(event, {
      modifiedTime: new Date(response.headers["last-modified"]),
      etag: response.headers.etag,
      maxAge: opts.maxAge
    })) {
      return;
    }
    event.node.res.statusCode = response.code;
    for (const name in response.headers) {
      event.node.res.setHeader(name, response.headers[name]);
    }
    return response.body;
  });
}
function cloneWithProxy(obj, overrides) {
  return new Proxy(obj, {
    get(target, property, receiver) {
      if (property in overrides) {
        return overrides[property];
      }
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      if (property in overrides) {
        overrides[property] = value;
        return true;
      }
      return Reflect.set(target, property, value, receiver);
    }
  });
}
const cachedEventHandler = defineCachedEventHandler;

const config = useRuntimeConfig();
const _routeRulesMatcher = toRouteMatcher(
  createRouter({ routes: config.nitro.routeRules })
);
function createRouteRulesHandler() {
  return eventHandler((event) => {
    const routeRules = getRouteRules(event);
    if (routeRules.headers) {
      setHeaders(event, routeRules.headers);
    }
    if (routeRules.redirect) {
      return sendRedirect(
        event,
        routeRules.redirect.to,
        routeRules.redirect.statusCode
      );
    }
    if (routeRules.proxy) {
      let target = routeRules.proxy.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.proxy._proxyStripBase;
        if (strpBase) {
          targetPath = withoutBase(targetPath, strpBase);
        }
        target = joinURL(target.slice(0, -3), targetPath);
      }
      return proxyRequest(event, target, {
        fetch: $fetch.raw,
        ...routeRules.proxy
      });
    }
  });
}
function getRouteRules(event) {
  event.context._nitro = event.context._nitro || {};
  if (!event.context._nitro.routeRules) {
    const path = new URL(event.node.req.url, "http://localhost").pathname;
    event.context._nitro.routeRules = getRouteRulesForPath(
      withoutBase(path, useRuntimeConfig().app.baseURL)
    );
  }
  return event.context._nitro.routeRules;
}
function getRouteRulesForPath(path) {
  return defu({}, ..._routeRulesMatcher.matchAll(path).reverse());
}

const script = "\"use strict\";const w=window,de=document.documentElement,knownColorSchemes=[\"dark\",\"light\"],preference=window.localStorage.getItem(\"nuxt-color-mode\")||\"system\";let value=preference===\"system\"?getColorScheme():preference;const forcedColorMode=de.getAttribute(\"data-color-mode-forced\");forcedColorMode&&(value=forcedColorMode),addColorScheme(value),w[\"__NUXT_COLOR_MODE__\"]={preference,value,getColorScheme,addColorScheme,removeColorScheme};function addColorScheme(e){const o=\"\"+e+\"\",t=\"\";de.classList?de.classList.add(o):de.className+=\" \"+o,t&&de.setAttribute(\"data-\"+t,e)}function removeColorScheme(e){const o=\"\"+e+\"\",t=\"\";de.classList?de.classList.remove(o):de.className=de.className.replace(new RegExp(o,\"g\"),\"\"),t&&de.removeAttribute(\"data-\"+t)}function prefersColorScheme(e){return w.matchMedia(\"(prefers-color-scheme\"+e+\")\")}function getColorScheme(){if(w.matchMedia&&prefersColorScheme(\"\").media!==\"not all\"){for(const e of knownColorSchemes)if(prefersColorScheme(\":\"+e).matches)return e}return\"light\"}\n";

const _hyUG82u8xT = (function(nitro) {
  nitro.hooks.hook("render:html", (htmlContext) => {
    htmlContext.head.push(`<script>${script}<\/script>`);
  });
});

const plugins = [
  _hyUG82u8xT
];

function hasReqHeader(event, name, includes) {
  const value = getRequestHeader(event, name);
  return value && typeof value === "string" && value.toLowerCase().includes(includes);
}
function isJsonRequest(event) {
  return hasReqHeader(event, "accept", "application/json") || hasReqHeader(event, "user-agent", "curl/") || hasReqHeader(event, "user-agent", "httpie/") || hasReqHeader(event, "sec-fetch-mode", "cors") || event.path.startsWith("/api/") || event.path.endsWith(".json");
}
function normalizeError(error) {
  const cwd = typeof process.cwd === "function" ? process.cwd() : "/";
  const stack = (error.stack || "").split("\n").splice(1).filter((line) => line.includes("at ")).map((line) => {
    const text = line.replace(cwd + "/", "./").replace("webpack:/", "").replace("file://", "").trim();
    return {
      text,
      internal: line.includes("node_modules") && !line.includes(".cache") || line.includes("internal") || line.includes("new Promise")
    };
  });
  const statusCode = error.statusCode || 500;
  const statusMessage = error.statusMessage ?? (statusCode === 404 ? "Not Found" : "");
  const message = error.message || error.toString();
  return {
    stack,
    statusCode,
    statusMessage,
    message
  };
}

const errorHandler = (async function errorhandler(error, event) {
  const { stack, statusCode, statusMessage, message } = normalizeError(error);
  const errorObject = {
    url: event.node.req.url,
    statusCode,
    statusMessage,
    message,
    stack: "",
    data: error.data
  };
  setResponseStatus(event, errorObject.statusCode !== 200 && errorObject.statusCode || 500, errorObject.statusMessage);
  if (error.unhandled || error.fatal) {
    const tags = [
      "[nuxt]",
      "[request error]",
      error.unhandled && "[unhandled]",
      error.fatal && "[fatal]",
      Number(errorObject.statusCode) !== 200 && `[${errorObject.statusCode}]`
    ].filter(Boolean).join(" ");
    console.error(tags, errorObject.message + "\n" + stack.map((l) => "  " + l.text).join("  \n"));
  }
  if (isJsonRequest(event)) {
    setResponseHeader(event, "Content-Type", "application/json");
    event.node.res.end(JSON.stringify(errorObject));
    return;
  }
  const isErrorPage = event.node.req.url?.startsWith("/__nuxt_error");
  const res = !isErrorPage ? await useNitroApp().localFetch(withQuery(joinURL(useRuntimeConfig().app.baseURL, "/__nuxt_error"), errorObject), {
    headers: getRequestHeaders(event),
    redirect: "manual"
  }).catch(() => null) : null;
  if (!res) {
    const { template } = await import('../error-500.mjs');
    setResponseHeader(event, "Content-Type", "text/html;charset=UTF-8");
    event.node.res.end(template(errorObject));
    return;
  }
  for (const [header, value] of res.headers.entries()) {
    setResponseHeader(event, header, value);
  }
  setResponseStatus(event, res.status && res.status !== 200 ? res.status : void 0, res.statusText);
  event.node.res.end(await res.text());
});

const assets = {
  "/.DS_Store": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"1804-c9TyVSVDVvMLwr4RnZbpq7wUsuY\"",
    "mtime": "2023-04-26T13:16:58.144Z",
    "size": 6148,
    "path": "../public/.DS_Store"
  },
  "/favicon.ico": {
    "type": "image/vnd.microsoft.icon",
    "etag": "\"22bb-5HvqmaYg7mxb/0lrg9uUrTiv0x0\"",
    "mtime": "2023-04-26T13:16:58.144Z",
    "size": 8891,
    "path": "../public/favicon.ico"
  },
  "/_nuxt/IconCSS.1b699203.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"102-xiWLXTVYhJMV2E7rLRrHkeIl0NU\"",
    "mtime": "2023-04-26T13:16:58.143Z",
    "size": 258,
    "path": "../public/_nuxt/IconCSS.1b699203.css"
  },
  "/_nuxt/IconCSS.7b140a51.js": {
    "type": "application/javascript",
    "etag": "\"357-tGUZgbH0BfkWBSGSVPLKSBpgaro\"",
    "mtime": "2023-04-26T13:16:58.143Z",
    "size": 855,
    "path": "../public/_nuxt/IconCSS.7b140a51.js"
  },
  "/_nuxt/PostList.aebfc38e.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"76-eH8qMaQ4NUEDAUmXwrhutwowgnk\"",
    "mtime": "2023-04-26T13:16:58.143Z",
    "size": 118,
    "path": "../public/_nuxt/PostList.aebfc38e.css"
  },
  "/_nuxt/PostList.vue.fde46a2a.js": {
    "type": "application/javascript",
    "etag": "\"80d-umFxSO8/fpmiMJnn0VJF/fTL9Po\"",
    "mtime": "2023-04-26T13:16:58.143Z",
    "size": 2061,
    "path": "../public/_nuxt/PostList.vue.fde46a2a.js"
  },
  "/_nuxt/_...notfound_.baec45ac.js": {
    "type": "application/javascript",
    "etag": "\"23c-3T++u5T1Pua8BmEbGbtLYwdwCZY\"",
    "mtime": "2023-04-26T13:16:58.142Z",
    "size": 572,
    "path": "../public/_nuxt/_...notfound_.baec45ac.js"
  },
  "/_nuxt/_id_.8f9d834c.js": {
    "type": "application/javascript",
    "etag": "\"35a2-+NR8IsXfmm9CWbZYnVb5W5d4qXE\"",
    "mtime": "2023-04-26T13:16:58.142Z",
    "size": 13730,
    "path": "../public/_nuxt/_id_.8f9d834c.js"
  },
  "/_nuxt/_id_.a3f27ac8.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"367-83oaVXgZPnJJ+jEIwqJj3fq1gck\"",
    "mtime": "2023-04-26T13:16:58.142Z",
    "size": 871,
    "path": "../public/_nuxt/_id_.a3f27ac8.css"
  },
  "/_nuxt/_name_.24af50cc.js": {
    "type": "application/javascript",
    "etag": "\"4f3-h6enOSLvVJemjdbePGQhx+WI4Sw\"",
    "mtime": "2023-04-26T13:16:58.141Z",
    "size": 1267,
    "path": "../public/_nuxt/_name_.24af50cc.js"
  },
  "/_nuxt/_name_.8ad69b1a.js": {
    "type": "application/javascript",
    "etag": "\"52f-tdNwCNj1y4JZ23V9CpZYHZO4kOM\"",
    "mtime": "2023-04-26T13:16:58.141Z",
    "size": 1327,
    "path": "../public/_nuxt/_name_.8ad69b1a.js"
  },
  "/_nuxt/about.068ae984.js": {
    "type": "application/javascript",
    "etag": "\"283-Ut/uu0KqvvcmPAv1qHvy62QuVFY\"",
    "mtime": "2023-04-26T13:16:58.141Z",
    "size": 643,
    "path": "../public/_nuxt/about.068ae984.js"
  },
  "/_nuxt/archive.6eb3d9b3.js": {
    "type": "application/javascript",
    "etag": "\"fb3-nWaR4upz97ItCSIinzirpFIkGME\"",
    "mtime": "2023-04-26T13:16:58.141Z",
    "size": 4019,
    "path": "../public/_nuxt/archive.6eb3d9b3.js"
  },
  "/_nuxt/categorys.50ff4ea6.js": {
    "type": "application/javascript",
    "etag": "\"673-xJDJLDyvVqLdxoqpfebG3sGPfr4\"",
    "mtime": "2023-04-26T13:16:58.140Z",
    "size": 1651,
    "path": "../public/_nuxt/categorys.50ff4ea6.js"
  },
  "/_nuxt/default.f9cbdf69.js": {
    "type": "application/javascript",
    "etag": "\"1504-c2RXNRTEp1lL6ZnBVSpdj9fdnqY\"",
    "mtime": "2023-04-26T13:16:58.140Z",
    "size": 5380,
    "path": "../public/_nuxt/default.f9cbdf69.js"
  },
  "/_nuxt/entry.5c70c2cd.js": {
    "type": "application/javascript",
    "etag": "\"14c2c7-2XfPN7qm3i2x1Rahf+JnKYgq0iM\"",
    "mtime": "2023-04-26T13:16:58.139Z",
    "size": 1360583,
    "path": "../public/_nuxt/entry.5c70c2cd.js"
  },
  "/_nuxt/entry.b353d97e.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"156ca-VfU9quJ5Miq4xneJah3AZ2BBwm4\"",
    "mtime": "2023-04-26T13:16:58.138Z",
    "size": 87754,
    "path": "../public/_nuxt/entry.b353d97e.css"
  },
  "/_nuxt/error-404.4b4b561a.js": {
    "type": "application/javascript",
    "etag": "\"8ad-Szv0oERy2eeS5Ne+FB7kFHg5oms\"",
    "mtime": "2023-04-26T13:16:58.137Z",
    "size": 2221,
    "path": "../public/_nuxt/error-404.4b4b561a.js"
  },
  "/_nuxt/error-404.cf9c6765.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"e70-WvDTiJM7mOEgUdEbanFaLNSjLfU\"",
    "mtime": "2023-04-26T13:16:58.137Z",
    "size": 3696,
    "path": "../public/_nuxt/error-404.cf9c6765.css"
  },
  "/_nuxt/error-500.3f137fe7.js": {
    "type": "application/javascript",
    "etag": "\"756-vjrsZJIJWUh3m0ycnYgXgSp++x4\"",
    "mtime": "2023-04-26T13:16:58.137Z",
    "size": 1878,
    "path": "../public/_nuxt/error-500.3f137fe7.js"
  },
  "/_nuxt/error-500.90414444.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"7e0-7lv2O7a6PelyR8SImkK1WVkm1pc\"",
    "mtime": "2023-04-26T13:16:58.137Z",
    "size": 2016,
    "path": "../public/_nuxt/error-500.90414444.css"
  },
  "/_nuxt/error-component.0e34f3c4.js": {
    "type": "application/javascript",
    "etag": "\"45e-Kc8K8xJzLJNC0Wuik4ak4biSNt8\"",
    "mtime": "2023-04-26T13:16:58.136Z",
    "size": 1118,
    "path": "../public/_nuxt/error-component.0e34f3c4.js"
  },
  "/_nuxt/index.2c2c61d5.js": {
    "type": "application/javascript",
    "etag": "\"4a4-+Ax7rwEFjWzcBbZGSBKHwwAL/tY\"",
    "mtime": "2023-04-26T13:16:58.136Z",
    "size": 1188,
    "path": "../public/_nuxt/index.2c2c61d5.js"
  },
  "/_nuxt/index.554071c3.js": {
    "type": "application/javascript",
    "etag": "\"faf4f-JTs1tSomFiwP64Q359zLf3DvA2s\"",
    "mtime": "2023-04-26T13:16:58.136Z",
    "size": 1027919,
    "path": "../public/_nuxt/index.554071c3.js"
  },
  "/_nuxt/layout.9544c140.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"182-5YWe5pP573ynVqDUX20Oz5VRNdE\"",
    "mtime": "2023-04-26T13:16:58.134Z",
    "size": 386,
    "path": "../public/_nuxt/layout.9544c140.css"
  },
  "/_nuxt/layout.9bb81d54.js": {
    "type": "application/javascript",
    "etag": "\"6b7-ePuLDoregrBjN70mpzXJMvNbF1Y\"",
    "mtime": "2023-04-26T13:16:58.134Z",
    "size": 1719,
    "path": "../public/_nuxt/layout.9bb81d54.js"
  },
  "/_nuxt/markdown.147f68c3.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"5661-ybe0HSbwGkbYbhKFCWDnw9phTN4\"",
    "mtime": "2023-04-26T13:16:58.134Z",
    "size": 22113,
    "path": "../public/_nuxt/markdown.147f68c3.css"
  },
  "/_nuxt/post.c1e7cbbf.js": {
    "type": "application/javascript",
    "etag": "\"10e-w7Gz52CHA306SGvkXZEhI0DfIwk\"",
    "mtime": "2023-04-26T13:16:58.133Z",
    "size": 270,
    "path": "../public/_nuxt/post.c1e7cbbf.js"
  },
  "/_nuxt/tags.a939e9cc.js": {
    "type": "application/javascript",
    "etag": "\"5f7-noHeGfSstvU3avl0bJyY/fSIQHc\"",
    "mtime": "2023-04-26T13:16:58.123Z",
    "size": 1527,
    "path": "../public/_nuxt/tags.a939e9cc.js"
  }
};

function readAsset (id) {
  const serverDir = dirname(fileURLToPath(globalThis._importMeta_.url));
  return promises.readFile(resolve(serverDir, assets[id].path))
}

const publicAssetBases = {"/_nuxt":{"maxAge":31536000}};

function isPublicAssetURL(id = '') {
  if (assets[id]) {
    return true
  }
  for (const base in publicAssetBases) {
    if (id.startsWith(base)) { return true }
  }
  return false
}

function getAsset (id) {
  return assets[id]
}

const METHODS = /* @__PURE__ */ new Set(["HEAD", "GET"]);
const EncodingMap = { gzip: ".gz", br: ".br" };
const _f4b49z = eventHandler((event) => {
  if (event.node.req.method && !METHODS.has(event.node.req.method)) {
    return;
  }
  let id = decodeURIComponent(
    withLeadingSlash(
      withoutTrailingSlash(parseURL(event.node.req.url).pathname)
    )
  );
  let asset;
  const encodingHeader = String(
    event.node.req.headers["accept-encoding"] || ""
  );
  const encodings = [
    ...encodingHeader.split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort(),
    ""
  ];
  if (encodings.length > 1) {
    event.node.res.setHeader("Vary", "Accept-Encoding");
  }
  for (const encoding of encodings) {
    for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
      const _asset = getAsset(_id);
      if (_asset) {
        asset = _asset;
        id = _id;
        break;
      }
    }
  }
  if (!asset) {
    if (isPublicAssetURL(id)) {
      event.node.res.removeHeader("cache-control");
      throw createError({
        statusMessage: "Cannot find static asset " + id,
        statusCode: 404
      });
    }
    return;
  }
  const ifNotMatch = event.node.req.headers["if-none-match"] === asset.etag;
  if (ifNotMatch) {
    event.node.res.statusCode = 304;
    event.node.res.end();
    return;
  }
  const ifModifiedSinceH = event.node.req.headers["if-modified-since"];
  const mtimeDate = new Date(asset.mtime);
  if (ifModifiedSinceH && asset.mtime && new Date(ifModifiedSinceH) >= mtimeDate) {
    event.node.res.statusCode = 304;
    event.node.res.end();
    return;
  }
  if (asset.type && !event.node.res.getHeader("Content-Type")) {
    event.node.res.setHeader("Content-Type", asset.type);
  }
  if (asset.etag && !event.node.res.getHeader("ETag")) {
    event.node.res.setHeader("ETag", asset.etag);
  }
  if (asset.mtime && !event.node.res.getHeader("Last-Modified")) {
    event.node.res.setHeader("Last-Modified", mtimeDate.toUTCString());
  }
  if (asset.encoding && !event.node.res.getHeader("Content-Encoding")) {
    event.node.res.setHeader("Content-Encoding", asset.encoding);
  }
  if (asset.size > 0 && !event.node.res.getHeader("Content-Length")) {
    event.node.res.setHeader("Content-Length", asset.size);
  }
  return readAsset(id);
});

const _BKNqlJ = lazyEventHandler(() => {
  const opts = useRuntimeConfig().ipx;
  const ipxOptions = {
    ...opts || {},
    dir: fileURLToPath(new URL(opts.dir, globalThis._importMeta_.url))
  };
  const ipx = createIPX(ipxOptions);
  const middleware = createIPXMiddleware(ipx);
  return eventHandler(async (event) => {
    event.node.req.url = withLeadingSlash(event.context.params._);
    await middleware(event.node.req, event.node.res);
  });
});

const _lazy_2lZKKx = () => import('../handlers/renderer.mjs');

const handlers = [
  { route: '', handler: _f4b49z, lazy: false, middleware: true, method: undefined },
  { route: '/__nuxt_error', handler: _lazy_2lZKKx, lazy: true, middleware: false, method: undefined },
  { route: '/_ipx/**', handler: _BKNqlJ, lazy: false, middleware: false, method: undefined },
  { route: '/**', handler: _lazy_2lZKKx, lazy: true, middleware: false, method: undefined }
];

function createNitroApp() {
  const config = useRuntimeConfig();
  const hooks = createHooks();
  const h3App = createApp({
    debug: destr(false),
    onError: errorHandler
  });
  const router = createRouter$1();
  h3App.use(createRouteRulesHandler());
  const localCall = createCall(toNodeListener(h3App));
  const localFetch = createFetch(localCall, globalThis.fetch);
  const $fetch = createFetch$1({
    fetch: localFetch,
    Headers,
    defaults: { baseURL: config.app.baseURL }
  });
  globalThis.$fetch = $fetch;
  h3App.use(
    eventHandler((event) => {
      const envContext = event.node.req.__unenv__;
      if (envContext) {
        Object.assign(event.context, envContext);
      }
      event.fetch = (req, init) => fetchWithEvent(event, req, init, { fetch: localFetch });
      event.$fetch = (req, init) => fetchWithEvent(event, req, init, { fetch: $fetch });
    })
  );
  for (const h of handlers) {
    let handler = h.lazy ? lazyEventHandler(h.handler) : h.handler;
    if (h.middleware || !h.route) {
      const middlewareBase = (config.app.baseURL + (h.route || "/")).replace(
        /\/+/g,
        "/"
      );
      h3App.use(middlewareBase, handler);
    } else {
      const routeRules = getRouteRulesForPath(
        h.route.replace(/:\w+|\*\*/g, "_")
      );
      if (routeRules.cache) {
        handler = cachedEventHandler(handler, {
          group: "nitro/routes",
          ...routeRules.cache
        });
      }
      router.use(h.route, handler, h.method);
    }
  }
  h3App.use(config.app.baseURL, router);
  const app = {
    hooks,
    h3App,
    router,
    localCall,
    localFetch
  };
  for (const plugin of plugins) {
    plugin(app);
  }
  return app;
}
const nitroApp = createNitroApp();
const useNitroApp = () => nitroApp;

const cert = process.env.NITRO_SSL_CERT;
const key = process.env.NITRO_SSL_KEY;
const server = cert && key ? new Server({ key, cert }, toNodeListener(nitroApp.h3App)) : new Server$1(toNodeListener(nitroApp.h3App));
const port = destr(process.env.NITRO_PORT || process.env.PORT) || 3e3;
const host = process.env.NITRO_HOST || process.env.HOST;
const s = server.listen(port, host, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  const protocol = cert && key ? "https" : "http";
  const i = s.address();
  const baseURL = (useRuntimeConfig().app.baseURL || "").replace(/\/$/, "");
  const url = `${protocol}://${i.family === "IPv6" ? `[${i.address}]` : i.address}:${i.port}${baseURL}`;
  console.log(`Listening ${url}`);
});
{
  process.on(
    "unhandledRejection",
    (err) => console.error("[nitro] [dev] [unhandledRejection] " + err)
  );
  process.on(
    "uncaughtException",
    (err) => console.error("[nitro] [dev] [uncaughtException] " + err)
  );
}
const nodeServer = {};

export { useRuntimeConfig as a, getRouteRules as g, nodeServer as n, useNitroApp as u };
//# sourceMappingURL=node-server.mjs.map
