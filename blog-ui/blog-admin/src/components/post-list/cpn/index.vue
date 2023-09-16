<script lang="ts" setup>
defineProps<{
  postData: {
    postList: any[]
    total: number
  }
  queryData: {
    current: number
    size: number
  }
}>()

const emits = defineEmits<{
  (e: 'page-change', page: number): void
  (e: 'post-delete', post: any): void
}>()

function handleCurrentChange(page: number) {
  emits('page-change', page)
}

function handleDeletePost(post: any) {
  emits('post-delete', post)
}

function handleOpenNewPage(url: string) {
  window.open(url, '_blank')
}
</script>

<template>
  <div class="card">
    <el-table :data="postData.postList" stripe style="width: 100%">
      <el-table-column prop="post.title" label="标题" fixed="left" align="center" width="180" />
      <el-table-column label="标签" width="250">
        <template #default="{ row }">
          <ul class="flex flex-wrap">
            <li v-for="item in row.tags" class="m-1">
              <el-tag>{{ item.tagName }}</el-tag>
            </li>
          </ul>
        </template>
      </el-table-column>
      <el-table-column label="分类" width="250">
        <template #default="{ row }">
          <ul class="flex flex-wrap">
            <li v-for="item in row.categorys" class="m-1">
              <el-tag>{{ item.categoryName }}</el-tag>
            </li>
          </ul>
        </template>
      </el-table-column>
      <el-table-column label="是否置顶" width="180">
        <template #default="{ row }">
          <template v-if="row.post.isTop == 1"> <el-tag type="success">已置顶</el-tag></template>
          <template v-else> <el-tag type="warning">未置顶</el-tag></template>
        </template>
      </el-table-column>
      <el-table-column label="是否前台展示" width="180">
        <template #default="{ row }">
          <template v-if="row.post.isDisplay == 1"> <el-tag type="success">展示</el-tag></template>
          <template v-else> <el-tag type="warning">隐藏</el-tag></template>
        </template>
      </el-table-column>
      <el-table-column label="是否发布" width="180">
        <template #default="{ row }">
          <template v-if="row.post.isPublish == 1"> <el-tag type="success">已发布</el-tag></template>
          <template v-else> <el-tag type="warning">未发布</el-tag></template>
        </template>
      </el-table-column>
      <el-table-column prop="post.thumbs" label="点赞量" width="180"></el-table-column>
      <el-table-column prop="post.views" label="浏览量" width="180"></el-table-column>
      <el-table-column prop="post.publishTime" label="发布时间" width="180" />
      <el-table-column prop="post.createTime" label="创建时间" width="180" />
      <el-table-column prop="post.updateTime" label="修改时间" width="180" />
      <el-table-column fixed="right" label="操作" width="120" align="center">
        <template #default="{ row }">
          <el-button link type="primary" size="small" @click="handleOpenNewPage(`/post-edit/${row.post.id}`)"
            >修改</el-button
          >
          <el-button link type="primary" size="small" @click="handleDeletePost(row.post)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <div class="mt-8">
    <div class="inline-block mr-4">
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="queryData.size"
        :total="postData.total"
        @current-change="handleCurrentChange" />
    </div>
    <div class="inline-block text-slate-500">
      总共有<span class="mx-2">{{ postData.total }}</span
      >篇文章
    </div>
  </div>
</template>
