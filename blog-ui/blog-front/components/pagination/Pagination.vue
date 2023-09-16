<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    current?: number
    size: number
    total: number
  }>(),
  {
    current: 1,
  }
)

const emits = defineEmits<{
  (event: 'current-change', current: number): void
}>()

const pages = computed(() => Math.ceil(props.total / props.size))
const current = ref(props.current)

function handleClickItem(index: number) {
  if (index === current.value) {
    return
  }
  current.value = index
  emits('current-change', index)
}
</script>

<template>
  <ul class="flex">
    <li
      :class="current === 1 && 'cursor-not-allowed opacity-30'"
      @click="
        () => {
          current !== 1 && handleClickItem(current - 1)
        }
      "
      class="h-8 w-8 mx-1 text-center leading-8 bg-white text-slate-700 rounded cursor-pointer select-none">
      <Icon name="ic:outline-keyboard-arrow-left" />
    </li>
    <li
      v-for="item in pages"
      :key="item"
      @click="handleClickItem(item)"
      :class="item === current ? '!bg-green-400 !text-white' : ''"
      class="h-8 w-8 mx-1 text-center leading-8 bg-white text-slate-700 ring-green-400 ring-1 rounded cursor-pointer select-none">
      {{ item }}
    </li>
    <li
      :class="current === pages && 'cursor-not-allowed opacity-30'"
      @click="
        () => {
          current !== pages && handleClickItem(current + 1)
        }
      "
      class="h-8 w-8 mx-1 text-center leading-8 bg-white text-slate-700 rounded cursor-pointer select-none">
      <Icon name="ic:baseline-keyboard-arrow-right" />
    </li>
  </ul>
</template>
