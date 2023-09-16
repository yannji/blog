<script lang="ts" setup>
import { useCategoryStore } from '@/stores'
const categoryStore = useCategoryStore()
const { categorysMap } = categoryStore
const route = useRoute()
const config = useRuntimeConfig()

const categoryName = route.params.name as string
const categoryId = categorysMap.get(categoryName).id

useHead({
  title: `分类 ${categoryName}`,
})

const categoryImg = useSettingItem('categoryImg')

const hasMore = computed(() => postData.postList.length !== postData.total)

const postData = reactive({
  postList: [] as any[],
  total: 0,
})
const queryData = reactive({
  current: 0,
  size: 10,
})

async function fetchPost() {
  queryData.current = queryData.current + 1
  const { data } = (await useFetch(`/category/${categoryId}/post/list`, {
    baseURL: config.public.baseUrl,
    query: { ...queryData },
  })) as any
  const res = data.value

  const { total, list } = res.data
  postData.total = total
  postData.postList = [...postData.postList, ...list]
}

await fetchPost()
</script>

<template>
  <NuxtLayout>
    <template #banner
      ><Banner
        :main-text="`分类 - ${categoryName}`"
        :cover-img="categoryImg"
        :sub-text="`总共 ${postData.total} 篇文章`"
    /></template>
    <template #content
      ><div class="w-full" style="min-height: 590px">
        <PostList :post-list="postData.postList" />
        <div class="text-center mt-4">
          <template v-if="hasMore">
            <button class="primary-btn" @click="fetchPost">
              加载更多
            </button></template
          >
          <template v-else
            ><span class="text-slate-600">已经到底了...</span></template
          >
        </div>
      </div></template
    >
  </NuxtLayout>
</template>
