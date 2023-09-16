<script lang="ts" setup>
import 'vue-cropper/dist/index.css'
import VueCropper from 'vue-cropper/lib/vue-cropper.vue'
import { ElLoading, ElMessage, type UploadRawFile } from 'element-plus'
import { ZoomIn, ZoomOut, RefreshLeft, RefreshRight, UploadFilled, Promotion } from '@element-plus/icons-vue'

import { uploadAttachmentApi } from '@/api/attachment'

const props = defineProps<{ imgUrl: string }>()

const options = reactive({
  isOpen: false,
  visible: false,
  img: props.imgUrl,
  tmpImg: props.imgUrl,
  autoCrop: true, // 是否默认生成截图框
  autoCropWidth: 200, // 默认生成截图框宽度
  autoCropHeight: 200, // 默认生成截图框高度
  fixedBox: true, // 固定截图框大小 不允许改变
})

defineExpose({
  openDialog() {
    options.isOpen = true
    options.visible = true
  },
})
const emits = defineEmits<{
  (e: 'success', url: string): void
}>()

const previews = reactive({
  url: '',
  img: '',
})
const realTime = (data: any) => {
  previews.img = data.img
  previews.url = data.url
}

const cropperRef = ref<IVueCropper | null>(null)

function handleUploadAvatar() {
  cropperRef.value?.getCropBlob(async (data: File) => {
    const loadingInstance = ElLoading.service({
      text: '上传中...',
    })
    try {
      options.isOpen = false
      if (data) {
        const res = await uploadAttachmentApi(data, { needCompress: false, needRecord: false })
        options.visible = false
        ElMessage.success('上传成功')
        emits('success', res.data)
      }
    } catch {
      ElMessage.error('上传失败')
    } finally {
      loadingInstance.close()
    }
  })
}

function handleBeforeUpload(file: UploadRawFile) {
  //图片上传预处理，为的是预览效果
  if (file.type.indexOf('image/') == -1) {
    //判断选择的文件是否是图片类型的
    ElMessage.error({
      message: '文件格式错误，请上传图片类型,如：JPG，PNG后缀的文件！！！',
    })
  } else {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      options.tmpImg = reader.result as string
    }
  }
}
function clickChangeScale(num: number) {
  num = num || 1
  cropperRef.value?.changeScale(num)
}
function clickRotateLeft() {
  cropperRef.value?.rotateLeft()
}
function clickRotateRight() {
  cropperRef.value?.rotateRight()
}
</script>

<template>
  <el-dialog v-model="options.isOpen" :lock-scroll="false" center class="!h-[420px] !w-[620px] !rounded-lg">
    <template #header>修改头像</template>
    <div class="h-[280px]">
      <el-row>
        <el-col :span="12">
          <VueCropper
            v-if="options.visible"
            ref="cropperRef"
            :img="options.tmpImg"
            :info="true"
            :autoCropWidth="options.autoCropWidth"
            :autoCropHeight="options.autoCropHeight"
            :autoCrop="options.autoCrop"
            :fixedBox="options.fixedBox"
            @realTime="realTime"
            class="!h-[255px] !w-[255px]" />
        </el-col>
        <el-col :span="12" class="relative">
          <div
            class="absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 w-[200px] h-[200px] shadow-md overflow-hidden">
            <img :src="previews.url" class="max-w-max" alt="预览" :style="previews.img" />
          </div>
        </el-col>
      </el-row>

      <el-row style="text-align: center; margin-top: 20px">
        <el-col :span="8">
          <el-upload
            :show-file-list="false"
            action="#"
            :before-upload="handleBeforeUpload"
            :http-request="() => undefined">
            <el-button type="primary">
              <el-icon><UploadFilled /></el-icon>
              <span>点击上传</span></el-button
            >
          </el-upload>
        </el-col>
        <el-col :span="2">
          <el-button @click="clickChangeScale(1)">
            <el-icon>
              <ZoomIn />
            </el-icon>
          </el-button>
        </el-col>
        <el-col :span="2">
          <el-button @click="clickChangeScale(-1)"
            ><el-icon><ZoomOut /></el-icon></el-button
        ></el-col>
        <el-col :span="2">
          <el-button @click="clickRotateLeft"
            ><el-icon><RefreshLeft /></el-icon></el-button
        ></el-col>
        <el-col :span="2">
          <el-button @click="clickRotateRight"
            ><el-icon><RefreshRight /></el-icon
          ></el-button>
        </el-col>
        <el-col :span="8">
          <el-button @click="handleUploadAvatar" type="success"
            ><el-icon><Promotion /></el-icon><span>提交</span></el-button
          >
        </el-col>
      </el-row>
    </div>
  </el-dialog>
</template>
