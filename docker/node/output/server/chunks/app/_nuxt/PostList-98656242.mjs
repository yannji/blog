import { d as __nuxt_component_0$1, _ as _export_sfc } from '../server.mjs';
import { useSSRContext, defineComponent, mergeProps, withCtx, createVNode, toDisplayString } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent, ssrRenderStyle, ssrInterpolate } from 'vue/server-renderer';

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "PostDesc",
  __ssrInlineRender: true,
  props: {
    post: null,
    tags: null,
    categorys: null
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "h-[200px] w-full rounded-md overflow-hidden mx-auto bg-white flex shadow-xl" }, _attrs))} data-v-7da0eaab><div class="basis-[350px] overflow-hidden" data-v-7da0eaab>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: `/post/${__props.post.id}`
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="w-full h-full cursor-pointer bg-no-repeat bg-center bg-cover hover:scale-[1.3] transition-transform duration-1000" style="${ssrRenderStyle({ backgroundImage: `url('${__props.post.coverImg}')` })}" data-v-7da0eaab${_scopeId}></div>`);
          } else {
            return [
              createVNode("div", {
                class: "w-full h-full cursor-pointer bg-no-repeat bg-center bg-cover hover:scale-[1.3] transition-transform duration-1000",
                style: { backgroundImage: `url('${__props.post.coverImg}')` }
              }, null, 4)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="flex-1 relative dark:bg-[#202121] dark:text-white" data-v-7da0eaab>`);
      if (__props.post.isTop === 1) {
        _push(`<div class="absolute select-none bg-red-400 text-white px-2 rounded-bl-lg top-0 right-0" data-v-7da0eaab> \u7F6E\u9876 </div>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: `/post/${__props.post.id}`,
        class: "hover:text-blue-400 inline-block"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h4 class="mt-2 pl-4" data-v-7da0eaab${_scopeId}>${ssrInterpolate(__props.post.title)}</h4>`);
          } else {
            return [
              createVNode("h4", { class: "mt-2 pl-4" }, toDisplayString(__props.post.title), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="text-[14px] pl-4" data-v-7da0eaab><span data-v-7da0eaab>\u53D1\u5E03\u4E8E</span><span class="ml-2" data-v-7da0eaab>${ssrInterpolate(_ctx.$timeFormat(__props.post.publishTime, "YYYY-MM-DD HH:mm"))}</span></div><div class="overflow-hidden text-ellipsis px-4 py-1 h-[100px] text-slate-600 dark:text-white brief-content" data-v-7da0eaab>${ssrInterpolate(_ctx.$deleteHTMLTag(__props.post.mdContent))}</div><ul class="flex absolute bottom-2 pl-4 text-[12px]" data-v-7da0eaab><!--[-->`);
      ssrRenderList(__props.categorys, (category, index) => {
        _push(`<li class="mx-1 bg-blue-400 dark:bg-green-400 text-white px-2 rounded-md" data-v-7da0eaab>${ssrInterpolate(category.categoryName)}</li>`);
      });
      _push(`<!--]--></ul></div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/post/PostDesc.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-7da0eaab"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "PostList",
  __ssrInlineRender: true,
  props: {
    postList: { default: () => [] }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_PostDesc = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "w-full" }, _attrs))}><ul><!--[-->`);
      ssrRenderList(__props.postList, (item) => {
        _push(`<li class="my-4 overflow-hidden first:mt-0 shadow-md">`);
        _push(ssrRenderComponent(_component_PostDesc, {
          tags: item.tags,
          categorys: item.categorys,
          post: item.post
        }, null, _parent));
        _push(`</li>`);
      });
      _push(`<!--]--></ul></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/post/PostList.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=PostList-98656242.mjs.map
