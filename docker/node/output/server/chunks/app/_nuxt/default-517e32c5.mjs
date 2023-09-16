import { _ as _export_sfc, k as useTagStore, i as useCategoryStore, b as useSettingItem, g as useFetch, d as __nuxt_component_0$1, f as __nuxt_component_2, p as parseSize, a as useHead, h as useRuntimeConfig, e as useNuxtApp } from '../server.mjs';
import { useSSRContext, defineComponent, ref, withAsyncContext, mergeProps, unref, withCtx, createVNode, toDisplayString, computed, h } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderSlot } from 'vue/server-renderer';
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

const useImage = () => {
  return useNuxtApp().$img;
};
const baseImageProps = {
  src: { type: String, required: true },
  format: { type: String, default: void 0 },
  quality: { type: [Number, String], default: void 0 },
  background: { type: String, default: void 0 },
  fit: { type: String, default: void 0 },
  modifiers: { type: Object, default: void 0 },
  preset: { type: String, default: void 0 },
  provider: { type: String, default: void 0 },
  sizes: { type: [Object, String], default: void 0 },
  preload: { type: Boolean, default: void 0 },
  width: { type: [String, Number], default: void 0 },
  height: { type: [String, Number], default: void 0 },
  alt: { type: String, default: void 0 },
  referrerpolicy: { type: String, default: void 0 },
  usemap: { type: String, default: void 0 },
  longdesc: { type: String, default: void 0 },
  ismap: { type: Boolean, default: void 0 },
  loading: { type: String, default: void 0 },
  crossorigin: {
    type: [Boolean, String],
    default: void 0,
    validator: (val) => ["anonymous", "use-credentials", "", true, false].includes(val)
  },
  decoding: {
    type: String,
    default: void 0,
    validator: (val) => ["async", "auto", "sync"].includes(val)
  }
};
const useBaseImage = (props) => {
  const options = computed(() => {
    return {
      provider: props.provider,
      preset: props.preset
    };
  });
  const attrs = computed(() => {
    return {
      width: parseSize(props.width),
      height: parseSize(props.height),
      alt: props.alt,
      referrerpolicy: props.referrerpolicy,
      usemap: props.usemap,
      longdesc: props.longdesc,
      ismap: props.ismap,
      crossorigin: props.crossorigin === true ? "anonymous" : props.crossorigin || void 0,
      loading: props.loading,
      decoding: props.decoding
    };
  });
  const modifiers = computed(() => {
    return {
      ...props.modifiers,
      width: parseSize(props.width),
      height: parseSize(props.height),
      format: props.format,
      quality: props.quality,
      background: props.background,
      fit: props.fit
    };
  });
  return {
    options,
    attrs,
    modifiers
  };
};
const imgProps = {
  ...baseImageProps,
  placeholder: { type: [Boolean, String, Number, Array], default: void 0 }
};
const __nuxt_component_0 = /* @__PURE__ */ defineComponent({
  name: "NuxtImg",
  props: imgProps,
  emits: ["load"],
  setup: (props, ctx) => {
    const $img = useImage();
    const _base = useBaseImage(props);
    const placeholderLoaded = ref(false);
    const sizes = computed(() => $img.getSizes(props.src, {
      ..._base.options.value,
      sizes: props.sizes,
      modifiers: {
        ..._base.modifiers.value,
        width: parseSize(props.width),
        height: parseSize(props.height)
      }
    }));
    const attrs = computed(() => {
      const attrs2 = { ..._base.attrs.value, "data-nuxt-img": "" };
      if (props.sizes) {
        attrs2.sizes = sizes.value.sizes;
        attrs2.srcset = sizes.value.srcset;
      }
      return attrs2;
    });
    const placeholder = computed(() => {
      let placeholder2 = props.placeholder;
      if (placeholder2 === "") {
        placeholder2 = true;
      }
      if (!placeholder2 || placeholderLoaded.value) {
        return false;
      }
      if (typeof placeholder2 === "string") {
        return placeholder2;
      }
      const size = Array.isArray(placeholder2) ? placeholder2 : typeof placeholder2 === "number" ? [placeholder2, placeholder2] : [10, 10];
      return $img(props.src, {
        ..._base.modifiers.value,
        width: size[0],
        height: size[1],
        quality: size[2] || 50
      }, _base.options.value);
    });
    const mainSrc = computed(
      () => props.sizes ? sizes.value.src : $img(props.src, _base.modifiers.value, _base.options.value)
    );
    const src = computed(() => placeholder.value ? placeholder.value : mainSrc.value);
    if (props.preload) {
      const isResponsive = Object.values(sizes.value).every((v) => v);
      useHead({
        link: [{
          rel: "preload",
          as: "image",
          ...!isResponsive ? { href: src.value } : {
            href: sizes.value.src,
            imagesizes: sizes.value.sizes,
            imagesrcset: sizes.value.srcset
          }
        }]
      });
    }
    const imgEl = ref();
    return () => h("img", {
      ref: imgEl,
      key: src.value,
      src: src.value,
      ...attrs.value,
      ...ctx.attrs
    });
  }
});
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "LayoutSider",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const tagStore = useTagStore();
    const categoryStore = useCategoryStore();
    const { tagsMap } = tagStore;
    const { categorysMap } = categoryStore;
    const config = /* @__PURE__ */ useRuntimeConfig();
    const user = ref({});
    async function fetchUserData() {
      const { data } = await useFetch("/user/info", {
        baseURL: config.public.baseUrl
      }, "$LXcVEqOF9D");
      const res = data.value;
      if (res.code === 200) {
        user.value = res.data;
      }
    }
    [__temp, __restore] = withAsyncContext(() => fetchUserData()), await __temp, __restore();
    const [github, email, qq] = useSettingItem(["github", "email", "qq"]);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtImg = __nuxt_component_0;
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_Icon = __nuxt_component_2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "absolute w-[300px] top-4" }, _attrs))}><div class="min-h-[150px] bg-white dark:bg-[#202121] dark:text-white rounded-lg p-2 shadow-sm"><h4>\u4E2A\u4EBA\u4FE1\u606F</h4><div class="items-center flex flex-col"><div class="w-[100px] overflow-hidden rounded-full cursor-pointer">`);
      _push(ssrRenderComponent(_component_NuxtImg, {
        src: unref(user).avatar,
        class: "w-full"
      }, null, _parent));
      _push(`</div><div class="mt-2">${ssrInterpolate(unref(user).nickname)}</div><div class="mt-2">`);
      if (unref(github)) {
        _push(ssrRenderComponent(_component_NuxtLink, {
          class: "cursor-pointer",
          to: unref(github),
          target: "_blank"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_Icon, { name: "mdi:github" }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_Icon, { name: "mdi:github" })
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      if (unref(email)) {
        _push(ssrRenderComponent(_component_NuxtLink, {
          class: "mx-4 cursor-pointer",
          to: `mailto:${unref(email)}`
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_Icon, { name: "mdi:email" }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_Icon, { name: "mdi:email" })
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      if (unref(qq)) {
        _push(ssrRenderComponent(_component_Icon, {
          name: "mdi:qqchat",
          class: "cursor-pointer"
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div><div class="min-h-[150px] bg-white dark:bg-[#202121] dark:text-white mt-4 rounded-lg px-4 py-2 shadow-sm"><h4>\u5206\u7C7B</h4><ul class="mt-4"><!--[-->`);
      ssrRenderList(unref(categorysMap), (category) => {
        _push(`<li>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: `/category/${category[0]}`,
          class: "flex items-center pr-2 py-1 cursor-pointer hover:text-blue-400"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_Icon, {
                name: "fa6-regular:folder",
                size: "20",
                class: "basis-[25px]"
              }, null, _parent2, _scopeId));
              _push2(`<div class="flex flex-1 justify-between"${_scopeId}><span${_scopeId}>${ssrInterpolate(category[0])}</span><span${_scopeId}>${ssrInterpolate(category[1].postCount)}</span></div>`);
            } else {
              return [
                createVNode(_component_Icon, {
                  name: "fa6-regular:folder",
                  size: "20",
                  class: "basis-[25px]"
                }),
                createVNode("div", { class: "flex flex-1 justify-between" }, [
                  createVNode("span", null, toDisplayString(category[0]), 1),
                  createVNode("span", null, toDisplayString(category[1].postCount), 1)
                ])
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</li>`);
      });
      _push(`<!--]--></ul></div><div class="min-h-[150px] bg-white dark:bg-[#202121] dark:text-white mt-4 rounded-lg px-4 py-2 shadow-sm"><h4>\u6807\u7B7E</h4><ul class="flex flex-wrap mt-4"><!--[-->`);
      ssrRenderList(unref(tagsMap), (tag) => {
        _push(`<li class="m-1 cursor-pointer hover:bg-blue-400 hover:text-white px-2 text-[14px] text-slate-500 rounded-full">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: `/tag/${tag[0]}`
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span${_scopeId}>${ssrInterpolate(tag[0])}</span><span${_scopeId}>${ssrInterpolate(`\uFF08${tag[1].postCount}\uFF09`)}</span>`);
            } else {
              return [
                createVNode("span", null, toDisplayString(tag[0]), 1),
                createVNode("span", null, toDisplayString(`\uFF08${tag[1].postCount}\uFF09`), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</li>`);
      });
      _push(`<!--]--></ul></div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/layout/LayoutSider.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_LayoutSider = _sfc_main$1;
  _push(`<!--[-->`);
  ssrRenderSlot(_ctx.$slots, "banner", {}, null, _push, _parent);
  _push(`<div class="flex w-[1124px] mx-auto"><div class="flex-1 pt-4">`);
  ssrRenderSlot(_ctx.$slots, "content", {}, null, _push, _parent);
  _push(`</div><div class="basis-[300px] ml-4 relative">`);
  _push(ssrRenderComponent(_component_LayoutSider, null, null, _parent));
  _push(`</div></div><!--]-->`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _default = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { _default as default };
//# sourceMappingURL=default-517e32c5.mjs.map
