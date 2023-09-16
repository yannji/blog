import requests from '@/utils/requests'

import type { ILoginData } from '@/types/user'

export function loginApi(data: ILoginData) {
  return requests.post('/admin/user/login', data)
}

export function logoutApi() {
  return requests.post('/admin/user/logout')
}

export function infoApi() {
  return requests.get('/admin/user/info')
}

export function updatePasswordApi(data: any) {
  return requests.put('/admin/user/password', data)
}

export function updateInfoApi(data: any) {
  return requests.put('/admin/user/info', data)
}
