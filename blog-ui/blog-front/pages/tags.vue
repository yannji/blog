<script lang="ts" setup>
import * as echarts from 'echarts'
import { useTagStore } from '@/stores'

useHead({
  title: '文章标签',
})
const tagStore = useTagStore()
const { tagsMap } = tagStore

const tagImg = useSettingItem('tagImg')

const option = {
  dataset: [
    {
      dimensions: ['name', 'postCount'],
      source: [] as any[],
    },
    {
      transform: {
        type: 'sort',
        config: { dimension: 'postCount', order: 'desc' },
      },
    },
  ],
  title: {
    text: '文章标签统计图',
    left: 'center',
  },
  xAxis: {
    type: 'category',
  },
  yAxis: {},
  series: {
    type: 'bar',
    encode: { x: 'name', y: 'postCount' },
    datasetIndex: 1,
    itemStyle: {
      color: '#0087ea',
    },
  },
}
const echartContainer = ref<HTMLDivElement | null>(null)
function drawChart() {
  const echart = echarts.init(echartContainer.value as HTMLDivElement)
  const source: any[] = []
  tagsMap.forEach((item) => {
    source.push([item.name, item.postCount])
  })
  option.dataset[0].source = source
  echart.setOption(option)
}

onMounted(() => {
  drawChart()
})
</script>

<template>
  <NuxtLayout>
    <template #banner>
      <Banner :cover-img="tagImg" main-text="文章标签" />
    </template>
    <template #content>
      <div
        class="w-full rounded-lg card mx-auto dark:bg-[#202121]"
        style="min-height: 590px">
        <div ref="echartContainer" class="w-full h-[510px]"></div>
        <ul class="flex justify-center flex-wrap">
          <li
            v-for="(item, index) in tagsMap"
            :key="index"
            class="my-2 mx-3 text-slate-500 px-2 py-[1px] text-[18px] relative cursor-pointer hover:text-blue-400">
            <NuxtLink :to="`/tag/${item[0]}`"
              >{{ item[0]
              }}<span class="absolute -top-2 -right-2">{{
                item[1].postCount
              }}</span></NuxtLink
            >
          </li>
        </ul>
      </div>
    </template>
  </NuxtLayout>
</template>
