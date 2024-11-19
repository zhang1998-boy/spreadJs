
/** !
 *
 * @params
 *    get:  this.$http.get(url, {query|params: query|params}).then(res => {})
 *    post: this.$http.post(url, params).then(res => {})
 *    config object hideErrorToast: true // 不再默认提示返回的错误信息 hideLoading: true // 未返回数据时不再默认loading
 */
"use strict"

import axios from "axios"
import { Message, Loading } from "element-ui"
// import { parseQueryURL, convertParams } from "@/common/extension/vue-utils"
const instance = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  withCredentials: true
})
let fullscreenLoading = null
let cancelSource
let globalConfig
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)
// 当前有效的Ajax请求数
let active = 0
function showLoading (scene, isAjax = true) {
  setTimeout(() => {
    if (isAjax && active === 0) {
      return
    }
    fullscreenLoading = Loading.service({
      fullscreen: true
    })
  }, 80)
}
function hideLoading (isAjax = true) {
  isAjax && active--
  setTimeout(() => {
    if (active === 0) {
      fullscreenLoading.close()
    }
  }, 100)
}
// instance.defaults.timeout = 60000 * 10
// instance.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded;charset=utf-8"
// instance.defaults.headers.delete["Content-Type"] = "application/x-www-form-urlencoded;charset=utf-8"
// instance.defaults.headers.get['content-type'] = 'application/json;charset=UTF-8'
// instance.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest"
// instance.defaults.headers.common['Pragma'] = 'no-cache'
// instance.defaults.headers.common['Cache-Control'] = 'no-cache,private' // 头部添加不使用缓存，避免IE存在在当前页面没刷新的情况下再次请求接口直接拿缓存
instance.interceptors.request.use(
  config => {
    config.headers['x-gaia-api-key'] = process.env.VUE_APP_BASE_API_KEY
    config.headers['cookie'] = 'CASTGC=AAECAzY3Mzc0QURGNjczNzgzMUZ5dWZlbmdjZXNoaTOlZY5itpGBe5lJe-ObXNuKNz8XDA_-EEcloudPivot'
    // 将get方式参数语义化 key值为query
    if (config.method.toUpperCase() === "GET" && !config.params && config.query) {
      config.params = config.query
    }
    // 支持rest方式的url地址
    if (config.rest) {
      config.url = config.url.replace(/::([^/]+)/g, function (a, b) {
        const param = config.rest[b]
        delete config.rest[b]
        return param
      })
    }
    if (config.token) { // token 放到 header
      config.headers.common['Token'] = config.token
    }
    if (!config.hideLoading) {
      // Loading
      showLoading("[Ajax]" + config.url)
    }
    if (cancelSource) {
      config.cancelToken = cancelSource.token
    }
    active++
    globalConfig = config
    return config
  },
  err => {
    hideLoading()
    Message.error({
      message: "发送网络请求失败"
    })
    return Promise.reject(err)
  }
)
// 跳转登录页面
const jumpToLogin = (url) => {
  // console.log(url)
  // const loginUrl = parseQueryURL(url)
  // const serviceUrl = parseQueryURL(decodeURIComponent(loginUrl.params.service))
  // loginUrl.params.service = encodeURIComponent(`${serviceUrl.url}?syscode=plm&originalTargetUri=${encodeURIComponent(location.href)}`)
  // const newLoginUrl = convertParams(loginUrl.params, loginUrl.url)
  // console.log(newLoginUrl)
  window.location.replace(url)
}

instance.interceptors.response.use(
  res => {
    hideLoading()
    const json = res.data
    return new Promise((resolve, reject) => {
      if (globalConfig.responseOrigin) {
        resolve(json)
      } else {
        if (+json.code === 200) {
          resolve({
            config: res.config,
            headers: res.headers,
            code: json.code,
            request: res.request,
            originData: res.data,
            message: res.data.message,
            extraMessage: res.data.extraMessage,
            data: json.data
          })
        } else if (+json.code === 401) {
          const url = json.loginUrl
          // 需要登录
          if (url) {
            jumpToLogin(url)
          } else {
            Message.error({
              message: "登录失效"
            })
            window.setTimeout(() => {
              window.location.reload(true)
            }, 1000)
          }
        } else {
          if (!res.config.hideErrorToast) {
            if (isMobile) {
              // Toast.$create({
              //   type: 'error',
              //   time: 3000,
              //   txt: json.message || json.msg || "操作出错了"
              // }).show()
            } else {
              Message.error({
                message: json.message || json.msg || "操作出错了"
              })
            }
          }
          const error = new Error(json.message || json.msg)
          error.config = res.config
          error.request = res.request
          error.response = res
          reject(error)
        }
      }
    })
  },
  err => {
    hideLoading()
    if (!axios.isCancel(err)) {
      const res = err.response
      if (res && +res.data.code === 401) {
        // window.sessionStorage.removeItem('searchForm')
        const data = typeof res.data === "string" ? JSON.parse(res.data) : res.data
        const url = data.loginUrl || (data.data ? data.data.loginUrl : data.result.loginUrl)
        // 需要登录
        if (url) {
          jumpToLogin(url)
        } else {
          Message.error({
            message: "登录失效"
          })
          window.setTimeout(() => {
            window.location.reload(true)
          }, 1000)
        }
      } else {
        Message.error({
          message: err.message || "获取数据失败，请稍后重试！"
        })
      }
    }
    return Promise.reject(err)
  }
)

function install (Vue, router) {
  if (install.installed) {
    return
  }
  install.installed = true

  if (router) {
    router.beforeEach(function (to, from, next) {
      if (from.path !== to.path) {
        // query 路由变化不进行axios请求取消操作
        if (cancelSource) {
          cancelSource.cancel("页面离开，取消请求")
        }
        cancelSource = axios.CancelToken.source()
      }
      if (from.name !== to.name || !(typeof to.meta.loading === 'boolean' && !to.meta.loading)) {
        // Loading
        showLoading("router before", false)
      }
      next()
    })
    router.afterEach(route => {
      hideLoading(false)
    })
  }

  Object.defineProperties(Vue.prototype, {
    $http: {
      get () {
        return instance
      }
    }
  })
}

export const httpRequest = async (opts = {}, params = {}) => {
  const pethodtemp = opts.method.toLocaleUpperCase()
  const httpDefaultOpts = {
    // http默认配置
    method: pethodtemp || "GET",
    url: opts.url,
    params: params,
    data: params,
    token: opts.token,
    hideLoading: opts.hideLoading || false,
    withCredentials: true,
    responseOrigin:
      typeof opts.responseOrigin === "boolean" ? opts.responseOrigin : true // 是否返回服务器源数据
    // headers: pethodtemp === 'POST' || 'PUT' ? {'Content-Type': 'application/json; charset=UTF-8'} : {}
  }
  if (pethodtemp === "POST" || pethodtemp === "PUT" || pethodtemp === "DELETE") {
    delete httpDefaultOpts.params
  } else {
    delete httpDefaultOpts.data
  }
  return await instance(httpDefaultOpts)
}

export const http = instance

export default install
