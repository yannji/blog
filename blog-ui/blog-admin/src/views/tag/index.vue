<script lang="ts" setup>
import { listTagApi, updateTagApi, createTagApi, removeTagApi } from '@/api/tag'
import { ElMessage, ElMessageBox, type Action } from 'element-plus'

import { PostList, usePostList } from '@/components/post-list'
import { deletePostApi, listPostByTagIdApi } from '@/api/post'

const tagList = ref<any[]>([])
async function fetchTagData() {
  const data = await listTagApi()
  if (data.code == 200) {
    tagList.value = data.data
  }
}
fetchTagData()

const drawerData = reactive({
  showDrawer: false,
  title: '',
  tagData: {
    id: '',
    name: '',
    isDisplay: 1,
    sort: 0,
  },
})

function handleOpenDrawer(id: string | null) {
  if (id === null) {
    drawerData.title = '添加标签'
    drawerData.tagData = {
      id: '',
      name: '',
      isDisplay: 1,
      sort: 0,
    }
    drawerData.showDrawer = true
  } else {
    drawerData.title = '修改标签'
    const tag = tagList.value.find((item) => item.id === id)
    drawerData.tagData.id = id
    drawerData.tagData.name = tag.name
    drawerData.tagData.sort = tag.sort
    drawerData.tagData.isDisplay = tag.isDisplay
    drawerData.showDrawer = true
  }
}

async function handleUpdateTag() {
  const { tagData } = drawerData
  const res = await updateTagApi(tagData)
  if (res.code === 200) {
    drawerData.showDrawer = false
    ElMessage.success('修改成功')
    fetchTagData()
  }
}

async function handleCreateTag() {
  const { tagData } = drawerData
  const res = await createTagApi(tagData)
  if (res.code === 200) {
    drawerData.showDrawer = false
    ElMessage.success('添加成功')
    fetchTagData()
  }
}

async function handleRemoveTag(data: any) {
  const { id, name, postCount } = data
  let mesage = `您确定要删除标签 <span style="font-weight: bold; color: red;">${name}</span> 吗？`
  if (postCount !== 0) {
    mesage += `, 已有文章使用了该标签，请谨慎删除`
  }
  ElMessageBox({
    title: '提示信息',
    message: mesage,
    showCancelButton: true,
    cancelButtonText: '取消',
    confirmButtonText: '确定',
    dangerouslyUseHTMLString: true,
    callback: async (action: Action) => {
      if (action === 'confirm') {
        const res = await removeTagApi(id)
        if (res.code === 200) {
          ElMessage({
            type: 'success',
            message: `标签 ${name} 删除成功`,
          })
        }
        fetchTagData()
      }
    },
  })
}

const { queryData, postData, handlePageChange, handleDeletePost } = usePostList(fetchPost, deletePostApi)

async function fetchPost(id: string) {
  const res = await listPostByTagIdApi(id, queryData)
  if (res.code === 200) {
    postData.postList = res.data.list
    postData.total = res.data.total
  }
}

const dialogData = reactive({
  showDialog: false,
  title: '',
})

function handleOpenDialog(row: any) {
  const { id: tagId, name } = row
  fetchPost(tagId)
  dialogData.title = `标签名: ${name}`
  dialogData.showDialog = true
}
</script>

<template>
  <div class="card">
    <div class="mb-4">
      <el-button type="primary" @click="handleOpenDrawer(null)"> 添加标签 </el-button>
    </div>
    <el-table :data="tagList" stripe style="width: 100%">
      <el-table-column type="index" label="序号" width="180" align="center" />
      <el-table-column label="标签名" align="center">
        <template #="{ row }">
          <p class="text-lg">
            {{ row.name }}
          </p>
        </template>
      </el-table-column>
      <el-table-column prop="postCount" label="文章数量" align="center" sortable />
      <el-table-column prop="sort" label="展示顺序" align="center" />
      <el-table-column label="是否显示" align="center">
        <template #default="{ row }">
          <template v-if="row.isDisplay === 1"><el-tag round>显示</el-tag></template>
          <template v-else><el-tag type="danger" round>隐藏</el-tag></template>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" align="center" />
      <el-table-column fixed="right" label="操作" width="220" align="center">
        <template #default="{ row }">
          <el-button link type="primary" @click="handleOpenDrawer(row.id)"> 修改 </el-button>
          <el-button link type="primary" @click="handleRemoveTag(row)"> 删除 </el-button>
          <el-button link type="primary" @click="handleOpenDialog(row)"> 查看文章 </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <el-drawer v-model="drawerData.showDrawer" :close-on-click-modal="false">
    <template #header>
      <p>
        {{ drawerData.title }}
      </p>
    </template>
    <div>
      <el-form :model="drawerData.tagData">
        <el-form-item label="标签名" label-width="70px">
          <el-input v-model="drawerData.tagData.name" size="large" />
        </el-form-item>
        <el-form-item label="是否显示" label-width="70px">
          <el-radio-group v-model="drawerData.tagData.isDisplay" size="large">
            <el-radio-button :label="1">显示</el-radio-button>
            <el-radio-button :label="0">隐藏</el-radio-button>
          </el-radio-group></el-form-item
        >
        <el-form-item label="显示顺序" label-width="70px">
          <el-input-number v-model="drawerData.tagData.sort" :min="0" :max="10000" size="large"
        /></el-form-item>
      </el-form>
    </div>
    <template #footer>
      <el-button @click="drawerData.showDrawer = false">取消</el-button>
      <template v-if="drawerData.tagData.id === ''">
        <el-button type="primary" @click="handleCreateTag">确定</el-button></template
      >
      <template v-else> <el-button type="primary" @click="handleUpdateTag">确定</el-button></template>
    </template>
  </el-drawer>

  <el-dialog v-model="dialogData.showDialog" width="60%" class="!rounded-md">
    <template #header>
      <div class="text-xl text-slate-600">{{ dialogData.title }}</div>
    </template>
    <PostList
      :post-data="postData"
      :query-data="queryData"
      @page-change="handlePageChange"
      @post-delete="handleDeletePost" />
  </el-dialog>
</template>
