import Layout from '@/layout/index';

export const homeRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/outSystem/list',
    visible: true,
    meta: {
      title: '首页',
      authCodes: [],
      icon: 'permission',
    },
    children: [
      {
        path: '/home',
        component: () => import(/* webpackChunkName: "Home" */ '@/views/Home/index'),
        meta: {
          authCodes: [],
          icon: 'menu-home',
          title: '首页',
          hideBreadcrumb: true,
        },
      }
    ],
  }
];
