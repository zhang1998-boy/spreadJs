/**
 * @description: 控制用户操作权限
 */
import router from '@/router/index';

export const permission = {
  inserted(el, binding) {
    console.log('binding:', binding);
    const { value } = binding; // 指令接收到的值

    // 获取当前路由信息
    const currentRouteValue = router.currentRoute.value || {};
    const options = currentRouteValue.meta && currentRouteValue.meta.operations
      ? currentRouteValue.meta.operations
      : [];

    if (value && value instanceof Array && value.length > 0) {
      const hasPermission = options.some((code) => value.includes(code));
      if (!hasPermission) {
        el.remove(); // 如果没有权限移除自身节点
      }
    } else {
      throw new Error('need roles! Like v-permission="[\'admin\',\'editor\']"');
    }
  },
};
