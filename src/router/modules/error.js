import Layout from '@/layout/index';

export const errorRoutes = [
  {
    path: '/error',
    component: Layout,
    redirect: '/error/401',
    visible: false,
    meta: {
      title: '异常页',
      icon: 'more',
      authCodes: [],
    },
    children: [
      {
        path: '/error/401',
        component: () => import(
          /* webpackChunkName: "AlarmMgt" */ '@/views/401'
        ),
        meta: {
          authCodes: [],
          title: '401',
        },
      },
      {
        path: '/error/404',
        component: () => import(
          /* webpackChunkName: "AlarmMgt" */ '@/views/404'
        ),
        meta: {
          authCodes: [],
          title: '404',
        },
      }
    ],
  }
];
