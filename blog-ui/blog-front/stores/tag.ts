import { defineStore } from 'pinia'

type name = string
type tag = any

export const useTagStore = defineStore('tag', {
  state: () => ({
    tagsMap: new Map<name, tag>(),
  }),

  actions: {
    async fetchTags() {
      const config = useRuntimeConfig()
      const { data } = (await useFetch('/post-tag/list', {
        baseURL: config.public.baseUrl,
      })) as any
      const res = data.value
      if (res.code === 200) {
        res.data.forEach((item: any) => {
          const name = item.name
          this.tagsMap.set(name, item)
        })
      }
    },
  },
})
