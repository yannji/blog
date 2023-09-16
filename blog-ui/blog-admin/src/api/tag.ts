import requests from '@/utils/requests'

export function listTagApi() {
  return requests.get('/admin/post-tag/list')
}

export function updateTagApi(data: any) {
  return requests.put('/admin/post-tag', data)
}

export function createTagApi(data: any) {
  return requests.post('/admin/post-tag', data)
}

export function removeTagApi(id: string) {
  return requests.delete(`/admin/post-tag/${id}`)
}
