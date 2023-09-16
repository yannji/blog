<script lang="ts" setup>
const beian = useSettingItem('beian')
</script>

<template>
  <div
    class="h-[100px] flex flex-col justify-center items-center bg-white dark:bg-[#000000] dark:text-white">
    <div>@yannji</div>
    <div>{{ beian }}</div>
  </div>
</template>
