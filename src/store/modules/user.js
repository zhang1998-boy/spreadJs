import { getInfo, logout } from '@/api/modules/user';
import {
  SET_MENUS, SET_USER_NAME, LOGIN_OUT, SET_AUTH_KEYS,
} from '../actionTypes';

// state
const storeState = {
  userName: '',
  menus: [],
  authKeys: [],
};

const actions = {
  [SET_MENUS]({ commit }) {
    return new Promise((resolve, reject) => {
      getInfo().then(({ data }) => {
        const { funcList, securityUserInfo: userInfo } = data;
        const functions = funcList?.[0]?.functions ?? [];
        if (!userInfo || !Object.keys(userInfo).length) {
          // 无用户信息
          commit(SET_MENUS, []);
          commit(SET_AUTH_KEYS, []);
          commit(SET_USER_NAME, '');
          resolve({ menus: [] });
        } else if (!functions || !functions.length) {
          commit(SET_MENUS, []);
          commit(SET_AUTH_KEYS, []);
          commit(SET_USER_NAME, userInfo.realName);
          localStorage.setItem('_user_id', userInfo.userId);
          resolve({ menus: [] });
        } else {
          // type=1表示菜单，type=2表示组件，页面算是一个组件，sort用来控制展示顺序，parentId表示父级菜单
          const authKeys = functions.map((item) => item.code); // type=1和type=2的对应的code

          commit(SET_AUTH_KEYS, authKeys);
          commit(SET_MENUS, functions);
          commit(SET_USER_NAME, userInfo.realName);
          localStorage.setItem('_user_id', userInfo.userId);
          resolve({ menus: functions });
        }
      }).catch((error) => {
        reject(new Error(error));
      });
    });
  },
  [LOGIN_OUT]({ commit }) {
    return new Promise((resolve, reject) => {
      logout().then(({ data }) => {
        commit(SET_MENUS, []);
        commit(SET_AUTH_KEYS, []);
        commit(SET_MENUS, '');
        resolve(data);
      }).catch((error) => {
        reject(new Error(error));
      });
    });
  },
};

// mutations
const mutations = {
  [SET_MENUS](state, menus) {
    state.menus = menus;
  },
  [SET_AUTH_KEYS](state, keys) {
    state.authKeys = keys;
  },
  [SET_USER_NAME](state, userName) {
    state.userName = userName;
  },
};

export default {
  namespaced: true,
  state: storeState,
  actions,
  mutations,
};
