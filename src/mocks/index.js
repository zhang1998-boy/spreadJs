// 首先引入Mock
const Mock = require('mockjs');

// 设置拦截ajax请求的相应时间
Mock.setup({
  timeout: '200-600',
});

let configArray = [];

// 使用webpack的require.context()遍历所有mock文件
const files = require.context('./modules', true, /\.(js|ts)$/);
files.keys().forEach((key) => {
  if (key === './index.ts') { return; }
  configArray = configArray.concat(files(key).default);
});

// 注册所有的mock服务
configArray.forEach((item) => {
  for (const [path, target] of Object.entries(item)) {
    const protocol = path.split('|');
    Mock.mock(new RegExp(`^${protocol[1]}`), protocol[0], target);
  }
});
