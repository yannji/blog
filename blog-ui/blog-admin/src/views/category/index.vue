<script lang="ts" setup>
import { listCategoryApi, updateCategoryApi, createCategoryApi, removeCategoryApi } from '@/api/category'
import { ElMessage, ElMessageBox, type Action } from 'element-plus'

import { PostList, usePostList } from '@/components/post-list'
import { deletePostApi, listPostByCategoryIdApi } from '@/api/post'

const categoryList = ref<any[]>([])
async function fetchCategoryData() {
  const data = await listCategoryApi()
  if (data.code == 200) {
    categoryList.value = data.data
  }
}
fetchCategoryData()

const drawerData = reactive({
  showDrawer: false,
  title: '',
  categoryData: { id: '', name: '', isDisplay: 1, sort: 0 },
})

function handleOpenDrawer(id: string | null) {
  if (id === null) {
    drawerData.title = '添加分类'
    drawerData.categoryData = { id: '', name: '', isDisplay: 1, sort: 0 }
    drawerData.showDrawer = true
  } else {
    drawerData.title = '修改分类'
    const category = categoryList.value.find((item) => item.id === id)
    drawerData.categoryData.id = id
    drawerData.categoryData.name = category.name
    drawerData.categoryData.sort = category.sort
    drawerData.categoryData.isDisplay = category.isDisplay
    drawerData.showDrawer = true
  }
}

async function handleUpdateCategory() {
  const { categoryData } = drawerData
  const res = await updateCategoryApi(categoryData)
  if (res.code === 200) {
    drawerData.showDrawer = false
    ElMessage.success('修改成功')
    fetchCategoryData()
  }
}

async function handleCreateCategory() {
  const { categoryData } = drawerData
  const res = await createCategoryApi(categoryData)
  if (res.code === 200) {
    drawerData.showDrawer = false
    ElMessage.success('添加成功')
    fetchCategoryData()
  }
}

async function handleRemoveCategory(data: any) {
  const { id, name, postCount } = data
  let mesage = `您确定要删除分类 <span style="font-weight: bold; color: red;">${name}</span> 吗？`
  if (postCount !== 0) {
    mesage += `, 已有文章属于该分类，请谨慎删除`
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
        const res = await removeCategoryApi(id)
        if (res.code === 200) {
          ElMessage({
            type: 'success',
            message: `分类 ${name} 删除成功`,
          })
        }
        fetchCategoryData()
      }
    },
  })
}

const { queryData, postData, handlePageChange, handleDeletePost } = usePostList(fetchPost, deletePostApi)

async function fetchPost(id: string) {
  const res = await listPostByCategoryIdApi(id, queryData)
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
  const { id: categoryId, name } = row
  fetchPost(categoryId)
  dialogData.title = `分类名: ${name}`
  dialogData.showDialog = true
}
</script>

<template>
  <div class="card">
    <div class="mb-4">
      <el-button type="primary" @click="handleOpenDrawer(null)"> 添加分类 </el-button>
    </div>
    <el-table :data="categoryList" stripe style="width: 100%">
      <el-table-column type="index" label="序号" width="180" align="center" />
      <el-table-column label="分类名" align="center">
        <template #="{ row }">
          <p class="text-lg">{{ row.name }}</p>
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
          <el-button link type="primary" @click="handleRemoveCategory(row)"> 删除 </el-button>
          <el-button link type="primary" @click="handleOpenDialog(row)"> 查看文章 </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <el-drawer v-model="drawerData.showDrawer" :close-on-click-modal="false">
    <template #header>
      <p>{{ drawerData.title }}</p>
    </template>
    <div>
      <el-form :model="drawerData.categoryData">
        <el-form-item label="分类名" label-width="70px">
          <el-input v-model="drawerData.categoryData.name" size="large" />
        </el-form-item>
        <el-form-item label="是否显示" label-width="70px">
          <el-radio-group v-model="drawerData.categoryData.isDisplay" size="large">
            <el-radio-button :label="1">显示</el-radio-button>
            <el-radio-button :label="0">隐藏</el-radio-button>
          </el-radio-group></el-form-item
        >
        <el-form-item label="显示顺序" label-width="70px">
          <el-input-number v-model="drawerData.categoryData.sort" :min="0" :max="10000" size="large"
        /></el-form-item>
      </el-form>
    </div>
    <template #footer>
      <el-button @click="drawerData.showDrawer = false">取消</el-button>
      <template v-if="drawerData.categoryData.id === ''">
        <el-button type="primary" @click="handleCreateCategory">确定</el-button></template
      >
      <template v-else> <el-button type="primary" @click="handleUpdateCategory">确定</el-button></template>
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
