import { useSettingStore } from '~/stores'

export default defineNuxtRouteMiddleware(async (to, from) => {
  const settingStore = useSettingStore()
  await settingStore.fetchSettings()
})
