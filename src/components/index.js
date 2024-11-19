/**
 * @description: 需要注册到全局的组件
 */
import Vue from 'vue';
import LfPagination from './LfPagination/index';
import LfTable from './LfTable/index';
import LfForm from './LfForm/index';
import FormItem from './FormItem/index';
import PageFormTitle from './PageFormTitle/index';

// 全局注册
Vue.component('lf-pagination', LfPagination);
Vue.component('lf-table', LfTable);
Vue.component('lf-form', LfForm);
Vue.component('form-item', FormItem);
Vue.component(PageFormTitle);
