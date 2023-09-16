import { defineComponent, reactive, withAsyncContext, ref, onUpdated, withCtx, unref, createTextVNode, toDisplayString, createVNode, openBlock, createBlock, Fragment, renderList, useSSRContext } from 'vue';
import { j as useRoute, g as useFetch, h as useRuntimeConfig, a as useHead } from '../server.mjs';
import { _ as __nuxt_component_0, a as __nuxt_component_1 } from './Banner-5c317f91.mjs';
import { ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderStyle } from 'vue/server-renderer';
import tocbot from 'tocbot';
import 'ofetch';
import 'hookable';
import 'unctx';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import 'h3';
import 'ufo';
import 'ohash';
import 'defu';
import 'dayjs';
import 'markdown-it';
import 'highlight.js';
import 'markdown-it-link-attributes';
import 'markdown-it-katex';
import 'markdown-it-footnote';
import 'markdown-it-sub';
import 'markdown-it-task-lists';
import 'markdown-it-anchor';
import '@iconify/vue/dist/offline';
import '@iconify/vue';
import '../../nitro/node-server.mjs';
import 'node-fetch-native/polyfill';
import 'node:http';
import 'node:https';
import 'destr';
import 'unenv/runtime/fetch/index';
import 'scule';
import 'unstorage';
import 'radix3';
import 'node:fs';
import 'node:url';
import 'pathe';
import 'ipx';

