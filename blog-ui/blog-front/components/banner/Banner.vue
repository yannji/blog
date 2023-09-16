<script lang="ts" setup>
withDefaults(
  defineProps<{
    mainText?: string
    subText?: string
    coverImg?: string
  }>(),
  {
    mainText: '',
    subText: '',
    coverImg: '',
  }
)

const route = useRoute()

const defaultCoverImg =
  'http://localhost:8888/static/2023-04-15/ddab3e46-1bb2-405d-94b3-bf9b02011ddb-1681543846578.jpg'

const isIndex = computed(() => route.path === '/')
</script>

<template>
  <div
    class="relative"
    id="cover"
    :style="{
      backgroundImage: `url(${coverImg !== '' ? coverImg : defaultCoverImg})`,
      minHeight: isIndex ? '100vh' : 'calc(100vh - 356px)',
    }">
    <div
      class="absolute z-20 left-0 right-0 top-1/2 -translate-y-1/2 text-white select-none">
      <div class="w-[1024px] mx-auto">
        <div class="text-center text-[40px]">{{ mainText }}</div>
        <div class="text-center text-[18px]">{{ subText }}</div>
        <slot name="extra"></slot>
      </div>
    </div>
    <template v-if="isIndex">
      <div
        id="arrow"
        class="absolute -translate-x-1/2 left-1/2 bottom-8 cursor-pointer z-[99]">
        <Icon
          name="material-symbols:keyboard-double-arrow-down-rounded"
          color="white"
          size="42" />
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
#cover {
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% 50%;

  &::after {
    content: '';
    position: absolute;
    z-index: 10;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(11, 11, 11, 0.2);
  }
}

#arrow {
  animation: arrow 0.7s linear 0s infinite alternate;
}

@keyframes arrow {
  0% {
  }
  100% {
    transform: translateX(-50%) translateY(12px);
  }
}
</style>
