<script lang="ts" setup>
defineProps<{
  post: any
  tags: any[]
  categorys: any[]
}>()
</script>

<template>
  <div
    class="h-[200px] w-full rounded-md overflow-hidden mx-auto bg-white flex shadow-xl">
    <div class="basis-[350px] overflow-hidden">
      <NuxtLink :to="`/post/${post.id}`">
        <div
          class="w-full h-full cursor-pointer bg-no-repeat bg-center bg-cover hover:scale-[1.3] transition-transform duration-1000"
          :style="{ backgroundImage: `url('${post.coverImg}')` }"></div>
      </NuxtLink>
    </div>
    <div class="flex-1 relative dark:bg-[#202121] dark:text-white">
      <div
        v-if="post.isTop === 1"
        class="absolute select-none bg-red-400 text-white px-2 rounded-bl-lg top-0 right-0">
        置顶
      </div>
      <NuxtLink
        :to="`/post/${post.id}`"
        class="hover:text-blue-400 inline-block">
        <h4 class="mt-2 pl-4">
          {{ post.title }}
        </h4></NuxtLink
      >
      <div class="text-[14px] pl-4">
        <span>发布于</span>
        <span class="ml-2">{{
          $timeFormat(post.publishTime, 'YYYY-MM-DD HH:mm')
        }}</span>
      </div>
      <div
        class="overflow-hidden text-ellipsis px-4 py-1 h-[100px] text-slate-600 dark:text-white brief-content">
        {{ $deleteHTMLTag(post.mdContent) }}
      </div>
      <ul class="flex absolute bottom-2 pl-4 text-[12px]">
        <li
          v-for="(category, index) in categorys"
          :key="index"
          class="mx-1 bg-blue-400 dark:bg-green-400 text-white px-2 rounded-md">
          {{ category.categoryName }}
        </li>
      </ul>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.brief-content {
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  text-indent: 2em;
}
</style>
