<script lang="ts" setup></script>

<template>
  <slot name="banner"></slot>
  <div class="flex w-[1124px] mx-auto">
    <div class="flex-1 pt-4"><slot name="content" /></div>
    <div class="basis-[300px] ml-4 relative">
      <LayoutSider />
    </div>
  </div>
</template>
