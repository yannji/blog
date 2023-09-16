<script lang="ts" setup>
import Profile from './profile/index.vue'
import Personalization from './personalization/index.vue'
import System from './system/index.vue'
</script>

<template>
  <el-row :gutter="20">
    <el-col :span="4">
      <div class="card">
        <div class="mb-4 text-xl font-bold text-center text-slate-700">个人信息</div>
        <Profile />
      </div>
    </el-col>
    <el-col :span="10">
      <div class="card">
        <div class="mb-4 text-xl font-bold text-center text-slate-700">个性化设置</div>
        <Personalization /></div
    ></el-col>
    <el-col :span="10">
      <div class="card">
        <div class="mb-4 text-xl font-bold text-center text-slate-700">系统设置</div>
        <System />
      </div>
    </el-col>
  </el-row>
</template>
