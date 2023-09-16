/// <reference types="vite/client" />

declare module '*.mjs'
declare interface IVueCropper {
  getCropBlob: (callback: (data: File) => void) => void
  changeScale: (num: number) => void
  rotateLeft: () => void
  rotateRight: () => void
}
declare module 'vue-cropper/lib/vue-cropper.vue' {}

interface ImportMetaEnv {
  readonly VITE_API_BASE: string
}
interface ImportMeta {
  readonly env: ImportMetaEnv
}

interface Result<T = any> {
  code: number
  msg: string
  data?: T
}
