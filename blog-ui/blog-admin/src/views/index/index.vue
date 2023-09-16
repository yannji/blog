<script lang="ts" setup>
import TagData from './tag-data/index.vue'
import CategoryData from './category-data/index.vue'
</script>

<template>
  <div class="card">
    <el-row :gutter="10">
      <el-col :span="8">
        <div></div>
      </el-col>
      <el-col :span="8">
        <div></div>
      </el-col>
      <el-col :span="8"><div></div></el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="12">
        <div class="h-[600px]">
          <TagData />
        </div>
      </el-col>
      <el-col :span="12">
        <div class="h-[600px]">
          <CategoryData />
        </div>
      </el-col>
    </el-row>
  </div>
</template>
