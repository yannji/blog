<script lang="ts" setup>
import * as echarts from 'echarts'
import { useCategoryStore } from '~/stores'

useHead({
  title: '文章分类',
})
const categoryStore = useCategoryStore()
const { categorysMap } = categoryStore

const categoryImg = useSettingItem('categoryImg')

const option = {
  title: {
    text: '文章分类统计图',
    left: 'center',
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} 篇文章',
  },
  legend: {
    top: 'bottom',
    left: 'center',
  },
  color: [
    '#00bfe4',
    '#92e1b1',
    '#ffd35a',
    '#ff9476',
    '#ff6888',
    '#f2c0f7',
    '#1cabea',
  ],
  series: [
    {
      name: '分类统计',
      type: 'pie',
      radius: [50, 140],
      center: ['50%', '50%'],
      roseType: 'area',
      itemStyle: {
        borderRadius: 5,
      },
      label: {
        formatter: '{b} : {c}  ({d}%)',
      },
      data: [] as any[],
    },
  ],
}
const echartContainer = ref<HTMLDivElement | null>(null)

function drawChart() {
  const echart = echarts.init(echartContainer.value as HTMLDivElement)
  const data: any[] = []
  categorysMap.forEach((item) => {
    data.push({
      value: item.postCount,
      name: item.name,
    })
  })
  option.series[0].data = data
  echart.setOption(option)
}
onMounted(() => {
  drawChart()
})
</script>

<template>
  <NuxtLayout>
    <template #banner>
      <Banner :cover-img="categoryImg" main-text="文章分类" />
    </template>
    <template #content
      ><div
        class="w-full rounded-lg card mx-auto dark:bg-[#202121]"
        style="min-height: 590px">
        <div ref="echartContainer" class="h-[510px] w-full"></div>
        <ul class="flex justify-center flex-wrap">
          <li
            v-for="(item, index) in categorysMap"
            :key="index"
            class="my-2 mx-3 text-slate-500 px-2 py-[1px] text-[18px] relative cursor-pointer hover:text-blue-400">
            <NuxtLink :to="`/category/${item[0]}`"
              >{{ item[0]
              }}<span class="absolute -top-2 -right-2">{{
                item[1].postCount
              }}</span></NuxtLink
            >
          </li>
        </ul>
      </div></template
    >
  </NuxtLayout>
</template>
