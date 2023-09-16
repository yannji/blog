import type Upload from '../cpn/index.vue'

export function useUploadModal() {
  const modalRef = ref<InstanceType<typeof Upload> | null>(null)
  function openModal() {
    modalRef.value!.show = true
  }
  function closeModal() {
    return modalRef.value!.handleClose
  }
  return {
    modalRef,
    openModal,
    closeModal,
  }
}
