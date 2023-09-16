import { useTagStore } from '~/stores'

export default defineNuxtRouteMiddleware(async (to, from) => {
  const tagStore = useTagStore()
  await tagStore.fetchTags()
  if (to.name === 'tag-name') {
    const tagName = to.params.name as string
    if (tagStore.tagsMap.get(tagName) === undefined) {
      return navigateTo('/not-found')
    }
  }
})
