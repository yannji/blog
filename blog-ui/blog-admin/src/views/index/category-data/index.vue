<script lang="ts" setup>
import * as echarts from 'echarts'
import { listCategoryApi } from '@/api/category'

const echatsContainer = ref<HTMLElement | null>(null)

const option = {
  title: {
    text: '分类统计图',
    left: 'center',
  },
  legend: {
    top: 'bottom',
    left: 'center',
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)',
  },
  series: [
    {
      name: '分类统计',
      type: 'pie',
      radius: [40, 200],
      center: ['50%', '50%'],
      roseType: 'area',
      itemStyle: {
        borderRadius: 8,
      },
      label: {
        formatter: '{b} : {c}',
      },
      data: [] as any[],
    },
  ],
}

async function fetchCategoryData() {
  const res = await listCategoryApi()
  if (res.code === 200) {
    option.series[0].data = res.data.map((item: any) => ({
      name: item.name,
      value: item.postCount,
    }))
    drawChart()
  }
}
fetchCategoryData()

// 绘制图表
function drawChart() {
  const myChart = echarts.init(echatsContainer.value as HTMLDivElement)
  myChart.setOption(option)
}
</script>

<template>
  <div ref="echatsContainer" style="width: 100%; height: 100%"></div>
</template>
