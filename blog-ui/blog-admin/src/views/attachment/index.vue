<script lang="ts" setup>
import { listAttachmentApi, updateAttachmentApi, deleteAttachmentApi, uploadAttachmentApi } from '@/api/attachment'
import { ElMessage, ElMessageBox, ElTable, type Action } from 'element-plus'

import { UploadModal, useUploadModal } from '@/components/upload-modal'

const { modalRef, openModal } = useUploadModal()

const queryData = reactive({
  current: 1,
  size: 10,
  type: undefined,
  remarks: undefined,
})
const pageResult = reactive({
  pages: 0,
  total: 0,
  list: [] as any[],
})

async function fetchAttachmentData() {
  const res = await listAttachmentApi(queryData)
  if (res.code === 200) {
    pageResult.pages = res.data.pages
    pageResult.total = res.data.total
    pageResult.list = res.data.list
  }
}

fetchAttachmentData()

const tableRef = ref<InstanceType<typeof ElTable> | null>(null)

function handleCurrentChange(current: number) {
  queryData.current = current
  fetchAttachmentData()
}

function handleDeleteBatch() {
  const rows: any[] = tableRef.value?.getSelectionRows()
  if (rows.length === 0) {
    ElMessage.warning('请选择要删除的附件哦')
    return
  }
  const delIds: string[] = []
  rows.forEach((item) => delIds.push(item.id))
  ElMessageBox({
    title: '提示信息',
    message: `确定要删除选定的这 <span style="color: red;">${delIds.length} </span> 项附件吗？`,
    dangerouslyUseHTMLString: true,
    showCancelButton: true,
    cancelButtonText: '取消',
    confirmButtonText: '确定',
    async callback(type: Action) {
      if (type === 'confirm') {
        try {
          const res = await deleteAttachmentApi(delIds)
          if (res.code === 200) {
            ElMessage.success('批量删除成功')
          }
        } catch {
        } finally {
          queryData.current = 1
          fetchAttachmentData()
        }
      }
    },
  })
}

function handleSetRemarks(row: any) {
  const oldRemarks = row.remarks
  const { id } = row
  ElMessageBox({
    message: oldRemarks ? '请修改备注' : '请输入备注',
    showInput: true,
    title: '设置附件备注',
    showCancelButton: true,
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    inputValue: oldRemarks ?? '',
  }).then(async ({ value }) => {
    const res = await updateAttachmentApi({ id, remarks: value })
    if (res.code === 200) {
      ElMessage.success('设置成功')
      pageResult.list.find((item) => item.id === id).remarks = value
    }
  })
}

async function handleDeleteAttachment(id: string) {
  ElMessageBox({
    title: '提示信息',
    message: `确定要删除此附件吗？`,
    showCancelButton: true,
    cancelButtonText: '取消',
    confirmButtonText: '确定',
    async callback(type: Action) {
      if (type === 'confirm') {
        try {
          const res = await deleteAttachmentApi(id)
          if (res.code === 200) {
            ElMessage.success('删除成功')
          }
        } catch {
        } finally {
          queryData.current = 1
          fetchAttachmentData()
        }
      }
    },
  })
}

async function handleQueryAttachment() {
  try {
    await fetchAttachmentData()
    ElMessage.success('查询成功')
  } catch {}
}
async function handleResetQuery() {
  queryData.current = 1
  queryData.size = 10
  queryData.remarks = undefined
  queryData.type = undefined
  await fetchAttachmentData()
}
</script>

<template>
  <UploadModal ref="modalRef" @close="fetchAttachmentData" />
  <div class="relative flex mb-4 card">
    <el-form :inline="true" class="pt-4" :model="queryData">
      <el-form-item label="备注">
        <el-input placeholder="请输入备注" v-model="queryData.remarks" />
      </el-form-item>
      <el-form-item label="附件类型">
        <el-select v-model="queryData.type">
          <el-option label="图片" :value="0" />
          <el-option label="其他" :value="1" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="handleResetQuery">重置</el-button>
        <el-button type="primary" @click="handleQueryAttachment">查询</el-button>
      </el-form-item>
    </el-form>
    <div class="absolute right-4 top-8">
      <el-button type="primary" @click="openModal">上传附件</el-button>
      <el-button type="danger" @click="handleDeleteBatch">批量删除</el-button>
    </div>
  </div>
  <div class="card">
    <el-table :data="pageResult.list" stripe style="width: 100%" ref="tableRef">
      <el-table-column type="selection" width="55" />
      <el-table-column type="index" label="序号" width="55" />
      <el-table-column prop="name" label="附件名" />
      <el-table-column prop="originName" label="原始文件名" show-overflow-tooltip />
      <el-table-column label="大小" align="center">
        <template #default="{ row }">
          <template v-if="row.size / 1024 >= 1024">
            <span>{{ (row.size / 1024 / 1024).toFixed(2) }} MB</span>
          </template>
          <template v-else>
            <span>{{ (row.size / 1024).toFixed(2) }} KB</span>
          </template>
        </template>
      </el-table-column>
      <el-table-column prop="type" label="类型" align="center" />
      <el-table-column label="预览" align="center">
        <template #default="{ row }">
          <template v-if="row.type.startsWith('image/')">
            <el-image
              style="width: 100px"
              :src="row.link"
              :zoom-rate="1.2"
              :preview-src-list="[row.link]"
              :z-index="99"
              fit="cover"
              preview-teleported />
          </template>
          <template v-else>
            <span>{{ row.type.split('/')[1] }}类型文件</span>
          </template>
        </template>
      </el-table-column>
      <el-table-column prop="remarks" label="备注" align="center" />
      <el-table-column prop="createTime" label="添加时间" align="center" />
      <el-table-column label="操作" width="170" align="center">
        <template #default="{ row }">
          <a :href="row.link" target="_blank" class="text-blue-400">预览</a>
          <a href="javascript:void;" class="mx-2 text-blue-400" @click="handleSetRemarks(row)">设置备注</a>
          <a href="javascript:void;" class="text-blue-400" @click="handleDeleteAttachment(row.id)">删除</a>
        </template>
      </el-table-column>
    </el-table>
    <div class="mt-4">
      <div class="inline-block mr-4">
        <el-pagination
          background
          layout="prev, pager, next"
          :page-size="queryData.size"
          :total="pageResult.total"
          @current-change="handleCurrentChange" />
      </div>
      <div class="inline-block text-slate-500">
        总共有<span class="mx-2">{{ pageResult.total }}</span
        >个附件
      </div>
    </div>
  </div>
</template>
