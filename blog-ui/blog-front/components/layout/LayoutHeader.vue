<script lang="ts" setup>
interface LinkItem {
  text: string
  url: string
  icon: string
}
const links: LinkItem[] = [
  { text: '首页', url: '/', icon: 'solar:battery-charge-minimalistic-linear' },
  { text: '归档', url: '/archive', icon: 'solar:bag-3-linear' },
  { text: '分类', url: '/categorys', icon: 'solar:card-recive-linear' },
  { text: '标签', url: '/tags', icon: 'solar:bookmark-circle-linear' },
  { text: '关于', url: '/about', icon: 'solar:cup-hot-linear' },
]
</script>

<template>
  <div
    class="bg-white/80 dark:bg-black/80 dark:text-white h-[56px] fixed top-0 left-0 right-0 z-[100000] shadow-md select-none">
    <div class="w-[1124px] h-full m-auto flex items-center">
      <LayoutLogo />
      <ul class="flex flex-1">
        <li v-for="(item, index) in links" :key="index" class="px-4">
          <LayoutLink :text="item.text" :url="item.url" :icon="item.icon" />
        </li>
      </ul>
      <div class="basis-[200px] inline-block">
        <ColorMode />
      </div>
    </div>
  </div>
</template>
