import { _ as __nuxt_component_0, a as __nuxt_component_1 } from './Banner-5c317f91.mjs';
import { a as useHead, b as useSettingItem, e as useNuxtApp, g as useFetch, d as __nuxt_component_0$1, f as __nuxt_component_2, h as useRuntimeConfig } from '../server.mjs';
import { useSSRContext, defineComponent, reactive, withAsyncContext, withCtx, unref, createVNode, mergeProps, createTextVNode, toDisplayString, computed, ref } from 'vue';
import { ssrRenderComponent, ssrRenderStyle, ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderClass } from 'vue/server-renderer';
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

const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "PostArchiveDesc",
  __ssrInlineRender: true,
  props: {
    post: null,
    tags: null,
    categorys: null
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "h-full flex relative" }, _attrs))}><div class="basis-[100px] rounded-lg bg-cover bg-center" style="${ssrRenderStyle({
        backgroundImage: `url(${__props.post.coverImg})`
      })}"></div><div class="flex-1 py-2 ml-2 flex flex-col"><div class="text-[14px] pt-1 basis-[26px] text-slate-600"><span>\u53D1\u5E03\u4E8E</span><span class="ml-2">${ssrInterpolate(_ctx.$timeFormat(__props.post.publishTime, "YYYY-MM-DD HH:mm"))}</span></div><div class="text-[18px] flex-1 flex items-center hover:text-blue-400">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: `/post/${__props.post.id}`
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(__props.post.title)}`);
          } else {
            return [
              createTextVNode(toDisplayString(__props.post.title), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/post/PostArchiveDesc.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "PostTimeLine",
  __ssrInlineRender: true,
  props: {
    postList: { default: () => [] }
  },
  setup(__props) {
    const props = __props;
    const { $timeFormat } = useNuxtApp();
    function showYearAndMonth(currentIndex) {
      if (currentIndex === 0) {
        return $timeFormat(props.postList[0].post.publishTime, "YYYY-MM");
      } else {
        const lastIndex = currentIndex - 1;
        const lastDate = $timeFormat(
          props.postList[lastIndex].post.publishTime,
          "YYYY-MM"
        );
        const currentDate = $timeFormat(
          props.postList[currentIndex].post.publishTime,
          "YYYY-MM"
        );
        if (lastDate !== currentDate) {
          return currentDate;
        }
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_PostArchiveDesc = _sfc_main$3;
      _push(`<ul${ssrRenderAttrs(_attrs)}><!--[-->`);
      ssrRenderList(__props.postList, (item, index) => {
        _push(`<li class="flex"><div class="basis-[120px] text-right text-[20px] font-mono">${ssrInterpolate(showYearAndMonth(index))}</div><div class="flex flex-col items-center basis-[50px]"><div class="flex bg-blue-400 items-center rounded-full w-[16px] h-[16px]"><div class="w-2 h-2 mx-auto bg-white rounded-full"></div></div><div class="w-[2px] flex-1 bg-blue-400 opacity-80 h-[98px]"></div></div><div class="flex-1 h-[100px] mb-6">`);
        _push(ssrRenderComponent(_component_PostArchiveDesc, {
          post: item.post,
          tags: item.tags,
          categorys: item.categorys
        }, null, _parent));
        _push(`</div></li>`);
      });
      _push(`<!--]--></ul>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/post/PostTimeLine.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "Pagination",
  __ssrInlineRender: true,
  props: {
    current: { default: 1 },
    size: null,
    total: null
  },
  emits: ["current-change"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const pages = computed(() => Math.ceil(props.total / props.size));
    const current = ref(props.current);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_2;
      _push(`<ul${ssrRenderAttrs(mergeProps({ class: "flex" }, _attrs))}><li class="${ssrRenderClass([unref(current) === 1 && "cursor-not-allowed opacity-30", "h-8 w-8 mx-1 text-center leading-8 bg-white text-slate-700 rounded cursor-pointer select-none"])}">`);
      _push(ssrRenderComponent(_component_Icon, { name: "ic:outline-keyboard-arrow-left" }, null, _parent));
      _push(`</li><!--[-->`);
      ssrRenderList(unref(pages), (item) => {
        _push(`<li class="${ssrRenderClass([item === unref(current) ? "!bg-green-400 !text-white" : "", "h-8 w-8 mx-1 text-center leading-8 bg-white text-slate-700 ring-green-400 ring-1 rounded cursor-pointer select-none"])}">${ssrInterpolate(item)}</li>`);
      });
      _push(`<!--]--><li class="${ssrRenderClass([unref(current) === unref(pages) && "cursor-not-allowed opacity-30", "h-8 w-8 mx-1 text-center leading-8 bg-white text-slate-700 rounded cursor-pointer select-none"])}">`);
      _push(ssrRenderComponent(_component_Icon, { name: "ic:baseline-keyboard-arrow-right" }, null, _parent));
      _push(`</li></ul>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pagination/Pagination.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "archive",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    useHead({
      title: "\u6587\u7AE0\u5F52\u6863"
    });
    const config = /* @__PURE__ */ useRuntimeConfig();
    const postQuery = reactive({
      current: 1,
      size: 10
    });
    const postData = reactive({
      postList: [],
      total: 0
    });
    const archiveImg = useSettingItem("archiveImg");
    async function fetchPostList() {
      const { data } = await useFetch("/archive/post/list", {
        baseURL: config.public.baseUrl,
        params: {
          ...postQuery
        }
      }, "$rRpWpJrYED");
      const res = data.value;
      if (res.code === 200) {
        postData.total = res.data.total;
        postData.postList = res.data.list;
      }
    }
    [__temp, __restore] = withAsyncContext(() => fetchPostList()), await __temp, __restore();
    function handleCurrentChange(current) {
      postQuery.current = current;
      fetchPostList();
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLayout = __nuxt_component_0;
      const _component_Banner = __nuxt_component_1;
      const _component_PostTimeLine = _sfc_main$2;
      const _component_Pagination = _sfc_main$1;
      _push(ssrRenderComponent(_component_NuxtLayout, _attrs, {
        banner: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Banner, {
              "cover-img": unref(archiveImg),
              "main-text": "\u6587\u7AE0\u5F52\u6863",
              "sub-text": `\u603B\u5171 ${unref(postData).total} \u7BC7\u6587\u7AE0`
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Banner, {
                "cover-img": unref(archiveImg),
                "main-text": "\u6587\u7AE0\u5F52\u6863",
                "sub-text": `\u603B\u5171 ${unref(postData).total} \u7BC7\u6587\u7AE0`
              }, null, 8, ["cover-img", "sub-text"])
            ];
          }
        }),
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="card w-full rounded-lg relative dark:bg-[#202121] dark:text-white" style="${ssrRenderStyle({ "min-height": "590px" })}"${_scopeId}><div class="mb-[60px]"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_PostTimeLine, {
              "post-list": unref(postData).postList
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="absolute bottom-4 left-[100px]"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Pagination, {
              current: unref(postQuery).current,
              size: unref(postQuery).size,
              total: unref(postData).total,
              onCurrentChange: handleCurrentChange
            }, null, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", {
                class: "card w-full rounded-lg relative dark:bg-[#202121] dark:text-white",
                style: { "min-height": "590px" }
              }, [
                createVNode("div", { class: "mb-[60px]" }, [
                  createVNode(_component_PostTimeLine, {
                    "post-list": unref(postData).postList
                  }, null, 8, ["post-list"])
                ]),
                createVNode("div", { class: "absolute bottom-4 left-[100px]" }, [
                  createVNode(_component_Pagination, {
                    current: unref(postQuery).current,
                    size: unref(postQuery).size,
                    total: unref(postData).total,
                    onCurrentChange: handleCurrentChange
                  }, null, 8, ["current", "size", "total"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/archive.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=archive-727fbe2b.mjs.map
