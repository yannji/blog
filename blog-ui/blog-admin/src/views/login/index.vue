<script lang="ts" setup>
import { ElMessage } from 'element-plus'
import { loginApi } from '@/api/user'

import type { ILoginData } from '@/types/user'

const router = useRouter()

const loginFormData = reactive<ILoginData>({
  username: '',
  password: '',
})

async function handleLogin() {
  const { username, password } = loginFormData
  if (username == '' || password == '') {
    ElMessage.error('请将用户名和密码输入完整哦')
    return
  }
  try {
    const data = await loginApi(loginFormData)
    if (data.code == 200) {
      ElMessage.success('登录成功')
      const redirect = router.currentRoute.value.query['redirect'] as string
      if (redirect) {
        router.push(redirect)
      } else {
        router.push('/')
      }
    }
  } catch {
  } finally {
  }
}
</script>

<template>
  <div class="h-full w-full bg-[whitesmoke] login-page">
    <div
      class="login-box rounded-md translate-y-1/2 m-auto px-6 py-2 w-[390px] h-[300px] bg-white shadow-md flex flex-col justify-around">
      <div class="text-3xl text-center text-gray-800">登录</div>
      <input class="input" placeholder="请输入用户名" type="text" v-model="loginFormData.username" />
      <input
        class="input"
        placeholder="请输入密码"
        type="password"
        v-model="loginFormData.password"
        @keyup.enter="handleLogin" />
      <button
        class="h-[45px] text-xl w-full bg-blue-400 rounded-md text-white hover:bg-blue-500 transition-all duration-200"
        @click="handleLogin">
        登录
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login-page {
  background: inherit;
  position: relative;
  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-image: url('@/assets/imgs/login-background.jpg');
    filter: blur(2px);
    z-index: -1;
  }
}
.input {
  height: 54px;
  border: 1px solid slategray;
  outline: none;
  padding-left: 15px;
  font-size: 16px;
  border-radius: 6px;
  font-size: 20px;
  &::placeholder {
    font-size: 16px;
  }
  &:focus {
    border: 2px solid rgb(18, 178, 252);
  }
}
</style>
