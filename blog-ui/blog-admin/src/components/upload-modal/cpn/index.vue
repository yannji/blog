<script lang="ts" setup>
import { uploadAttachmentApi } from '@/api/attachment'
import { ElMessage } from 'element-plus'
import { CloseBold, Close } from '@element-plus/icons-vue'

interface IFile {
  uid: number
  url: string
  file: File
  isImg: boolean
  status: 0 | 1 | 2 // 0：未上传 1：上传中 2：上传成功
}
const fileList = ref<IFile[]>([])
const isMultiple = ref(false)
const show = ref(false)

watch(
  fileList,
  (n) => {
    if (n.length === 0) {
      isMultiple.value = false
    } else {
      isMultiple.value = true
    }
  },
  { deep: true }
)

function handleBeforeUpload(file: File & { uid: number }) {
  if (file.type.startsWith('image/')) {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      fileList.value.push({ uid: file.uid, file: file, url: reader.result as string, status: 0, isImg: true })
    }
  } else {
    fileList.value.push({ uid: file.uid, file: file, url: '', status: 0, isImg: false })
  }
}

function removeItem(uid: number) {
  fileList.value = fileList.value.filter((item) => item.uid !== uid)
}

async function handleUploadFiles() {
  for (let index = 0; index < fileList.value.length; index++) {
    const item = fileList.value[index]
    if (item.status === 0) {
      item.status = 1
      const res = await uploadAttachmentApi(item.file)
      if (res.code === 200) {
        ElMessage.success(`文件 ${item.file.name} 上传成功`)
        item.status = 2
      }
    }
  }
}

function handleClose() {
  fileList.value = []
  show.value = false
  emits('close')
}

defineExpose({
  show,
  handleClose,
})

const emits = defineEmits<{
  (e: 'close'): void
}>()
</script>

<template>
  <div v-if="show" class="fixed z-[99] top-0 bottom-0 left-0 right-0 bg-black/30">
    <div class="h-[80vh] w-[935px] relative mx-auto mt-[10vh] p-4 bg-white rounded-xl shadow-md">
      <div
        @click="handleClose"
        class="absolute flex items-center justify-center rounded-full cursor-pointer right-2 top-2 hover:bg-gray-200">
        <el-icon :size="28"><CloseBold /></el-icon>
      </div>
      <el-upload
        action="#"
        :multiple="isMultiple"
        :show-file-list="false"
        :before-upload="handleBeforeUpload"
        :http-request="() => undefined">
        <template #trigger>
          <el-button type="primary">{{ fileList.length === 0 ? '选择文件' : '继续选择' }}</el-button>
        </template>
        <el-button class="ml-3" type="success" @click="handleUploadFiles" :disabled="fileList.length === 0">
          开始上传
        </el-button>
      </el-upload>
      <div class="flex flex-wrap overflow-y-auto" style="height: calc(100% - 50px)">
        <template v-if="fileList.length === 0">
          <div class="mx-auto text-slate-700 mt-[300px]">请选择文件上传</div>
        </template>
        <template v-else-if="fileList.length === 1">
          <div class="w-[800px] h-[520px] relative inline-block mx-auto mt-[40px]">
            <div
              v-if="fileList[0].isImg"
              class="w-full h-full overflow-hidden bg-center bg-no-repeat bg-cover rounded-md"
              :style="{ backgroundImage: `url('${fileList[0].url}')` }"></div>
            <div
              v-else
              class="w-full h-full overflow-hidden rounded-md bg-[whitesmoke] flex justify-center items-center">
              <div>{{ `${fileList[0].file.type}类型文件` }}</div>
            </div>
            <div
              class="absolute z-30 w-6 h-6 text-center bg-red-400 rounded-full cursor-pointer -right-2 -top-2"
              v-if="fileList[0].status === 0"
              @click="removeItem(fileList[0].uid)">
              <el-icon :size="24" color="white"><Close /></el-icon>
            </div>
            <div class="text-slate-600 text-[14px]">{{ fileList[0].file.name }}</div>
          </div>
        </template>
        <template v-else>
          <div v-for="item in fileList" class="basis-[200px] relative m-[10px]">
            <div
              class="absolute z-30 w-6 h-6 text-center bg-red-400 rounded-full cursor-pointer -right-2 -top-2"
              v-if="item.status === 0"
              @click="removeItem(item.uid)">
              <el-icon :size="24" color="white"><Close /></el-icon>
            </div>
            <div
              class="h-[130px] bg-center bg-no-repeat bg-cover rounded-md overflow-hidden relative flex justify-center items-center"
              :style="{
                backgroundImage: item.isImg ? `url('${item.url}')` : '',
                backgroundColor: !item.isImg ? 'whitesmoke' : '',
              }">
              <div v-if="!item.isImg">{{ `${item.file.type}类型文件` }}</div>
              <div class="absolute top-0 bottom-0 left-0 right-0 z-10 rounded-md bg-black/60" v-if="item.status !== 0">
                <div class="absolute z-20 text-center top-0 left-0 bottom-0 right-0 leading-[130px] text-white">
                  {{ item.status === 2 ? '上传成功' : '上传中...' }}
                </div>
              </div>
            </div>
            <div class="text-slate-600 text-[14px]">{{ item.file.name }}</div>
          </div></template
        >
      </div>
    </div>
  </div>
</template>
