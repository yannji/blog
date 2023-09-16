<script lang="ts" setup>
import { useSettingStore } from '@/stores'
import { Expand, Fold } from '@element-plus/icons-vue'
const title = ref<string>('博客管理平台')
const settingStore = useSettingStore()

const { currentRoute } = useRouter()
watch(
  currentRoute,
  () => {
    document.title = (
      currentRoute.value.meta.desc
        ? currentRoute.value.meta.desc + ' - ' + title.value
        : title.value
    ) as string
  },
  {
    immediate: true,
  }
)
</script>

<template>
  <div
    class="h-full w-full relative bg-[#fff] shadow-md flex items-center select-none"
  >
    <el-icon
      :size="30"
      @click="settingStore.toggleIsCollapse"
      class="!h-full !w-[60px] font-thin cursor-pointer hover:bg-slate-100 transition-colors duration-75"
    >
      <template v-if="settingStore.isCollapse"><Expand /></template>
      <template v-else><Fold /></template>
    </el-icon>
    <div class="text-2xl leading-[60px]">
      {{ currentRoute.meta.desc ?? title }}
    </div>
  </div>
</template>
