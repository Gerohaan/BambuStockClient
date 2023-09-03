import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/IndexPage.vue') },
    ],
  },

  {
    path: '/app',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'index',
        component: () => import('src/pages/indexApp.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'categorias',
        name: 'categories',
        component: () => import('src/pages/categoryPage.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'almacens',
        name: 'warehouses',
        component: () => import('src/pages/storePage.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'units',
        name: 'unit',
        component: () => import('src/pages/unitPage.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'presentations',
        name: 'presentation',
        component: () => import('src/pages/productPresentationPage.vue'),
        meta: { requiresAuth: true },
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
