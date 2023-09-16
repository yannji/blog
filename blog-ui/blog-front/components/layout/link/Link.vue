<script lang="ts" setup>
const props = defineProps<{
  text: string
  url: string
  icon: string
}>()

const { currentRoute } = useRouter()
const isActived = computed(() => currentRoute.value.path == props.url)
</script>

<template>
  <div
    class="inline-block"
    :class="
      isActived
        ? 'text-blue-400 dark:text-green-400'
        : 'text-slate-500 dark:text-white'
    ">
    <NuxtLink
      :to="url"
      class="py-2 inline-block hover:scale-105 transition-transform duration-200"
      ><div class="inline-block pr-2">
        <Icon :name="icon" />
      </div>
      <span class="text-[18px] align-bottom">{{ text }}</span></NuxtLink
    >
  </div>
</template>
