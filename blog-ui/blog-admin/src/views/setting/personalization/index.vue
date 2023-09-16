<script lang="ts" setup>
import { useImageModal, ImageModal } from '@/components/image-modal'
import { saveOrUpdateSettingApi } from '@/api/setting'
import { ElMessage } from 'element-plus'

import { useSettingStore } from '@/stores'
import { storeToRefs } from 'pinia'
const settingStore = useSettingStore()
const { settings } = storeToRefs(settingStore)

const { openModal: openImgModal, closeModal: closeImgModal, modalRef: imgModalRef } = useImageModal()

const data = ref([
  { key: 'logo', label: 'logo', type: 'img', value: settings.value.logo ?? '' },
  { key: 'indexImg', label: '首页图片', type: 'img', value: settings.value.indexImg ?? '' },
  { key: 'archiveImg', label: '归档页图片', type: 'img', value: settings.value.archiveImg ?? '' },
  { key: 'categoryImg', label: '分类页图片', type: 'img', value: settings.value.categoryImg ?? '' },
  { key: 'tagImg', label: '标签页图片', type: 'img', value: settings.value.tagImg ?? '' },
  { key: 'aboutImg', label: '关于页图片', type: 'img', value: settings.value.aboutImg ?? '' },
  { key: 'indexText', label: '首页文字', type: 'text', value: settings.value.indexText ?? '' },
])

const index = ref(-1)

function handleImgClick(item: any) {
  closeImgModal()
  data.value[index.value].value = item.imgUrl
}
function handleClickInput(e: MouseEvent) {
  const target = e.target as HTMLElement
  if (target.tagName === 'INPUT' && target.dataset.type === 'img') {
    const i = target.dataset.index as any as number
    index.value = i
    openImgModal()
  }
}

async function handleSubmitSetting() {
  const res = await saveOrUpdateSettingApi(data.value)
  if (res.code === 200) {
    ElMessage.success('设置成功')
  }
}
</script>

<template>
  <el-form label-position="top" @click.prevent="handleClickInput">
    <el-form-item v-for="(item, index) in data" :label="item.label" :key="item.key">
      <el-input v-model="data[index].value" :data-index="index" :data-type="item.type" />
    </el-form-item>
  </el-form>
  <div class="text-right"><el-button type="primary" class="w-full" @click="handleSubmitSetting">确定</el-button></div>
  <ImageModal ref="imgModalRef" @item-choose="handleImgClick" />
</template>
