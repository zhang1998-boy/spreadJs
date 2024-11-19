import Vue from 'vue';
import axios from 'axios';
import envData from './env';

const proxyMsg = require('../../dev.env');

const { baseApi, apiKey } = envData;

const sourceAjaxList = [];

const errorFn = (err) => {
  if (err.toString().includes('timeout')) {
    Vue.prototype.$message.error('请求超时，请稍后再试');
  }
  if (err && err.response) {
    const { status, data, config } = err.response;
    switch (status) {
      case 400:
        err.message = '请求错误';
        break;

      case 401:
      case 403:
        location.href = data.loginUrl;
        // 出现未登录或登录失效取消后面的请求
        sourceAjaxList.length > 0 && sourceAjaxList.forEach((ajaxCancel, index) => {
          ajaxCancel(); // 取消请求
          delete sourceAjaxList[index];
        });
        break;

      case 404:
        err.message = `请求地址出错: ${config.url}`;
        break;

      case 408:
        err.message = '请求超时';
        break;

      case 500:
      case 501:
      case 502:
      case 503:
      case 504:
        err.message = '服务器开个小差，请稍后再试';
        break;

      case 505:
        err.message = 'HTTP版本不受支持';
        break;

      default:
        err.message = '请求失败，请稍后再试';
    }
    Vue.prototype.$message.error(err.message);
  }
  return Promise.reject(err);
};
/* ***此处开始封装不同后台下的axios实例 *** */
// 龙湖后台
const service = axios.create({
  headers: {},
  baseURL: process.env.NODE_ENV === 'development' ? proxyMsg.PROXY_GATEWAY : baseApi,
  timeout: 30000,
  withCredentials: true,
});
service.interceptors.request.use((config) => {
  // 设置 cancel token  用于取消请求 (当一个接口出现401后，取消后续多有发起的请求，避免出现好几个错误提示)
  config.cancelToken = new axios.CancelToken((cancel) => {
    sourceAjaxList.push(cancel);
  });

  // 这里一个token，你需要在这里取到你设置好的token的值 示例逻辑代码
  const token = localStorage.getItem('SESSIONID');
  if (token) {
    // 这里将token设置到headers中，header的key是Authorization，这个key值根据你的需要进行修改即可
    config.headers = {
      SESSIONID: token,
      lxAccount: localStorage.getItem('lxAccount'),
      ...config.headers,
    };
  } else {
    config.headers = {
      'X-Gaia-Api-Key': process.env.NODE_ENV === 'development' ? proxyMsg.API_KEY : apiKey,
      ...config.headers,
    };
  }
  return config;
}, (error) => Promise.reject(error));
service.interceptors.response.use((response) => {
  const result = response.data;
  // 返回数据的code 不为200即为数据出错
  if (+result.code === 0) {
    return result;
  }
  if (+result.code === 403) {
    window.location.href = result.loginUrl || '';
    return false;
  }
  throw new Error(result.message || 'Error');
}, errorFn);
export default service;
