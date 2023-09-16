<script setup lang="ts">
useHead({
  title: '未知页面',
})
</script>

<template>
  <div
    class="absolute left-1/2 top-1/3 -translate-x-1/2 flex flex-col items-center">
    <p class="text-[30px]">来到了未知页面哦</p>
    <div class="mt-4">
      <button class="primary-btn px-6 mr-2" @click="() => $router.push(`/`)">
        返回首页
      </button>
      <button class="primary-btn" @click="() => $router.back()">
        返回上一页
      </button>
    </div>
  </div>
</template>
