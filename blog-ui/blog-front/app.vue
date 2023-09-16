<script setup lang="ts">
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - 博客系统` : '博客系统'
  },
})
</script>

<template>
  <LayoutHeader />
  <div class="main-content dark:bg-[#171819] bg-[whitesmoke]">
    <NuxtPage />
  </div>
  <LayoutFooter />
</template>
<style lang="scss" scoped>
.main-content {
  min-height: calc(100vh - 100px);
  padding-bottom: 50px;
}
</style>
