<script lang="ts" setup>
import '@/assets/style/markdown.scss'
import tocbot from 'tocbot'
const config = useRuntimeConfig()

const route = useRoute()
const postId = route.params.id as string

const postData = reactive({
  post: {} as any,
  categorys: [] as any[],
  tags: [] as any[],
})

async function fetchPostData() {
  const { data } = (await useFetch(`/post/info/${postId}`, {
    baseURL: config.public.baseUrl,
  })) as any
  const res = data.value
  if (res.code === 200) {
    postData.post = res.data.post
    postData.categorys = res.data.categorys
    postData.tags = res.data.tags
  }
}
await fetchPostData()

const post = ref<HTMLDivElement | null>(null)

onMounted(() => {
  tocbot.init({
    headingsOffset: 70,
    scrollSmoothOffset: -70,
    // Where to render the table of contents.
    tocSelector: '#toc',
    // Where to grab the headings to build the table of contents.
    contentSelector: '#post-content',
    // Which headings to grab inside of the contentSelector element.
    headingSelector: 'h1, h2, h3',
    // For headings inside relative or absolute positioned containers within content.
    hasInnerContainers: true,
    onClick(e) {
      e.preventDefault()
    },
  })
})
onBeforeUnmount(() => {
  tocbot.destroy()
})
onUpdated(() => {
  tocbot.refresh()
})
</script>

<template>
  <Head>
    <Title>{{ postData.post.title }}</Title></Head
  >
  <NuxtLayout name="post">
    <template #banner>
      <Banner
        :cover-img="postData.post.coverImg"
        :main-text="postData.post.title">
        <template #extra>
          <div class="text-[14px]">
            <div class="flex justify-center">
              <span>标签：</span>
              <ul class="flex justify-center">
                <li
                  v-for="tag in postData.tags"
                  :key="tag.id"
                  class="mx-1 bg-blue-400/90 px-1 rounded">
                  {{ tag.tagName }}
                </li>
              </ul>
            </div>
            <div class="flex justify-center my-2">
              <span>分类：</span>
              <ul class="flex justify-center">
                <li
                  v-for="category in postData.categorys"
                  :key="category.id"
                  class="mx-1 bg-blue-400/90 px-1 rounded">
                  {{ category.categoryName }}
                </li>
              </ul>
            </div>
            <div class="flex justify-center">
              <span>发布时间：</span>
              <div>{{ postData.post.publishTime }}</div>
            </div>
          </div></template
        >
      </Banner>
    </template>
    <template #content
      ><div
        class="w-[1024px] mx-auto relative left-[40px] flex"
        style="min-height: 590px">
        <div
          class="basis-[750px] mx-auto bg-white shadow-md p-8 dark:bg-[#202121] dark:text-white">
          <div>
            <h1>{{ postData.post.title }}</h1>
          </div>
          <article
            v-html="$mdRender(postData.post.mdContent)"
            ref="post"
            id="post-content"
            class="markdown-body w-[750px]" />
        </div>
        <div class="basis-[300px] ml-[10px] dark:text-white">
          <div id="toc" class="sticky top-[100px] h-[500px]"></div>
        </div></div
    ></template>
  </NuxtLayout>
</template>

<style lang="scss">
@import 'tocbot/src/scss/tocbot';
.toc-list-item {
  line-height: 2;
  list-style: none;
}
.toc-link {
  display: block;
  border-left: 3px solid transparent;
  padding-left: 0px;
  color: #666261 !important;
  transition: all 0.2s ease-in-out;
  &::before {
    display: none;
  }
}
.is-active-link {
  border-left-color: #009d92;
  background: #00c4b6;
  color: #fff !important;
}
</style>
