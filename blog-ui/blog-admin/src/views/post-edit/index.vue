<script lang="ts" setup>
import MdEditor from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'
import { listCategoryApi } from '@/api/category'
import { listTagApi } from '@/api/tag'
import dayjs from 'dayjs'
import { savePostApi, postInfoApi, settingPostApi } from '@/api/post'
import { uploadAttachmentApi } from '@/api/attachment'
import { ElMessage } from 'element-plus'

import { useImageModal, ImageModal } from '@/components/image-modal'
const { openModal: openImgModal, closeModal: closeImgModal, modalRef: imgModalRef } = useImageModal()

const route = useRoute()
const router = useRouter()

const categoryData = ref([] as any[])
const tagData = ref([] as any[])

Promise.all([listCategoryApi(), listTagApi()]).then((resArr) => {
  const [categoryRes, tagRes] = resArr
  if (categoryRes.data) {
    categoryData.value = categoryRes.data
  }
  if (tagRes.data) {
    tagData.value = tagRes.data
  }
})

const data = reactive({
  showSettingDialog: false,
  postData: {
    id: (route.params['id'] as string) ?? '',
    title: '',
    mdContent: '',
    coverImg: '',
    isDisplay: 1,
    isTop: 0,
    isPublish: 0,
    publishTime: '' as any,
    tags: [] as string[],
    choosedTags: [] as string[],
    categorys: [] as string[],
    choosedCategorys: [] as string[],
  },
})

function toggleSettingDialog() {
  if (data.showSettingDialog === false) {
    fetchPostInfo()
  }
  data.showSettingDialog = !data.showSettingDialog
}

async function fetchPostInfo() {
  const { id } = data.postData
  if (id !== '') {
    const res = await postInfoApi(id)
    if (res.code === 200) {
      const { post, tags, categorys } = res.data
      if (post) {
        data.postData = post
      } else {
        window.open('/post-edit', '_self')
      }
      const tagIds = tags.map((item: any) => item.tagId)
      const categoryIds = categorys.map((item: any) => item.categoryId)
      if (tags) {
        data.postData.tags = [...tagIds]
        data.postData.choosedTags = [...tagIds]
      } else {
        data.postData.tags = []
        data.postData.choosedTags = []
      }
      if (categorys) {
        data.postData.categorys = [...categoryIds]
        data.postData.choosedCategorys = [...categoryIds]
      } else {
        data.postData.categorys = []
        data.postData.choosedCategorys = []
      }
    }
  }
}
fetchPostInfo()

async function handleSavePost() {
  const { id, title, mdContent } = data.postData
  const res = await savePostApi({ id, title, mdContent })
  if (res.code === 200) {
    if (id === '') {
      const postId = res.data as string
      router.push(`/post-edit/${postId}`)
      data.postData.id = postId
    }
    ElMessage.success('保存成功')
  }
}

async function handleSavePostSetting() {
  const { postData } = data
  if (postData.id === '') {
    return
  }
  const d = {
    id: postData.id,
    title: postData.title,
    coverImg: postData.coverImg,
    addTagIds: [] as string[],
    delTagIds: [] as string[],
    addCategoryIds: [] as string[],
    delCategoryIds: [] as string[],
    isPublish: postData.isPublish,
    publishTime: postData.publishTime,
    isDisplay: postData.isDisplay,
    isTop: postData.isTop,
  }
  const { choosedCategorys, categorys, choosedTags, tags } = postData
  const categorySet = new Set(categorys)
  const tagSet = new Set(tags)
  const choosedCategorySet = new Set(choosedCategorys)
  const choosedTagSet = new Set(choosedTags)
  d.addTagIds = choosedTags.filter((item) => !tagSet.has(item))
  d.delTagIds = tags.filter((item) => !choosedTagSet.has(item))
  d.addCategoryIds = choosedCategorys.filter((item) => !categorySet.has(item))
  d.delCategoryIds = categorys.filter((item) => !choosedCategorySet.has(item))
  if (d.publishTime instanceof Date) {
    d.publishTime = dayjs(d.publishTime).format('YYYY-MM-DD HH:mm:ss')
  }
  const res = await settingPostApi(d)
  if (res.code === 200) {
    ElMessage.success('保存设置成功')
    toggleSettingDialog()
  }
}

