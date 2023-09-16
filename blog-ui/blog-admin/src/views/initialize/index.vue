<script lang="ts" setup>
import { settingInitApi } from '@/api/setting'
import { ElMessage } from 'element-plus'

const router = useRouter()
const formData = reactive({
  host: '',
  nickname: '',
  username: '',
  password: '',
  ensurePassword: '',
})
async function handleSaveSetting() {
  const { host, nickname, username, password } = formData
  if (host === '' || nickname === '' || username === '' || password === '') {
    ElMessage.error('请将字段填写完整')
    return
  }
  if (formData.password !== formData.ensurePassword) {
    ElMessage.error('两次输入的密码不一致')
    return
  }

  const res = await settingInitApi(formData)
  if (res.code === 200) {
    ElMessage.success('设置成功')
    router.push('/')
  }
}
</script>

<template>
  <div class="bg-[whitesmoke] fixed left-0 right-0 top-0 bottom-0">
    <div
      class="absolute bg-white w-[600px] -translate-x-1/2 translate-y-10 left-1/2 rounded-md py-8 px-4 shadow-md flex flex-col">
      <div class="text-2xl font-semibold text-center text-slate-700">初始化设置</div>
      <div class="form">
        <div><span>网址：</span><input v-model="formData.host" /></div>
        <div><span>昵称：</span><input v-model="formData.nickname" /></div>
        <div><span>用户名：</span><input v-model="formData.username" /></div>
        <div><span>密码：</span><input type="password" v-model="formData.password" /></div>
        <div><span>确认密码：</span><input type="password" v-model="formData.ensurePassword" /></div>
      </div>
      <div class="text-center">
        <button class="w-4/5 h-[40px] primary-btn" @click="">
          <div class="tracking-[10px]" @click="handleSaveSetting">确定</div>
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.form {
  > div {
    margin: 20px 0;
    height: 60px;
    color: slategray;
    > span {
      display: inline-block;
      font-size: 18px;
      width: 100px;
      text-align: right;
      line-height: 60px;
    }
    > input {
      height: 40px;
      width: 400px;
      border: none;
      border-bottom: slategrey solid 2px;
      outline: none;
      font-size: 20px;
      padding-left: 10px;
      margin-left: 10px;
      color: black;
    }
  }
}
</style>
