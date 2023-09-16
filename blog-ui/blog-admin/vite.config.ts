import { fileURLToPath, URL } from 'node:url'
import AutoImport from 'unplugin-auto-import/vite'

import { defineConfig, loadEnv, type ConfigEnv } from 'vite'

import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default (env: ConfigEnv) => {
  return defineConfig({
    base: '/',
    plugins: [
      vue(),
      AutoImport({
        include: [
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          /\.vue$/,
          /\.vue\?vue/, // .vue
        ],
        imports: ['vue', 'vue-router'],
        dts: './auto-imports.d.ts',
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      open: true,
      proxy: {
        [loadEnv(env.mode, process.cwd()).VITE_API_BASE]: {
          target: 'http://localhost:8888',
          changeOrigin: true,
          rewrite: (path) => path.replace(new RegExp(`^${loadEnv(env.mode, process.cwd()).VITE_API_BASE}`), ''),
        },
      },
    },
  })
}
