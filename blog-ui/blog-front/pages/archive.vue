<script lang="ts" setup>
useHead({
  title: '文章归档',
})
const config = useRuntimeConfig()
const postQuery = reactive({
  current: 1,
  size: 10,
})
const postData = reactive({
  postList: [] as any[],
  total: 0,
})

const archiveImg = useSettingItem('archiveImg')

async function fetchPostList() {
  const { data } = (await useFetch('/archive/post/list', {
    baseURL: config.public.baseUrl,
    params: {
      ...postQuery,
    },
  })) as any
  const res = data.value
  if (res.code === 200) {
    postData.total = res.data.total
    postData.postList = res.data.list
  }
}
await fetchPostList()

function handleCurrentChange(current: number) {
  postQuery.current = current
  fetchPostList()
}
</script>

<template>
  <NuxtLayout>
    <template #banner>
      <Banner
        :cover-img="archiveImg"
        main-text="文章归档"
        :sub-text="`总共 ${postData.total} 篇文章`"
    /></template>
    <template #content>
      <div
        class="card w-full rounded-lg relative dark:bg-[#202121] dark:text-white"
        style="min-height: 590px">
        <div class="mb-[60px]">
          <PostTimeLine :post-list="postData.postList" />
        </div>
        <div class="absolute bottom-4 left-[100px]">
          <Pagination
            :current="postQuery.current"
            :size="postQuery.size"
            :total="postData.total"
            @current-change="handleCurrentChange" />
        </div></div
    ></template>
  </NuxtLayout>
</template>
