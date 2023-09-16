import { _ as __nuxt_component_0, a as __nuxt_component_1 } from './Banner-5c317f91.mjs';
import { a as useHead, i as useCategoryStore, b as useSettingItem, d as __nuxt_component_0$1 } from '../server.mjs';
import { defineComponent, ref, withCtx, unref, createVNode, createTextVNode, toDisplayString, openBlock, createBlock, Fragment, renderList, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderStyle, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import 'vue-router';
import 'ofetch';
import 'hookable';
import 'unctx';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "categorys",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "\u6587\u7AE0\u5206\u7C7B"
    });
    const categoryStore = useCategoryStore();
    const { categorysMap } = categoryStore;
    const categoryImg = useSettingItem("categoryImg");
    const echartContainer = ref(null);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLayout = __nuxt_component_0;
      const _component_Banner = __nuxt_component_1;
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(ssrRenderComponent(_component_NuxtLayout, _attrs, {
        banner: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Banner, {
              "cover-img": unref(categoryImg),
              "main-text": "\u6587\u7AE0\u5206\u7C7B"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Banner, {
                "cover-img": unref(categoryImg),
                "main-text": "\u6587\u7AE0\u5206\u7C7B"
              }, null, 8, ["cover-img"])
            ];
          }
        }),
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="w-full rounded-lg card mx-auto dark:bg-[#202121]" style="${ssrRenderStyle({ "min-height": "590px" })}"${_scopeId}><div class="h-[510px] w-full"${_scopeId}></div><ul class="flex justify-center flex-wrap"${_scopeId}><!--[-->`);
            ssrRenderList(unref(categorysMap), (item, index) => {
              _push2(`<li class="my-2 mx-3 text-slate-500 px-2 py-[1px] text-[18px] relative cursor-pointer hover:text-blue-400"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_NuxtLink, {
                to: `/category/${item[0]}`
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(item[0])}<span class="absolute -top-2 -right-2"${_scopeId2}>${ssrInterpolate(item[1].postCount)}</span>`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(item[0]), 1),
                      createVNode("span", { class: "absolute -top-2 -right-2" }, toDisplayString(item[1].postCount), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`</li>`);
            });
            _push2(`<!--]--></ul></div>`);
          } else {
            return [
              createVNode("div", {
                class: "w-full rounded-lg card mx-auto dark:bg-[#202121]",
                style: { "min-height": "590px" }
              }, [
                createVNode("div", {
                  ref_key: "echartContainer",
                  ref: echartContainer,
                  class: "h-[510px] w-full"
                }, null, 512),
                createVNode("ul", { class: "flex justify-center flex-wrap" }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(unref(categorysMap), (item, index) => {
                    return openBlock(), createBlock("li", {
                      key: index,
                      class: "my-2 mx-3 text-slate-500 px-2 py-[1px] text-[18px] relative cursor-pointer hover:text-blue-400"
                    }, [
                      createVNode(_component_NuxtLink, {
                        to: `/category/${item[0]}`
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(item[0]), 1),
                          createVNode("span", { class: "absolute -top-2 -right-2" }, toDisplayString(item[1].postCount), 1)
                        ]),
                        _: 2
                      }, 1032, ["to"])
                    ]);
                  }), 128))
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/categorys.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=categorys-a6a3c511.mjs.map
