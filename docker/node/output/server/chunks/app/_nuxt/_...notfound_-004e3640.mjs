import { a as useHead } from '../server.mjs';
import { defineComponent, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs } from 'vue/server-renderer';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[...notfound]",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "\u672A\u77E5\u9875\u9762"
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "absolute left-1/2 top-1/3 -translate-x-1/2 flex flex-col items-center" }, _attrs))}><p class="text-[30px]">\u6765\u5230\u4E86\u672A\u77E5\u9875\u9762\u54E6</p><div class="mt-4"><button class="primary-btn px-6 mr-2"> \u8FD4\u56DE\u9996\u9875 </button><button class="primary-btn"> \u8FD4\u56DE\u4E0A\u4E00\u9875 </button></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/[...notfound].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_...notfound_-004e3640.mjs.map
