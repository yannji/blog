import requests from '@/utils/requests'

export function listSettingApi() {
  return requests.get('/setting/list')
}

export function settingInitApi(data: any) {
  return requests.post('/admin/setting/init', data)
}

export function saveOrUpdateSettingApi(data: any) {
  return requests.put('/admin/setting', data)
}
