import { defineStore } from 'pinia'

type name = string
type category = any

export const useCategoryStore = defineStore('category', {
  state: () => ({
    categorysMap: new Map<name, category>(),
  }),

  actions: {
    async fetchCategory() {
      const config = useRuntimeConfig()
      const { data } = (await useFetch('/post-category/list', {
        baseURL: config.public.baseUrl,
      })) as any
      const res = data.value
      if (res.code === 200) {
        res.data.forEach((item: any) => {
          const name = item.name
          this.categorysMap.set(name, item)
        })
      }
    },
  },
})
