import { defineStore } from 'pinia'
import { infoApi } from '@/api/user'
import Cookie from 'js-cookie'
import type { IUserInfo } from '@/types/user'

export const useUserStore = defineStore('user', {
  state: () => ({
    userInfo: {} as IUserInfo,
  }),
  getters: {},
  actions: {
    getUserInfo() {
      return new Promise((resolve, reject) => {
        infoApi()
          .then((res) => {
            if (res.code !== 200) {
              reject('获取用户信息失败')
            } else {
              this.userInfo = res.data
              resolve(res)
            }
          })
          .catch((err) => reject(err))
      })
    },
    async logout() {
      Cookie.remove('blog-token')
    },
  },
})
