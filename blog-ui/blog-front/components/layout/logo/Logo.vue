<script lang="ts" setup>
const logo = useSettingItem('logo')
const config = useRuntimeConfig()
const host = config.public.baseUrl.replace("/api","")
</script>

<template>
  <div class="basis-[250px]">
    <a
      class="inline-block w-[45px] h-full mx-[45px]"
      :href="host"
      target="_blank"
      ><img :src="logo" class="h-[45px] mt-1"
    /></a>
  </div>
</template>
