import { _ as __nuxt_component_0, a as __nuxt_component_1 } from './Banner-5c317f91.mjs';
import { a as useHead, b as useSettingItem } from '../server.mjs';
import { defineComponent, withCtx, unref, createVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderStyle } from 'vue/server-renderer';
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
  __name: "about",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "\u5173\u4E8E"
    });
    const [aboutImg, aboutme] = useSettingItem(["aboutImg", "aboutme"]);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLayout = __nuxt_component_0;
      const _component_Banner = __nuxt_component_1;
      _push(ssrRenderComponent(_component_NuxtLayout, _attrs, {
        banner: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Banner, {
              "cover-img": unref(aboutImg),
              "main-text": "\u5173\u4E8E"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Banner, {
                "cover-img": unref(aboutImg),
                "main-text": "\u5173\u4E8E"
              }, null, 8, ["cover-img"])
            ];
          }
        }),
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="card rounded-lg w-full p-8 dark:bg-[#202121] dark:text-white" style="${ssrRenderStyle({ "min-height": "590px" })}"${_scopeId}><div class="markdown-body"${_scopeId}>${_ctx.$mdRender(unref(aboutme))}</div></div>`);
          } else {
            return [
              createVNode("div", {
                class: "card rounded-lg w-full p-8 dark:bg-[#202121] dark:text-white",
                style: { "min-height": "590px" }
              }, [
                createVNode("div", {
                  class: "markdown-body",
                  innerHTML: _ctx.$mdRender(unref(aboutme))
                }, null, 8, ["innerHTML"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/about.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=about-0ec37915.mjs.map
