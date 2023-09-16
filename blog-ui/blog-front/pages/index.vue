<script lang="ts" setup>
useHead({
  title: '首页',
})
const config = useRuntimeConfig()

const [indexImg, indexText] = useSettingItem(['indexImg', 'indexText'])

const postData = reactive({
  postList: [] as any[],
  total: 0,
})
const queryData = reactive({
  current: 0,
  size: 10,
})

const hasMore = computed(() => postData.postList.length !== postData.total)

async function loadPost() {
  queryData.current = queryData.current + 1
  const { data } = (await useFetch('/post/list', {
    baseURL: config.public.baseUrl,
    query: { ...queryData },
  })) as any
  console.log(data)

  const { total, list } = data.value.data
  postData.total = total
  postData.postList = [...postData.postList, ...list]
}

await loadPost()
</script>

<template>
  <NuxtLayout>
    <template #banner
      ><Banner :cover-img="indexImg" :main-text="indexText"
    /></template>
    <template #content>
      <div class="w-full" style="min-height: 560px">
        <PostList :post-list="postData.postList" />
        <div class="text-center mt-4">
          <template v-if="hasMore">
            <button class="primary-btn" @click="loadPost">
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
