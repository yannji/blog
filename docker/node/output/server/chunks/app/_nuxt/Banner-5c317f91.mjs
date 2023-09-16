import { defineComponent, inject, computed, unref, Transition, useSSRContext, h, mergeProps } from 'vue';
import { j as useRoute, l as appLayoutTransition, m as _wrapIf, _ as _export_sfc, f as __nuxt_component_2 } from '../server.mjs';
import { useRoute as useRoute$1 } from 'vue-router';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderSlot, ssrRenderComponent } from 'vue/server-renderer';

const layouts = {
  default: () => import('./default-517e32c5.mjs').then((m) => m.default || m),
  post: () => import('./post-75ff16bc.mjs').then((m) => m.default || m)
};
const LayoutLoader = /* @__PURE__ */ defineComponent({
  name: "LayoutLoader",
  inheritAttrs: false,
  props: {
    name: String,
    ...{}
  },
  async setup(props, context) {
    const LayoutComponent = await layouts[props.name]().then((r) => r.default || r);
    return () => {
      return h(LayoutComponent, context.attrs, context.slots);
    };
  }
});
const __nuxt_component_0 = /* @__PURE__ */ defineComponent({
  name: "NuxtLayout",
  inheritAttrs: false,
  props: {
    name: {
      type: [String, Boolean, Object],
      default: null
    }
  },
  setup(props, context) {
    const injectedRoute = inject("_route");
    const route = injectedRoute === useRoute() ? useRoute$1() : injectedRoute;
    const layout = computed(() => {
      var _a, _b;
      return (_b = (_a = unref(props.name)) != null ? _a : route.meta.layout) != null ? _b : "default";
    });
    return () => {
      var _a;
      const hasLayout = layout.value && layout.value in layouts;
      const transitionProps = (_a = route.meta.layoutTransition) != null ? _a : appLayoutTransition;
      return _wrapIf(Transition, hasLayout && transitionProps, {
        default: () => _wrapIf(LayoutLoader, hasLayout && {
          key: layout.value,
          name: layout.value,
          ...{},
          ...context.attrs
        }, context.slots).default()
      }).default();
    };
  }
});
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Banner",
  __ssrInlineRender: true,
  props: {
    mainText: { default: "" },
    subText: { default: "" },
    coverImg: { default: "" }
  },
  setup(__props) {
    const route = useRoute();
    const defaultCoverImg = "http://localhost:8888/static/2023-04-15/ddab3e46-1bb2-405d-94b3-bf9b02011ddb-1681543846578.jpg";
    const isIndex = computed(() => route.path === "/");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_2;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "relative",
        id: "cover",
        style: {
          backgroundImage: `url(${__props.coverImg !== "" ? __props.coverImg : defaultCoverImg})`,
          minHeight: unref(isIndex) ? "100vh" : "calc(100vh - 356px)"
        }
      }, _attrs))} data-v-5e78acc7><div class="absolute z-20 left-0 right-0 top-1/2 -translate-y-1/2 text-white select-none" data-v-5e78acc7><div class="w-[1024px] mx-auto" data-v-5e78acc7><div class="text-center text-[40px]" data-v-5e78acc7>${ssrInterpolate(__props.mainText)}</div><div class="text-center text-[18px]" data-v-5e78acc7>${ssrInterpolate(__props.subText)}</div>`);
      ssrRenderSlot(_ctx.$slots, "extra", {}, null, _push, _parent);
      _push(`</div></div>`);
      if (unref(isIndex)) {
        _push(`<div id="arrow" class="absolute -translate-x-1/2 left-1/2 bottom-8 cursor-pointer z-[99]" data-v-5e78acc7>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "material-symbols:keyboard-double-arrow-down-rounded",
          color: "white",
          size: "42"
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/banner/Banner.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-5e78acc7"]]);

export { __nuxt_component_0 as _, __nuxt_component_1 as a };
//# sourceMappingURL=Banner-5c317f91.mjs.map
