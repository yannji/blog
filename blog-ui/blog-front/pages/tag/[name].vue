<script lang="ts" setup>
import { useTagStore } from '@/stores'

const tagStore = useTagStore()
const { tagsMap } = tagStore
const route = useRoute()
const config = useRuntimeConfig()

const tagName = route.params.name as string
const tagId = tagsMap.get(tagName).id

const tagImg = useSettingItem('tagImg')

useHead({
  title: `标签 ${tagName}`,
})

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
  const { data } = (await useFetch(`/tag/${tagId}/post/list`, {
    baseURL: config.public.baseUrl,
    query: { ...queryData },
  })) as any
  const res = data.value
  const { total, list } = res.data
  postData.total = total
  postData.postList = [...postData.postList, ...list]
}

fetchPost()
</script>

<template>
  <NuxtLayout>
    <template #banner>
      <Banner
        :cover-img="tagImg"
        :main-text="`标签 - ${tagName}`"
        :sub-text="`总共 ${postData.total} 篇文章`" />
    </template>
    <template #content>
      <div class="w-full" style="min-height: 590px">
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
      </div>
    </template>
  </NuxtLayout>
</template>
