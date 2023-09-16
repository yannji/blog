<script lang="ts" setup>
import { useSettingStore } from '@/stores'
import { storeToRefs } from 'pinia'
import { saveOrUpdateSettingApi } from '@/api/setting'
import { ElMessage } from 'element-plus'

const settingStore = useSettingStore()
const { settings } = storeToRefs(settingStore)
const data = ref<{ label: string; value: string; type: string; key: string }[]>([
  { label: '邮箱', key: 'email', type: 'text', value: settings.value.email ?? '' },
  { label: 'QQ', key: 'qq', type: 'text', value: settings.value.qq ?? '' },
  { label: 'Github', key: 'github', type: 'text', value: settings.value.github ?? '' },
  { label: '备案号', key: 'beian', type: 'text', value: settings.value.beian ?? '' },
])

async function handleSubmitSetting() {
  const res = await saveOrUpdateSettingApi(data.value)
  if (res.code === 200) {
    ElMessage.success('设置成功')
  }
}
</script>

<template>
  <el-form label-position="top">
    <el-form-item v-for="(item, index) in data" :label="item.label" :key="item.key">
      <el-input v-model="data[index].value" :data-index="index" :data-type="item.type" />
    </el-form-item>
  </el-form>
  <div class="text-right"><el-button type="primary" class="w-full" @click="handleSubmitSetting">确定</el-button></div>
</template>