const host = ref('http://localhost:8888')

async function handleUploadImg(files: File[], callback: any) {
  const res = await Promise.all(
    files.map((file) => {
      return new Promise((rev, rej) => {
        uploadAttachmentApi(file, { needCompress: false, needRecord: false })
          .then((res) => rev(res))
          .catch((error) => rej(error))
      })
    })
  )
  callback(res.map((item: any) => item.data))
}

function handleImgClick(item: any) {
  closeImgModal()
  data.postData.coverImg = item.imgUrl
}
</script>

<template>
  <div class="card">
    <div class="flex mb-2">
      <div class="flex-1">
        <input
          placeholder="请输入标题"
          v-model="data.postData.title"
          class="h-[45px] text-xl font-medium w-full outline-none border-slate-300 border rounded-md pl-3 placeholder:font-normal" />
      </div>
      <div class="flex items-center justify-end ml-4 basis-auto">
        <el-button size="large" @click="toggleSettingDialog" v-if="data.postData.id !== ''">设置</el-button>
        <el-button size="large" type="primary" @click="handleSavePost">保存</el-button>
      </div>
    </div>
    <div>
      <MdEditor v-model="data.postData.mdContent" style="height: calc(100vh - 180px)" @onUploadImg="handleUploadImg" />
    </div>
  </div>
  <div v-if="data.showSettingDialog" class="fixed top-0 bottom-0 left-0 right-0 bg-black/70">
    <div
      class="w-[700px] my-[40px] mx-auto rounded-md overflow-y-auto bg-white relative shadow-md"
      style="max-height: calc(100vh - 80px)">
      <div class="py-3 pl-4 text-xl border-b-2 border-slate-300">
        <span class="text-slate-500">文章设置</span>
      </div>
      <div class="px-8 py-4">
        <el-form label-position="top">
          <el-form-item label="标题">
            <el-input v-model="data.postData.title" />
          </el-form-item>
          <el-form-item label="封面">
            <div class="w-1/2 cursor-pointer bg-slate-200" style="min-height: 100px" @click="openImgModal">
              <img :src="data.postData.coverImg" />
            </div>
          </el-form-item>
          <el-form-item label="标签">
            <el-select placeholder="请选择标签" multiple class="w-full" v-model="data.postData.choosedTags">
              <el-option
                v-for="item in tagData"
                :key="item.id"
                :label="`${item.name} ${item.isDisplay == 0 ? '(隐藏)' : ''}`"
                :value="item.id" />
            </el-select>
          </el-form-item>
          <el-form-item label="分类">
            <el-select placeholder="请选择分类" multiple class="w-full" v-model="data.postData.choosedCategorys">
              <el-option
                v-for="item in categoryData"
                :key="item.id"
                :label="`${item.name} ${item.isDisplay == 0 ? '(隐藏)' : ''}`"
                :value="item.id" />
            </el-select>
          </el-form-item>
          <el-form-item label="是否发布">
            <el-radio-group v-model="data.postData.isPublish">
              <el-radio :label="1" size="large" border>发布</el-radio>
              <el-radio :label="0" size="large" border>未发布</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="发布时间">
            <el-date-picker
              type="datetime"
              placeholder="请选择发布日期"
              format="YYYY-MM-DD HH:mm:ss"
              v-model="data.postData.publishTime" />
          </el-form-item>
          <el-form-item label="是否展示">
            <el-radio-group v-model="data.postData.isDisplay">
              <el-radio :label="1" size="large" border>展示</el-radio>
              <el-radio :label="0" size="large" border>不展示</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="是否置顶">
            <el-radio-group v-model="data.postData.isTop">
              <el-radio :label="1" size="large" border>置顶</el-radio>
              <el-radio :label="0" size="large" border>不置顶</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </div>
      <div class="relative h-[50px]">
        <div class="absolute right-4">
          <el-button @click="toggleSettingDialog">取消</el-button>
          <el-button type="primary" @click="handleSavePostSetting">保存</el-button>
        </div>
      </div>
    </div>
  </div>
  <ImageModal ref="imgModalRef" @item-choose="handleImgClick" />
</template>
