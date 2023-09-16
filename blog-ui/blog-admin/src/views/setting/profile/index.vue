<script lang="ts" setup>
import { useUserStore } from '@/stores'
import { logoutApi, updatePasswordApi, updateInfoApi } from '@/api/user'
import { ElMessage, ElMessageBox, type FormInstance, type FormRules, type Action } from 'element-plus'
import { saveOrUpdateSettingApi } from '@/api/setting'
import { useSettingItem } from '@/hooks/useSettingItem'

import MdEditor from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'

import AvatarUpdater from './avatar-updater/index.vue'

const formRef = ref<FormInstance | null>(null)

const userStore = useUserStore()
const router = useRouter()

const { userInfo } = userStore
const passwordDialog = reactive({
  showDialog: false,
  oldPassword: '',
  newPassword: '',
  ensurePassword: '',
})
const validateEnsurePassword = (rule: any, value: any, callback: any) => {
  if (passwordDialog.newPassword !== passwordDialog.ensurePassword) {
    callback(new Error('两次输入密码不一致'))
  } else {
    callback()
  }
}
const rules: FormRules = {
  oldPassword: [{ required: true, message: '请输入旧密码', trigger: 'blur' }],
  newPassword: [{ required: true, message: '请输入新密码', trigger: 'blur' }],
  ensurePassword: [
    { required: true, message: '请再次确认新密码', trigger: 'blur' },
    { validator: validateEnsurePassword, trigger: 'blur' },
  ],
}

function togglePasswordDialog() {
  passwordDialog.showDialog = !passwordDialog.showDialog
  resetForm(formRef.value)
}

const resetForm = (formEl: FormInstance | null) => {
  if (!formEl) return
  formEl.resetFields()
}

const submitForm = (formEl: FormInstance | null) => {
  if (!formEl) return
  formEl.validate(async (valid) => {
    if (valid) {
      const { oldPassword, newPassword } = passwordDialog
      const res = await updatePasswordApi({ oldPassword, newPassword })
      if (res.code === 200) {
        ElMessage.success('修改成功')
        togglePasswordDialog()
      }
    } else {
      return false
    }
  })
}

function handleLogout() {
  ElMessageBox({
    title: '提示消息',
    message: `请问确定要退出登录吗？`,
    type: 'warning',
    showCancelButton: true,
    async callback(action: Action) {
      if (action === 'confirm') {
        await logoutApi()
        router.push('/login')
        ElMessage.success('退出登录成功')
      }
    },
  })
}

const infoDialog = reactive({
  showDialog: false,
  avatar: userInfo.avatar,
  nickname: userInfo.nickname,
})
function toggleInfoDialog() {
  infoDialog.showDialog = !infoDialog.showDialog
}

const avatarUpdaterRef = ref<InstanceType<typeof AvatarUpdater> | null>(null)
function handleOpenAvatarUpdaterDialog() {
  avatarUpdaterRef.value?.openDialog()
}

function handleSuccessUpdateAvatar(url: string) {
  infoDialog.avatar = url
}

async function handleUpdateInfo() {
  const { avatar, nickname } = infoDialog
  if (avatar == '' || nickname == '') {
    ElMessage.error('头像或昵称不能为空')
    return
  }
  const res = await updateInfoApi({ avatar, nickname })
  if (res.code === 200) {
    ElMessage.success('修改成功')
    userInfo.avatar = infoDialog.avatar
    userInfo.nickname = infoDialog.nickname
    toggleInfoDialog()
  }
}

const aboutDialogData = reactive({
  show: false,
  content: useSettingItem('aboutme'),
})
function toggleAboutDialog() {
  aboutDialogData.show = !aboutDialogData.show
}

async function submitAboutMe() {
  const d = [{ key: 'aboutme', value: aboutDialogData.content }]
  const res = await saveOrUpdateSettingApi(d)
  if (res.code === 200) {
    ElMessage.success('修改成功')
  }
}
</script>

<template>
  <div class="flex flex-col items-center justify-center">
    <div class="w-full"><img class="w-full" :src="userInfo.avatar" /></div>
    <span class="mt-2 text-slate-600">{{ userInfo.nickname }}</span>
    <div class="w-full">
      <el-button type="primary" class="w-full mt-4" @click="toggleAboutDialog">编辑关于页</el-button>
    </div>
    <div class="w-full">
      <el-button class="w-full mt-4" type="success" @click="toggleInfoDialog">修改信息</el-button>
    </div>
    <div class="w-full">
      <el-button class="w-full mt-4" type="primary" @click="togglePasswordDialog">修改密码</el-button>
    </div>
    <div class="w-full">
      <el-button class="w-full mt-4" type="danger" @click="handleLogout">退出登录</el-button>
    </div>
  </div>
  <el-dialog
    title="修改信息"
    v-model="infoDialog.showDialog"
    width="500px"
    :close-on-click-modal="false"
    class="!rounded-md">
    <div class="flex flex-col">
      <span class="mb-2">头像：</span>
      <div class="h-[200px]" @click="handleOpenAvatarUpdaterDialog">
        <img
          :src="infoDialog.avatar"
          class="h-full cursor-pointer mx-auto rounded-md overflow-hidden border-blue-300 border-[5px]" />
      </div>
      <span class="mt-4 mb-2">用户名：</span>
      <div>
        <input
          v-model="infoDialog.nickname"
          class="h-[50px] rounded-md w-full border-blue-300 pl-2 border-[1px] focus:border-[2px] outline-none" />
      </div>
    </div>
    <template #footer>
      <div class="flex">
        <el-button class="flex-1" @click="toggleInfoDialog">取消</el-button>
        <el-button class="flex-1" type="primary" @click="handleUpdateInfo">确定</el-button>
      </div>
    </template>
  </el-dialog>
  <el-dialog
    v-model="passwordDialog.showDialog"
    :close-on-click-modal="false"
    class="!rounded-md"
    width="500px"
    title="修改密码">
    <el-form label-position="top" size="large" :rules="rules" :model="passwordDialog" ref="formRef" status-icon>
      <el-form-item label="旧密码" prop="oldPassword"
        ><el-input type="password" v-model="passwordDialog.oldPassword"
      /></el-form-item>
      <el-form-item label="新密码" prop="newPassword"
        ><el-input type="password" v-model="passwordDialog.newPassword" /></el-form-item
      ><el-form-item label="确认新密码" prop="ensurePassword"
        ><el-input type="password" v-model="passwordDialog.ensurePassword" /></el-form-item
    ></el-form>
    <template #footer>
      <div class="flex">
        <el-button class="flex-1" @click="togglePasswordDialog()">取消</el-button
        ><el-button type="primary" class="flex-1" @click="submitForm(formRef)">确认</el-button>
      </div>
    </template>
  </el-dialog>
  <el-dialog title="关于页编辑" class="!rounded-md" width="800px" v-model="aboutDialogData.show">
    <MdEditor v-model="aboutDialogData.content" :toolbars-exclude="['mermaid', 'katex']" :footers="['markdownTotal']" />
    <template #footer>
      <div>
        <el-button @click="toggleAboutDialog">取消</el-button
        ><el-button type="primary" @click="submitAboutMe">确定</el-button>
      </div>
    </template>
  </el-dialog>
  <AvatarUpdater ref="avatarUpdaterRef" :img-url="userInfo.avatar" @success="handleSuccessUpdateAvatar" />
</template>
