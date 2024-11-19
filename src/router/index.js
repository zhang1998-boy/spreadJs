/**
 * @description: RouteRecordRaw 参数说明
 * @param: path {string} 跳转路径
 * @param: redirect {string} 重定向跳转路径
 * @param: component {string} 组件
 * @param: visible {boolean} 一级菜单只有一个二级菜单时是否始终显示。（因为有的一级菜单只有一个二级菜单）
 * @param: meta {object} 可以自定义一些内容
 *         hidden {Boolean} 默认false， 为true表示此路由不作为菜单展示
 *         hideAside {Boolean} 默认false， 为true表示隐藏左侧导航
 *         icon {string} 菜单对应的图标icon, 推荐使用svg形式
 *         title {string} 菜单对应的标题，也作为浏览器标签标题展示
 *         authCodes {array} 用户权限code
 *         operations {array} 当前页面组件用户有权限的操作的 code 列表
 *         isBlank {boolean} 默认false， 是否需要在浏览器新标签页中打开
 *
 *         setBreadcrumbs {function} 重置面包屑内容
 * @return void {*}
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
/*
 * import store from '@/store/index' // TODO: 接入IDM、AM 解注释此语句
 * import { SET_MENUS, GENERATE_ROUTES } from '@/store/actionTypes' // TODO: 接入IDM、AM 解注释此语句
 */
import Layout from '@/layout/index';
import { homeRoutes } from './modules/home'; // 首页
import { formRoutes } from './modules/form'; // 表单
import { tableRoutes } from './modules/table'; // 列表页
import { errorRoutes } from './modules/error'; // 错误页

Vue.use(VueRouter);

const routerPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push (location) {
  return routerPush.call(this, location).catch((error) => error);
};

export const constantRoutes = [

  {
    path: '/outSystem',
    component: { render: e => e('router-view') },
    meta: {
      hidden: true,
    },
    children: [
      {
        path: 'list',
        name: 'projectList',
        component: () => import('@/views/changeManage/index'),
      },
    ]
  },
  {
    path: '/404',
    component: Layout,
    redirect: '/404',
    meta: {
      hidden: true,
    },
    children: [
      {
        path: '/404',
        component: () => import('@/views/404'),
      }
    ],
  },
  {
    path: '/401',
    component: Layout,
    redirect: '/401',
    meta: {
      hidden: true,
      hideAside: true,
    },
    children: [
      {
        path: '/401',
        component: () => import('@/views/401'),
        meta: {
          hideAside: true,
        },
      }
    ],
  },
  // TODO: 接入IDM、AM 删除下边代码
  {
    path: '*',
    redirect: '/404',
    meta: {
      hidden: true,
    },
  }
];

export const asyncRoutes = [
  ...homeRoutes,
  ...formRoutes,
  ...tableRoutes,
  ...errorRoutes
];

const createRouter = () => new VueRouter({
  // mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: [...constantRoutes, ...asyncRoutes], // TODO: 接入IDM、AM 删除此语句
  // routes: constantRoutes // TODO: 接入IDM、AM 解注释此语句
});

const router = createRouter();

// 路由切换接入apm监控
if (window.MAIAAPM && window.MAIAAPM.wrapVueRouter) {
  window.MAIAAPM.wrapVueRouter(router, {
    endDelay: 500, // 切换路由后延迟结束时间
  });
}

router.beforeEach(async (to, from, next) => {
  // 需要根据条件动态设置面包屑的时候可以在meta中设置setBreadcrumbs函数
  if (typeof to.meta.setBreadcrumbs === 'function') {
    to.meta.breadcrumbs = to.meta.setBreadcrumbs(to);
  }

  next(); // TODO: 接入IDM、AM 删除此语句

  // TODO: 接入IDM、AM 解注释下边语句
  /*
   *const hasMenus = store.getters.menus && store.getters.menus.length > 0
   *
   *if (hasMenus) {
   *  next()
   *} else {
   *  const { menus } = await store.dispatch(`user/${SET_MENUS}`)
   *  console.log('menus:', menus)
   *  const accessRoutes = await store.dispatch(
   *    `permission/${GENERATE_ROUTES}`,
   *    menus
   *  )
   *  console.log('accessRoutes:', accessRoutes)
   *
   *  accessRoutes.forEach((item) => {
   *    router.addRoute(item)
   *  })
   *  router.addRoute({
   *    path: '*',
   *    redirect: '/404',
   *    meta: {
   *      hidden: true
   *    }
   *  })
   *
   *  // 用户没有菜单权限 进入401 用户无权限页面
   *  if (!menus.length) {
   *    if (to.path === '/401') {
   *      next()
   *    } else {
   *      next('/401')
   *    }
   *  }
   *  next({ ...to, replace: true })
   *}
   */
});

router.afterEach((to) => {
  setTimeout(() => {
    window.document.title = to.meta.title ? `${to.meta.title}` : '可研管理';
  }, 0);
});

export function resetRouter () {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
