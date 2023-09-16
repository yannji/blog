<script lang="ts" setup>
withDefaults(
  defineProps<{
    postList?: any[]
  }>(),
  { postList: () => [] }
)
</script>

<template>
  <div class="w-full">
    <ul>
      <li
        v-for="item in postList"
        class="my-4 overflow-hidden first:mt-0 shadow-md"
        :key="item.post.id">
        <PostDesc
          :tags="item.tags"
          :categorys="item.categorys"
          :post="item.post" />
      </li>
    </ul>
  </div>
</template>
