# 前端资源汇总

地址：https://wiki.longhu.net/pages/viewpage.action?pageId=81959987
<br></br>

# 仓库地址

```
SSH地址: ssh://git@git.longhu.net:8010/iot-internal/iot-fe/vue3-ts-template.git

HTTP地址: http://git.longhu.net/iot-internal/iot-fe/vue3-ts-template.git
```

<br></br>

# 项目目录结构

```
.
├── dist
├── public              # 公共静态文件
├── src                 # 源码
│   ├── apis            # 接口请求
│   ├── assets          # webpack打包的资源
│   ├── components      # 公共组件
│   ├── constant        # 常量
│   ├── directives      # 全局指令
│   ├── hooks
│   ├── icons           # svg icon
│   ├── layout          # 全局Layout
│   ├── mocks           # 全局mock数据
│   ├── router          # 路由
│   ├── store           # 全局store管理
│   ├── utils           # 全局公共方法
│   ├── views           # 所有业务页面
│   ├── App.vue
│   ├── main.ts
│   └── shims-vue.d.ts
├── tests
├── .browserslistrc
├── .env.development
├── .env.pre
├── .env.prod
├── .env.sit
├── .env.uat
├── .eslintrc.js
├── .gitignore
├── .eslintrc.js
├── app.config.js        # 前端配置文件
├── babel.config.js
├── cypress.json         # e2e 单测配置
├── jest.config.js       # 单测配置
├── package-lock.json
├── package.json
├── tsconfig.json
└── vue.config.js        # vue webpack配置文件
```

<br><br>

# 启动流程

## 1. Project setup

### Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Run your unit tests

```
npm run test:unit
```

### Run your end-to-end tests

```
npm run test:e2e
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).