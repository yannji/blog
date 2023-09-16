<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    postList?: any[]
  }>(),
  { postList: () => [] }
)

const { $timeFormat } = useNuxtApp()

function showYearAndMonth(currentIndex: number) {
  if (currentIndex === 0) {
    return $timeFormat(props.postList[0].post.publishTime, 'YYYY-MM')
  } else {
    const lastIndex = currentIndex - 1
    const lastDate = $timeFormat(
      props.postList[lastIndex].post.publishTime,
      'YYYY-MM'
    )
    const currentDate = $timeFormat(
      props.postList[currentIndex].post.publishTime,
      'YYYY-MM'
    )
    if (lastDate !== currentDate) {
      return currentDate
    }
  }
}
</script>

<template>
  <ul>
    <li class="flex" v-for="(item, index) in postList" :key="item.post.id">
      <div class="basis-[120px] text-right text-[20px] font-mono">
        {{ showYearAndMonth(index) }}
      </div>
      <div class="flex flex-col items-center basis-[50px]">
        <div
          class="flex bg-blue-400 items-center rounded-full w-[16px] h-[16px]">
          <div class="w-2 h-2 mx-auto bg-white rounded-full"></div>
        </div>
        <div class="w-[2px] flex-1 bg-blue-400 opacity-80 h-[98px]"></div>
      </div>
      <div class="flex-1 h-[100px] mb-6">
        <PostArchiveDesc
          :post="item.post"
          :tags="item.tags"
          :categorys="item.categorys" />
      </div>
    </li>
  </ul>
</template>
