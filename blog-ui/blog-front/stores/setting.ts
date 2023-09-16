import { defineStore } from 'pinia'

export const useSettingStore = defineStore('setting', {
  state: () => ({
    settings: {} as Record<string, any>,
  }),

  actions: {
    async fetchSettings() {
      const config = useRuntimeConfig()
      const { data } = (await useFetch('/setting/list', {
        baseURL: config.public.baseUrl,
      })) as any
      const res = data.value
      if (res.code === 200) {
        this.settings = res.data
      }
    },
  },
})
