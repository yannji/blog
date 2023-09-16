import requests from '@/utils/requests'

export function listCategoryApi() {
  return requests.get('/admin/post-category/list')
}

export function updateCategoryApi(data: any) {
  return requests.put('/admin/post-category', data)
}

export function createCategoryApi(data: any) {
  return requests.post('/admin/post-category', data)
}

export function removeCategoryApi(id: string) {
  return requests.delete(`/admin/post-category/${id}`)
}
