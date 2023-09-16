import { useSettingStore } from '~/stores'
import { storeToRefs } from 'pinia'

export function useSettingItem(key: string | string[]) {
  const settingStore = useSettingStore()
  const { settings } = storeToRefs(settingStore)
  if (typeof key === 'string') {
    return settings.value[key] ?? ''
  } else {
    const res: any[] = []
    key.forEach((item) => {
      res.push(settings.value[item] ?? '')
    })
    return res
  }
}
