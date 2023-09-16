<script lang="ts" setup>
import { useSettingStore } from '@/stores'
import { storeToRefs } from 'pinia'
import { PriceTag, Tools, HomeFilled, List, Files } from '@element-plus/icons-vue'
const settingStore = useSettingStore()
const { isCollapse } = storeToRefs(settingStore)
</script>

<template>
  <div class="w-full bg-[#323841] h-full">
    <el-menu
      active-text-color="#007ffc"
      background-color="#323841"
      :default-active="$route.path"
      text-color="#fff"
      :collapse="isCollapse"
      router>
      <el-menu-item index="/">
        <el-icon :size="40">
          <HomeFilled />
        </el-icon>
        <span class="px-2 mx-2 text-lg">系统首页</span>
      </el-menu-item>
      <el-menu-item index="/post">
        <el-icon :size="40">
          <List />
        </el-icon>
        <span class="px-2 mx-2 text-lg">文章管理</span>
      </el-menu-item>
      <el-menu-item index="/category">
        <el-icon :size="40">
          <Files />
        </el-icon>
        <span class="px-2 mx-2 text-lg">分类管理</span>
      </el-menu-item>
      <el-menu-item index="/tag">
        <el-icon :size="40">
          <PriceTag />
        </el-icon>
        <span class="px-2 mx-2 text-lg">标签管理</span>
      </el-menu-item>
      <el-menu-item index="/attachment">
        <el-icon :size="40">
          <Files />
        </el-icon>
        <span class="px-2 mx-2 text-lg">附件管理</span>
      </el-menu-item>
      <el-menu-item index="/setting">
        <el-icon :size="40">
          <Tools />
        </el-icon>
        <span class="px-2 mx-2 text-lg">系统设置</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>
