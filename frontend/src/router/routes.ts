import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
  },

  {
    path: '/webcams',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/WebcamsPage.vue') }],
  },

  {
    path: '/analysis',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/WebcamsPage.vue') }],
  },

  {
    path: '/settings',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/WebcamsPage.vue') }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
