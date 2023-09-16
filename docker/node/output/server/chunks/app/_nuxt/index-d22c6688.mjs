import { _ as __nuxt_component_0, a as __nuxt_component_1 } from './Banner-5c317f91.mjs';
import { _ as _sfc_main$1 } from './PostList-98656242.mjs';
import { a as useHead, b as useSettingItem, g as useFetch, h as useRuntimeConfig } from '../server.mjs';
import { defineComponent, reactive, computed, withAsyncContext, withCtx, unref, createVNode, openBlock, createBlock, useSSRContext } from 'vue';
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
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    useHead({
      title: "\u9996\u9875"
    });
    const config = /* @__PURE__ */ useRuntimeConfig();
    const [indexImg, indexText] = useSettingItem(["indexImg", "indexText"]);
    const postData = reactive({
      postList: [],
      total: 0
    });
    const queryData = reactive({
      current: 0,
      size: 10
    });
    const hasMore = computed(() => postData.postList.length !== postData.total);
    async function loadPost() {
      queryData.current = queryData.current + 1;
      const { data } = await useFetch("/post/list", {
        baseURL: config.public.baseUrl,
        query: { ...queryData }
      }, "$pqtWcjQkdb");
      console.log(data);
      const { total, list } = data.value.data;
      postData.total = total;
      postData.postList = [...postData.postList, ...list];
    }
    [__temp, __restore] = withAsyncContext(() => loadPost()), await __temp, __restore();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLayout = __nuxt_component_0;
      const _component_Banner = __nuxt_component_1;
      const _component_PostList = _sfc_main$1;
      _push(ssrRenderComponent(_component_NuxtLayout, _attrs, {
        banner: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Banner, {
              "cover-img": unref(indexImg),
              "main-text": unref(indexText)
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Banner, {
                "cover-img": unref(indexImg),
                "main-text": unref(indexText)
              }, null, 8, ["cover-img", "main-text"])
            ];
          }
        }),
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="w-full" style="${ssrRenderStyle({ "min-height": "560px" })}"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_PostList, {
              "post-list": unref(postData).postList
            }, null, _parent2, _scopeId));
            _push2(`<div class="text-center mt-4"${_scopeId}>`);
            if (unref(hasMore)) {
              _push2(`<button class="primary-btn"${_scopeId}> \u52A0\u8F7D\u66F4\u591A </button>`);
            } else {
              _push2(`<span class="text-slate-600"${_scopeId}>\u5DF2\u7ECF\u5230\u5E95\u4E86...</span>`);
            }
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", {
                class: "w-full",
                style: { "min-height": "560px" }
              }, [
                createVNode(_component_PostList, {
                  "post-list": unref(postData).postList
                }, null, 8, ["post-list"]),
                createVNode("div", { class: "text-center mt-4" }, [
                  unref(hasMore) ? (openBlock(), createBlock("button", {
                    key: 0,
                    class: "primary-btn",
                    onClick: loadPost
                  }, " \u52A0\u8F7D\u66F4\u591A ")) : (openBlock(), createBlock("span", {
                    key: 1,
                    class: "text-slate-600"
                  }, "\u5DF2\u7ECF\u5230\u5E95\u4E86..."))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-d22c6688.mjs.map
