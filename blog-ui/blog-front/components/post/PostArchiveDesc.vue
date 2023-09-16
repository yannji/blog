<script lang="ts" setup>
defineProps<{
  post: any
  tags: any[]
  categorys: any[]
}>()
</script>

<template>
  <div class="h-full flex relative">
    <div
      class="basis-[100px] rounded-lg bg-cover bg-center"
      :style="{
        backgroundImage: `url(${post.coverImg})`,
      }"></div>
    <div class="flex-1 py-2 ml-2 flex flex-col">
      <div class="text-[14px] pt-1 basis-[26px] text-slate-600">
        <span>发布于</span>
        <span class="ml-2">{{
          $timeFormat(post.publishTime, 'YYYY-MM-DD HH:mm')
        }}</span>
      </div>
      <div class="text-[18px] flex-1 flex items-center hover:text-blue-400">
        <NuxtLink :to="`/post/${post.id}`">{{ post.title }}</NuxtLink>
      </div>
    </div>
  </div>
</template>
