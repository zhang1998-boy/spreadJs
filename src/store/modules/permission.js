import { asyncRoutes, constantRoutes } from '@/router';
import { GENERATE_ROUTES } from '../actionTypes';

/**
 * @description: 如果菜单有权限，返回对应的索引
 * @param {any} route 路由
 * @param {Array} menus 用户有权限的菜单信息
 * @return {*}
 */
function matchedMenuIndex(route, menus) {
  if (route.meta && route.meta.authCodes) {
    return menus.findIndex((menu) => route.meta.authCodes.includes(menu.code));
  }
  // TODO：可优化，放开一些不需要鉴权的路由
  return -1;
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, menus) {
  const result = [];

  routes.forEach((route) => {
    const index = matchedMenuIndex(route, menus);
    if (index > -1) {
      if (route.children) {
        route.children = filterAsyncRoutes(route.children, menus);
      }
      route.meta = route.meta
        ? { ...route.meta, operations: menus[index].operations ?? [] }
        : { operations: menus[index].operations ?? [] };
      result.push(route);
    }
  });

  return result;
}

const storeState = {
  permissionRoutes: [], // 最终要展示到菜单的路由列表
  addRoutes: [],
};

const actions = {
  /**
   * @description: 格式化要展示的菜单
   * @param {*} commit
   * @param {*} menus 后端返回的有权限的菜单
   * @return {*}
   */
  [GENERATE_ROUTES]({ commit }, menus) {
    return new Promise((resolve) => {
      const accessedRoutes = filterAsyncRoutes(asyncRoutes, menus);
      commit('SET_ROUTES', accessedRoutes);
      resolve(accessedRoutes);
    });
  },
};

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes;
    state.permissionRoutes = constantRoutes.concat(routes);
  },
};

export default {
  namespaced: true,
  state: storeState,
  actions,
  mutations,
};
