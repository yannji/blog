<script lang="ts" setup>
import '@/assets/style/markdown.scss'
useHead({
  title: '关于',
})

const [aboutImg, aboutme] = useSettingItem(['aboutImg', 'aboutme'])
</script>

<template>
  <NuxtLayout>
    <template #banner
      ><Banner :cover-img="aboutImg" main-text="关于"
    /></template>
    <template #content>
      <div
        class="card rounded-lg w-full p-8 dark:bg-[#202121] dark:text-white"
        style="min-height: 590px">
        <div class="markdown-body" v-html="$mdRender(aboutme)"></div></div
    ></template>
  </NuxtLayout>
</template>
