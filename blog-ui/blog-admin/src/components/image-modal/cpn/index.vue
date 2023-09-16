<script lang="ts" setup>
import { Close } from '@element-plus/icons-vue'
import { listAttachmentApi } from '@/api/attachment'
import { api as viewerApi } from 'v-viewer'
import 'viewerjs/dist/viewer.min.css'

const show = ref(false)
defineExpose({ show })

const imgData = reactive({
  imgList: [] as any[],
  total: 0,
})
const queryData = reactive({
  current: 1,
  size: 15,
  type: 0,
  remarks: undefined,
})

async function fetchImgData() {
  const res = await listAttachmentApi(queryData)
  const imgArr = res.data.list as any[]
  imgData.imgList = imgArr.map((item) => {
    return { id: item.id, title: item.originName, remarks: item.remarks ?? '', imgUrl: item.link, showCover: false }
  })
  imgData.total = res.data.total
}

watch(show, async (n) => {
  if (n === true) {
    await fetchImgData()
  }
})

async function handleCurrentChange(page: number) {
  queryData.current = page
  fetchImgData()
}

defineEmits<{
  (e: 'item-choose', item: any): void
}>()

function handleReset() {
  queryData.current = 1
  queryData.remarks = undefined
  fetchImgData()
}

function handlePreviewImg(item: any) {
  viewerApi({
    images: [item.imgUrl],
  })
}
</script>

<template>
  <div v-if="show" class="fixed top-0 bottom-0 left-0 right-0 bg-black/70 z-[99]">
    <div class="w-[1200px] h-[810px] bg-white shadow-md mx-auto mt-[40px] rounded-lg overflow-hidden relative">
      <div class="flex h-[40px] bg-[whitesmoke]">
        <div class="flex-1">
          <span class="inline-block mt-2 ml-4 text-xl">从附件中选择图片</span>
        </div>
        <div
          class="basis-[35px] h-[35px] flex cursor-pointer justify-center items-center hover:bg-gray-200 rounded-full">
          <el-icon size="30" color="black" @click="show = false"><Close /></el-icon>
        </div>
      </div>
      <div class="w-full overflow-x-scroll" style="height: calc(100% - 40px)">
        <div class="flex justify-center mt-2 pt-2 h-[50px]">
          <span class="pt-1">备注名：</span>
          <div class="basis-[400px]">
            <el-input v-model="queryData.remarks" placeholder="请输入备注名用于搜索" />
          </div>
          <div class="ml-4"><el-button @click="handleReset">重置</el-button></div>
          <div class="ml-4"><el-button type="primary" @click="fetchImgData">搜索</el-button></div>
        </div>
        <div style="min-height: 650px" class="flex flex-wrap content-start pt-2 pl-4 overflow-y-auto">
          <div v-for="item in imgData.imgList" class="basis-[200px] m-4">
            <div
              class="h-[130px] w-full bg-center bg-no-repeat bg-cover rounded-md overflow-hidden relative flex justify-center items-center"
              :style="{
                backgroundImage: `url('${item.imgUrl}')`,
              }"
              @mouseleave="item.showCover = false"
              @mouseover="item.showCover = true">
              <div
                v-show="item.showCover"
                class="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-black/60">
                <div class="flex text-white">
                  <div class="mx-2 cursor-pointer hover:text-blue-400" @click="$emit('item-choose', item)">选择</div>
                  <div class="mx-2 cursor-pointer hover:text-blue-400" @click="handlePreviewImg(item)">预览</div>
                </div>
              </div>
            </div>
            <div>{{ item.title }}</div>
          </div>
        </div>
        <div class="relative inline-block left-8">
          <el-pagination
            background
            layout="prev, pager, next"
            :page-size="queryData.size"
            :total="imgData.total"
            @current-change="handleCurrentChange" />
        </div>
      </div>
    </div>
  </div>
</template>
