<script lang="ts" setup>
import Header from './header/index.vue'
import Sidebar from './sidebar/index.vue'
</script>

<template>
  <el-container class="h-full">
    <el-aside width="auto"> <Sidebar /></el-aside>
    <el-container>
      <el-header height="60px"><Header /></el-header>
      <el-main class="max-h-[calc(100vh-60px)] p-0">
        <div class="w-full min-h-[calc(100vh-60px)] p-4 bg-gray-100">
          <RouterView />
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<style lang="scss">
// reset element style
.el-header {
  padding: 0;
}
.el-main {
  padding: 0;
}
.el-menu {
  border-right: none;
}
</style>
