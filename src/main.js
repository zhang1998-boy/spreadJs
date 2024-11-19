import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/packages/theme-chalk/src/index.scss';
// import 'element-ui/lib/theme-chalk/index.css';
import '@longfor/maia-ui-v2-theme';

import LayoutComponent from '@longfor/vue2-layout';
import '@longfor/vue2-layout/dist/index.css';

import * as directives from '@/directives';
import dateUtils from '@/utils/dateUtils';
import App from './App';
import '@/assets/style/index.scss';
import './registerServiceWorker';

//引入css
import '@/assets/style/config.scss';

import '@/assets/style/elementUICover.scss';


import '@/icons'; // icon
import '@/components'; // 需要注册到全局的组件

// 引入组件
import componentsArr from './components/coms.js';
componentsArr.forEach(item => {
  Vue.use(item);
});

import router from './router';
import store from './store';

Vue.config.productionTip = false;

Vue.use(ElementUI, { size: 'small' });

ElementUI.Dialog.props.closeOnClickModal.default = false; // 全局修改默认配置，点击空白处不能关闭弹窗
ElementUI.Dialog.props.closeOnPressEscape.default = false;
// console.log('ElementUI:', ElementUI)

Vue.use(LayoutComponent);

// 自定义指令
Object.keys(directives).forEach((key) => {
  Vue.directive(key, directives[key]);
});

Vue.prototype.$dateUtils = dateUtils;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
