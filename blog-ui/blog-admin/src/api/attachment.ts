import requests from '@/utils/requests'

export function listAttachmentApi(data: any) {
  return requests.get('/admin/attachment/list', {
    params: {
      ...data,
    },
  })
}

export function uploadAttachmentApi(
  file: File,
  data: { needCompress: boolean; needRecord: boolean } = { needCompress: true, needRecord: true }
) {
  const formData = new FormData()
  formData.append('attachment', file)
  return requests.post(`/admin/attachment/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    params: data,
  })
}

export function updateAttachmentApi(data: { id: string; remarks: string }) {
  return requests.put('/admin/attachment', data)
}

export function deleteAttachmentApi(data: string[] | string) {
  if (typeof data === 'string') {
    return requests.delete(`/admin/attachment/${data}`)
  } else {
    return requests.delete('/admin/attachment', { delIds: data })
  }
}
