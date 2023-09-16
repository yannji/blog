import { useSettingStore } from '@/stores'

export function useSettingItem(key: string | string[]) {
  const settingStore = useSettingStore()
  if (typeof key === 'string') {
    return settingStore.settings[key] ?? ''
  } else {
    const res: any[] = []
    key.forEach((k) => {
      res.push(settingStore.settings[k] ?? '')
    })
    return res
  }
}
