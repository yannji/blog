import { useCategoryStore } from '~/stores'

export default defineNuxtRouteMiddleware(async (to, from) => {
  const categoryStore = useCategoryStore()
  await categoryStore.fetchCategory()
  if (to.name === 'category-name') {
    const categoryName = to.params.name as string
    if (categoryStore.categorysMap.get(categoryName) === undefined) {
      return navigateTo('/not-found')
    }
  }
})
