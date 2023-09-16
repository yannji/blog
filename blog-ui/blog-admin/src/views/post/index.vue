<script lang="ts" setup>
import { listPostApi, deletePostApi } from '@/api/post'

import { PostList, usePostList } from '@/components/post-list'

import { Plus } from '@element-plus/icons-vue'

const { queryData, postData, handlePageChange, handleDeletePost, resetQueryData } = usePostList(
  fetchPost,
  deletePostApi
)

async function fetchPost() {
  const res = await listPostApi(queryData)
  if (res.code === 200) {
    postData.postList = res.data.list
    postData.total = res.data.total
  }
}
fetchPost()

function handleCreatePost() {
  window.open('/post-edit', '_blank')
}
</script>

<template>
  <div class="relative flex mb-4 card">
    <el-form :inline="true" class="pt-4" :model="queryData">
      <el-form-item label="标题">
        <el-input v-model="queryData.title" placeholder="请输入标题" />
      </el-form-item>
      <el-form-item label="是否发布">
        <el-select v-model="queryData.isPublish">
          <el-option label="已发布" :value="1" />
          <el-option label="未发布" :value="0" />
        </el-select>
      </el-form-item>
      <el-form-item label="是否展示">
        <el-select v-model="queryData.isDisplay">
          <el-option label="展示" :value="1" />
          <el-option label="隐藏" :value="0" />
        </el-select>
      </el-form-item>
      <el-form-item label="是否置顶">
        <el-select v-model="queryData.isTop">
          <el-option label="已置顶" :value="1" />
          <el-option label="未置顶" :value="0" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="resetQueryData">重置</el-button>
        <el-button type="primary" @click="fetchPost">查询</el-button>
      </el-form-item>
    </el-form>
    <el-button :icon="Plus" type="success" class="absolute top-8 right-4" @click="handleCreatePost">新建文章</el-button>
  </div>
  <div class="card">
    <PostList
      :post-data="postData"
      :query-data="queryData"
      @page-change="handlePageChange"
      @post-delete="handleDeletePost" />
  </div>
</template>
