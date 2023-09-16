import { ElMessageBox, type Action, ElMessage } from 'element-plus'

export function usePostList(
  fetchPost: (data: any | null) => Promise<any>,
  deletePostApi: (id: string) => Promise<any>
) {
  const queryData = reactive({
    current: 1,
    size: 10,
    title: undefined,
    isTop: undefined,
    isPublish: undefined,
    isDisplay: undefined,
  })

  const postData = reactive({
    postList: [] as any[],
    total: 0,
  })

  function resetQueryData() {
    queryData.title = undefined
    queryData.isTop = undefined
    queryData.isPublish = undefined
    queryData.isDisplay = undefined
    fetchPost(null)
  }

  function handlePageChange(current: number) {
    queryData.current = current
    fetchPost(null)
  }

  function handleDeletePost(post: any) {
    const { id, title } = post
    if (!id) {
      return
    }
    ElMessageBox({
      title: '提示信息',
      message: `确定要删除<span style="font-weight: bold; margin: 0 5px; color: red;">${title}</span>这篇文章吗？`,
      dangerouslyUseHTMLString: true,
      showCancelButton: true,
      cancelButtonText: '取消',
      confirmButtonText: '确定',
      async callback(type: Action) {
        if (type === 'confirm') {
          try {
            const { code } = await deletePostApi(id)
            if (code === 200) {
              postData.postList = postData.postList.filter((item) => item.post.id != id)
              postData.total = postData.total - 1
              ElMessage.success('删除成功')
            }
          } catch {
          } finally {
          }
        }
      },
    })
  }

  return {
    queryData,
    postData,
    handlePageChange,
    handleDeletePost,
    resetQueryData,
  }
}
