import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const Initialize = () => import('@/views/initialize/index.vue')
const Login = () => import('@/views/login/index.vue')
const Layout = () => import('@/layout/index.vue')
const Index = () => import('@/views/index/index.vue')
const Attachment = () => import('@/views/attachment/index.vue')
const Category = () => import('@/views/category/index.vue')
const Tag = () => import('@/views/tag/index.vue')
const Post = () => import('@/views/post/index.vue')
const PostEdit = () => import('@/views/post-edit/index.vue')
const Setting = () => import('@/views/setting/index.vue')
const NotFound = () => import('@/views/not-found/index.vue')

const routes: RouteRecordRaw[] = [
  {
    path: '/initialize',
    component: Initialize,
    meta: {
      desc: '初始化',
    },
  },
  {
    path: '/login',
    component: Login,
    meta: {
      desc: '登录',
    },
  },
  {
    path: '/',
    component: Layout,
    redirect: '/',
    children: [
      {
        path: '',
        component: Index,
        meta: {
          desc: '首页',
        },
      },
      {
        path: 'attachment',
        component: Attachment,
        meta: {
          desc: '附件管理',
        },
      },
      {
        path: 'category',
        component: Category,
        meta: {
          desc: '分类管理',
        },
      },
      {
        path: 'tag',
        component: Tag,
        meta: {
          desc: '标签管理',
        },
      },
      {
        path: 'post',
        component: Post,
        meta: {
          desc: '文章管理',
        },
      },
      {
        path: 'post-edit/:id(\\d+)?',
        component: PostEdit,
        meta: {
          desc: '文章编辑',
        },
      },
      {
        path: 'setting',
        component: Setting,
        meta: {
          desc: '系统设置',
        },
      },
      {
        path: '/:pathMatch(.*)*',
        component: NotFound,
        meta: {
          desc: '未知页面',
        },
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
