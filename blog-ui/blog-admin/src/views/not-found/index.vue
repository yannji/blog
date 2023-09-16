<script setup lang="ts">
import { UploadModal, useUploadModal } from '@/components/upload-modal'
const { modalRef, closeModal, openModal } = useUploadModal()
</script>

<template>
  <div>
    <!-- <el-empty>
      <template #description> 到达了未知的页面 </template>
      <template #default
        ><div class="flex gap-4">
          <button class="px-6 text-black bg-white rounded shadow-md hover:bg-[whitesmoke]" @click="$router.push(`/`)">
            返回首页</button
          ><button class="primary-btn" @click="$router.back()">返回上一页</button>
        </div></template
      >
    </el-empty> -->
    <button @click="openModal">click</button>
    <UploadModal ref="modalRef" />
  </div>
</template>
