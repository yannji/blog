<script lang="ts" setup>
import { useTagStore, useCategoryStore } from '@/stores'
const tagStore = useTagStore()
const categoryStore = useCategoryStore()
const { tagsMap } = tagStore
const { categorysMap } = categoryStore
const config = useRuntimeConfig()

const user = ref({} as any)
async function fetchUserData() {
  const { data } = (await useFetch('/user/info', {
    baseURL: config.public.baseUrl,
  })) as any
  const res = data.value
  if (res.code === 200) {
    user.value = res.data
  }
}

await fetchUserData()

const [github, email, qq] = useSettingItem(['github', 'email', 'qq'])
</script>

<template>
  <div class="absolute w-[300px] top-4">
    <div
      class="min-h-[150px] bg-white dark:bg-[#202121] dark:text-white rounded-lg p-2 shadow-sm">
      <h4>个人信息</h4>
      <div class="items-center flex flex-col">
        <div class="w-[100px] overflow-hidden rounded-full cursor-pointer">
          <NuxtImg :src="user.avatar" class="w-full" />
        </div>
        <div class="mt-2">
          {{ user.nickname }}
        </div>
        <div class="mt-2">
          <NuxtLink
            v-if="github"
            class="cursor-pointer"
            :to="github"
            target="_blank">
            <Icon name="mdi:github"
          /></NuxtLink>
          <NuxtLink
            v-if="email"
            class="mx-4 cursor-pointer"
            :to="`mailto:${email}`">
            <Icon name="mdi:email"
          /></NuxtLink>
          <Icon v-if="qq" name="mdi:qqchat" class="cursor-pointer" />
        </div>
      </div>
    </div>
    <div
      class="min-h-[150px] bg-white dark:bg-[#202121] dark:text-white mt-4 rounded-lg px-4 py-2 shadow-sm">
      <h4>分类</h4>
      <ul class="mt-4">
        <li v-for="category in categorysMap" :key="category[1].id">
          <NuxtLink
            :to="`/category/${category[0]}`"
            class="flex items-center pr-2 py-1 cursor-pointer hover:text-blue-400">
            <Icon name="fa6-regular:folder" size="20" class="basis-[25px]" />
            <div class="flex flex-1 justify-between">
              <span>{{ category[0] }}</span>
              <span>{{ category[1].postCount }}</span>
            </div></NuxtLink
          >
        </li>
      </ul>
    </div>
    <div
      class="min-h-[150px] bg-white dark:bg-[#202121] dark:text-white mt-4 rounded-lg px-4 py-2 shadow-sm">
      <h4>标签</h4>
      <ul class="flex flex-wrap mt-4">
        <li
          v-for="tag in tagsMap"
          :key="tag[1].id"
          class="m-1 cursor-pointer hover:bg-blue-400 hover:text-white px-2 text-[14px] text-slate-500 rounded-full">
          <NuxtLink :to="`/tag/${tag[0]}`">
            <span>{{ tag[0] }}</span>
            <span>{{ `（${tag[1].postCount}）` }}</span></NuxtLink
          >
        </li>
      </ul>
    </div>
  </div>
</template>