const removeUndefinedProps = (props) => Object.fromEntries(Object.entries(props).filter(([, value]) => value !== void 0));
const setupForUseMeta = (metaFactory, renderChild) => (props, ctx) => {
  useHead(() => metaFactory({ ...removeUndefinedProps(props), ...ctx.attrs }, ctx));
  return () => {
    var _a, _b;
    return renderChild ? (_b = (_a = ctx.slots).default) == null ? void 0 : _b.call(_a) : null;
  };
};
const Title = /* @__PURE__ */ defineComponent({
  // eslint-disable-next-line vue/no-reserved-component-names
  name: "Title",
  inheritAttrs: false,
  setup: setupForUseMeta((_, { slots }) => {
    var _a, _b, _c;
    const title = ((_c = (_b = (_a = slots.default) == null ? void 0 : _a.call(slots)) == null ? void 0 : _b[0]) == null ? void 0 : _c.children) || null;
    return {
      title
    };
  })
});
const Head = /* @__PURE__ */ defineComponent({
  // eslint-disable-next-line vue/no-reserved-component-names
  name: "Head",
  inheritAttrs: false,
  setup: (_props, ctx) => () => {
    var _a, _b;
    return (_b = (_a = ctx.slots).default) == null ? void 0 : _b.call(_a);
  }
});
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[id]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const config = /* @__PURE__ */ useRuntimeConfig();
    const route = useRoute();
    const postId = route.params.id;
    const postData = reactive({
      post: {},
      categorys: [],
      tags: []
    });
    async function fetchPostData() {
      const { data } = await useFetch(`/post/info/${postId}`, {
        baseURL: config.public.baseUrl
      }, "$ha8dIhfv4Y");
      const res = data.value;
      if (res.code === 200) {
        postData.post = res.data.post;
        postData.categorys = res.data.categorys;
        postData.tags = res.data.tags;
      }
    }
    [__temp, __restore] = withAsyncContext(() => fetchPostData()), await __temp, __restore();
    const post = ref(null);
    onUpdated(() => {
      tocbot.refresh();
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Head = Head;
      const _component_Title = Title;
      const _component_NuxtLayout = __nuxt_component_0;
      const _component_Banner = __nuxt_component_1;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_Head, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Title, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(unref(postData).post.title)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(postData).post.title), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Title, null, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(unref(postData).post.title), 1)
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLayout, { name: "post" }, {
        banner: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Banner, {
              "cover-img": unref(postData).post.coverImg,
              "main-text": unref(postData).post.title
            }, {
              extra: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="text-[14px]"${_scopeId2}><div class="flex justify-center"${_scopeId2}><span${_scopeId2}>\u6807\u7B7E\uFF1A</span><ul class="flex justify-center"${_scopeId2}><!--[-->`);
                  ssrRenderList(unref(postData).tags, (tag) => {
                    _push3(`<li class="mx-1 bg-blue-400/90 px-1 rounded"${_scopeId2}>${ssrInterpolate(tag.tagName)}</li>`);
                  });
                  _push3(`<!--]--></ul></div><div class="flex justify-center my-2"${_scopeId2}><span${_scopeId2}>\u5206\u7C7B\uFF1A</span><ul class="flex justify-center"${_scopeId2}><!--[-->`);
                  ssrRenderList(unref(postData).categorys, (category) => {
                    _push3(`<li class="mx-1 bg-blue-400/90 px-1 rounded"${_scopeId2}>${ssrInterpolate(category.categoryName)}</li>`);
                  });
                  _push3(`<!--]--></ul></div><div class="flex justify-center"${_scopeId2}><span${_scopeId2}>\u53D1\u5E03\u65F6\u95F4\uFF1A</span><div${_scopeId2}>${ssrInterpolate(unref(postData).post.publishTime)}</div></div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "text-[14px]" }, [
                      createVNode("div", { class: "flex justify-center" }, [
                        createVNode("span", null, "\u6807\u7B7E\uFF1A"),
                        createVNode("ul", { class: "flex justify-center" }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(postData).tags, (tag) => {
                            return openBlock(), createBlock("li", {
                              key: tag.id,
                              class: "mx-1 bg-blue-400/90 px-1 rounded"
                            }, toDisplayString(tag.tagName), 1);
                          }), 128))
                        ])
                      ]),
                      createVNode("div", { class: "flex justify-center my-2" }, [
                        createVNode("span", null, "\u5206\u7C7B\uFF1A"),
                        createVNode("ul", { class: "flex justify-center" }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(postData).categorys, (category) => {
                            return openBlock(), createBlock("li", {
                              key: category.id,
                              class: "mx-1 bg-blue-400/90 px-1 rounded"
                            }, toDisplayString(category.categoryName), 1);
                          }), 128))
                        ])
                      ]),
                      createVNode("div", { class: "flex justify-center" }, [
                        createVNode("span", null, "\u53D1\u5E03\u65F6\u95F4\uFF1A"),
                        createVNode("div", null, toDisplayString(unref(postData).post.publishTime), 1)
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Banner, {
                "cover-img": unref(postData).post.coverImg,
                "main-text": unref(postData).post.title
              }, {
                extra: withCtx(() => [
                  createVNode("div", { class: "text-[14px]" }, [
                    createVNode("div", { class: "flex justify-center" }, [
                      createVNode("span", null, "\u6807\u7B7E\uFF1A"),
                      createVNode("ul", { class: "flex justify-center" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(unref(postData).tags, (tag) => {
                          return openBlock(), createBlock("li", {
                            key: tag.id,
                            class: "mx-1 bg-blue-400/90 px-1 rounded"
                          }, toDisplayString(tag.tagName), 1);
                        }), 128))
                      ])
                    ]),
                    createVNode("div", { class: "flex justify-center my-2" }, [
                      createVNode("span", null, "\u5206\u7C7B\uFF1A"),
                      createVNode("ul", { class: "flex justify-center" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(unref(postData).categorys, (category) => {
                          return openBlock(), createBlock("li", {
                            key: category.id,
                            class: "mx-1 bg-blue-400/90 px-1 rounded"
                          }, toDisplayString(category.categoryName), 1);
                        }), 128))
                      ])
                    ]),
                    createVNode("div", { class: "flex justify-center" }, [
                      createVNode("span", null, "\u53D1\u5E03\u65F6\u95F4\uFF1A"),
                      createVNode("div", null, toDisplayString(unref(postData).post.publishTime), 1)
                    ])
                  ])
                ]),
                _: 1
              }, 8, ["cover-img", "main-text"])
            ];
          }
        }),
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="w-[1024px] mx-auto relative left-[40px] flex" style="${ssrRenderStyle({ "min-height": "590px" })}"${_scopeId}><div class="basis-[750px] mx-auto bg-white shadow-md p-8 dark:bg-[#202121] dark:text-white"${_scopeId}><div${_scopeId}><h1${_scopeId}>${ssrInterpolate(unref(postData).post.title)}</h1></div><article id="post-content" class="markdown-body w-[750px]"${_scopeId}>${_ctx.$mdRender(unref(postData).post.mdContent)}</article></div><div class="basis-[300px] ml-[10px] dark:text-white"${_scopeId}><div id="toc" class="sticky top-[100px] h-[500px]"${_scopeId}></div></div></div>`);
          } else {
            return [
              createVNode("div", {
                class: "w-[1024px] mx-auto relative left-[40px] flex",
                style: { "min-height": "590px" }
              }, [
                createVNode("div", { class: "basis-[750px] mx-auto bg-white shadow-md p-8 dark:bg-[#202121] dark:text-white" }, [
                  createVNode("div", null, [
                    createVNode("h1", null, toDisplayString(unref(postData).post.title), 1)
                  ]),
                  createVNode("article", {
                    innerHTML: _ctx.$mdRender(unref(postData).post.mdContent),
                    ref_key: "post",
                    ref: post,
                    id: "post-content",
                    class: "markdown-body w-[750px]"
                  }, null, 8, ["innerHTML"])
                ]),
                createVNode("div", { class: "basis-[300px] ml-[10px] dark:text-white" }, [
                  createVNode("div", {
                    id: "toc",
                    class: "sticky top-[100px] h-[500px]"
                  })
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/post/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_id_-17b32b57.mjs.map
