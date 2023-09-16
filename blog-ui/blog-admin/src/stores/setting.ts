import { defineStore } from 'pinia'
import LocalStorage from '@/utils/storage'

import { listSettingApi } from '@/api/setting'

export const useSettingStore = defineStore('setting', {
  state: () => ({
    isCollapse: LocalStorage.getItem('is-collapse') ?? true,
    settings: {} as Record<string, any>,
  }),
  getters: {
    initialized(state) {
      return state.settings.initialized == 'true'
    },
  },
  actions: {
    toggleIsCollapse() {
      this.isCollapse = !this.isCollapse
      LocalStorage.setItem('is-collapse', this.isCollapse)
    },
    async fetchSettings() {
      const { code, data } = await listSettingApi()
      if (code === 200) {
        this.settings = data
      }
    },
  },
})
