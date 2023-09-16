import type AttachmentModal from '../cpn/index.vue'

export function useImageModal() {
  const modalRef = ref<InstanceType<typeof AttachmentModal> | null>(null)

  function openModal() {
    modalRef.value!.show = true
  }
  function closeModal() {
    modalRef.value!.show = false
  }
  return {
    modalRef,
    openModal,
    closeModal,
  }
}
