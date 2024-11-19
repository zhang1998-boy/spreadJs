
const envMap = {
  dev: {
    baseApi: 'http://api.longfor.sit/iot-ibmsx-gateway',
    apiKey: 'b077d72a-201f-4891-b553-21ca1ffcdbe7',
    qDLoginUrl: 'https://qap.qdingnet.com/account/login',
  },
  sit: {
    baseApi: 'http://api.longfor.sit/iot-ibmsx-gateway',
    apiKey: 'b077d72a-201f-4891-b553-21ca1ffcdbe7',
    qDLoginUrl: 'https://qap.qdingnet.com/account/login',
  },
  'qd-sit': {
    baseApi: 'https://testapi.longhu.net/iot-ibmsx-gateway',
    apiKey: 'b077d72a-201f-4891-b553-21ca1ffcdbe7',
    qDLoginUrl: 'https://qap.qdingnet.com/account/login',
  },
  uat: {
    baseApi: 'http://api.longfor.uat/iot-ibmsx-gateway-uat',
    apiKey: '0df6bde9-d148-41ed-b70e-8b1723a99d1b',
    qDLoginUrl: 'https://qap.qdingnet.com/account/login',
  },
  'qd-uat': {
    baseApi: 'https://testapi.longhu.net/iot-ibmsx-gateway-uat',
    apiKey: '0df6bde9-d148-41ed-b70e-8b1723a99d1b',
    qDLoginUrl: 'https://qap.qdingnet.com/account/login',
  },
  'uat-gw': {
    baseApi: 'http://api.longfor.uat/iot-ibmsx-gateway-gw-uat',
    apiKey: '7abfba94-bdac-45cb-8624-3e8c4a81405b',
    qDLoginUrl: 'https://qap.qdingnet.com/account/login',
  },
  pre: {
    baseApi: 'https://api-pre.longhu.net/iot-ibmsx-gateway-npre',
    apiKey: '47eeb2f7-f0db-4731-8126-c747738fef41',
    qDLoginUrl: 'https://p.qdingnet.com/account/login',
  },
  prod: {
    baseApi: 'https://api.longhu.net/iot-ibmsx2-gateway-prod',
    apiKey: 'b9004535-4381-4a05-9a3d-a4dfd5bd8851',
    qDLoginUrl: 'https://p.qdingnet.com/account/login',
  },
  'qd-prod': {
    baseApi: 'https://openapi.longhu.net/iot-ibmsx-gateway-prod',
    apiKey: '1457cae0-9c06-4c1d-928a-ae4d6d19ea49',
    qDLoginUrl: 'https://p.qdingnet.com/account/login',
  },
};

let env = 'dev';
const { hostname } = window.location;
switch (hostname) {
  case 'ibms-x-front.h5.longfor.sit':
    env = 'sit';
    break;
  case 'ibms-x-front.h5.longfor.uat':
    env = 'uat';
    break;
  case 'ibms-x-front-gw.h5.longfor.uat':
    env = 'uat-gw';
    break;
  case 'ibmsx-pre.longhu.net':
    env = 'pre';
    break;
  case 'ibms-x-front.h5.longhu.net':
    env = 'prod';
    break;
  case 'ibmsx.longhu.net':
    env = 'prod';
    break;
  case 'slf.qdingnet.com':
    env = 'qd-prod';
    break;
  default:
    env = 'dev';
}

export default envMap[env];
