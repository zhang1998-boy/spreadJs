const NODE_ENV = 'development';
// dev 本地开发环境 mock 数据
const PROXY_GATEWAY = '/api';
const PROXY_TARGET_API = 'http://127.0.0.1:8080';
const API_KEY = 'b077d72a-201f-4891-b553-21ca1ffcdbe7';

/*
 * dev 本地开发环境
 * const PROXY_GATEWAY = '/local'
 * const PROXY_TARGET_API = 'http://10.237.10.105:8053'
 * const API_KEY = 'b077d72a-201f-4891-b553-21ca1ffcdbe7'
 */

/*
 * sit 环境
 * const PROXY_GATEWAY = '/iot-ibmsx-gateway'
 * const PROXY_TARGET_API = 'http://api.longfor.sit'
 * const API_KEY = 'b077d72a-201f-4891-b553-21ca1ffcdbe7'
 */

/*
 * uat 环境
 * const PROXY_GATEWAY = '/iot-ibmsx-gateway-uat'
 * const PROXY_TARGET_API = 'http://api.longfor.uat'
 * const API_KEY = '0df6bde9-d148-41ed-b70e-8b1723a99d1b'
 */

/*
 * uat-gw 环境
 * const PROXY_GATEWAY = '/iot-ibmsx-gateway-gw-uat'
 * const PROXY_TARGET_API = 'http://api.longfor.uat'
 * const API_KEY = '7abfba94-bdac-45cb-8624-3e8c4a81405b'
 */

/*
 * pre 环境
 * const PROXY_GATEWAY = '/iot-ibmsx-gateway-npre'
 * const PROXY_TARGET_API = 'https://api-pre.longhu.net'
 * const API_KEY = '47eeb2f7-f0db-4731-8126-c747738fef41'
 */

module.exports = {
  NODE_ENV,
  PROXY_GATEWAY,
  PROXY_TARGET_API,
  API_KEY,
};
