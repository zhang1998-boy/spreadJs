import Layout from '@/layout/index';

export const formRoutes = [
  {
    path: '/entry',
    component: Layout,
    redirect: '/form/basic-form',
    visible: true,
    meta: {
      title: '输入',
      icon: 'itsm',
      authCodes: [],
    },
    children: [
      {
        path: '/entry/demo',
        component: () => import(
          /* webpackChunkName: "AlarmMgt" */ '@/views/Form/BasicForm/index'
        ),
        meta: {
          authCodes: [],
          title: '投资条件',
        },

      },
      {
        path: '/entry/table',
        component: () => import(
          /* webpackChunkName: "AlarmMgt" */ '@/views/Form/AdvancedForm/index'
        ),
        meta: {
          authCodes: [],
          title: '高级表单',
        },
      }
    ],
  }
];
