const getters = {
  // app.ts 中的getters
  collapse: (state) => state.app.collapse,

  // user.ts 中的getters
  menus: (state) => state.user.menus,
  userName: (state) => state.user.userName,
  authKeys: (state) => state.user.authKeys,

  // permission.ts 中的getters
  permissionRoutes: (state) => state.permission.permissionRoutes,
};
export default getters;
