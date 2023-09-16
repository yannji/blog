import router from '@/router'
import Cookie from 'js-cookie'

import { useUserStore, useSettingStore } from '@/stores'

const whiteList = ['/login']

router.beforeEach(async (to, from) => {
  const userStore = useUserStore()
  const settingStore = useSettingStore()

  await settingStore.fetchSettings() // 拉取配置信息
  if (!settingStore.initialized) {
    if (to.path === '/initialize') {
      return true
    } else {
      return '/initialize'
    }
  } else {
    if (to.path === '/initialize') {
      return '/'
    } else {
      const token = Cookie.get('blog-token')
      if (token) {
        try {
          await userStore.getUserInfo() // 拉取用户信息
        } catch {
          userStore.logout()
          return `/login?redirect=${to.fullPath}`
        }
        if (to.path === '/login') {
          return from.fullPath ?? '/'
        } else {
          return true
        }
      } else {
        if (whiteList.indexOf(to.path) !== -1) {
          return true
        } else {
          return `/login?redirect=${to.fullPath}`
        }
      }
    }
  }
})
router.afterEach(() => {})
