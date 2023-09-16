import requests from '@/utils/requests'

export function savePostApi(data: any) {
  return requests.post('/admin/post/save', data)
}

export function postInfoApi(id: string) {
  return requests.get(`/admin/post/info/${id}`)
}

export function settingPostApi(data: any) {
  return requests.put('/admin/post/setting', data)
}

export function listPostApi(data: any) {
  return requests.get('/admin/post/list', {
    params: {
      ...data,
    },
  })
}

export function deletePostApi(id: string) {
  return requests.delete(`/admin/post/${id}`)
}

export function listPostByCategoryIdApi(id: string, data: any) {
  return requests.get(`/admin/category/${id}/post/list`, data)
}

export function listPostByTagIdApi(id: string, data: any) {
  return requests.get(`/admin/tag/${id}/post/list`, data)
}
