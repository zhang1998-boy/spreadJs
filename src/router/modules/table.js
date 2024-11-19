import Layout from '@/layout/index';

export const tableRoutes = [
  {
    path: '/summary',
    component: Layout,
    redirect: '/summary/list',
    visible: true,
    meta: {
      title: '输出',
      icon: 'help',
      authCodes: [],
    },
    children: [
      {
        path: '/summary/list',
        component: () => import(
          /* webpackChunkName: "AlarmMgt" */ '@/views/Table/TableList/index'
        ),
        meta: {
          authCodes: [],
          title: '基础查询表格',
        },
      },
      {
        path: '/summary/table-list-2',
        component: () => import(
          /* webpackChunkName: "AlarmMgt" */ '@/views/Table/TableList2/index'
        ),
        meta: {
          authCodes: [],
          title: '复杂查询表格',
        },
      }
    ],
  }
];
