
import { httpRequest } from "@/utils/http"

// 项目 封样看板 导出
export function getQueryList (params) {
  return httpRequest({
    url: `/projectInfo/queryList`,
    method: 'POST',
  }, params)
}
export function getRegionCompanyByName (params) {
  return httpRequest({
    url: `/projectInfo/queryRegionCompanyByName`,
    method: 'GET',
  }, params)
}

//获取菜单
export function getMenu (params) {
  return httpRequest({
    url: `/menu/getSheetDir`,
    method: 'GET',
  }, params)
}
// 获取版本列表
export function getVersions (params) {
  return httpRequest({
    url: `/version/versions`,
    method: 'GET',
  }, params)
}
// 根据菜单获取表单
export function getSheetNameByCode (params) {
  return httpRequest({
    url: `/menu/getSheetNameByCode`,
    method: 'GET',
  }, params)
}
// 创建版本
export function addVersion (params) {
  return httpRequest({
    url: `/version/create`,
    method: 'POST',
  }, params)
}

// 设为审批版
export function setVersion (versionId) {
  return httpRequest({
    url: `version/approve/${versionId}`,
    method: 'POST',
  })
}

// 删除版本
export function deleteVersion (versionId) {
  return httpRequest({
    url: `version/delete/${versionId}`,
    method: 'POST',
  })
}
// 获取版本名称
export function getVersionName (versionId) {
  return httpRequest({
    url: `/version/name/${versionId}`,
    method: 'POST',
  })
}
// 复制版本
export function copyVersion (versionId) {
  return httpRequest({
    url: `/version/copy/${versionId}`,
    method: 'POST',
  })
}
// 导出版本
export function exportVersion (params) {
  return httpRequest({
    url: `/version/download`,
    method: 'POST',
  }, params)
}
// 可导出版本列表
export function getCanDownloadSheet (params) {
  return httpRequest({
    url: `/menu/getCanDownloadSheet`,
    method: 'GET',
  }, params)
}
// 当前sheet是否可编辑
export function getCanEditSheet (params) {
  return httpRequest({
    url: `/sheet/canEdit`,
    method: 'POST',
  }, params)
}
// 可编辑sheet接口
export function getEditSheet (params) {
  return httpRequest({
    url: `/sheet/edit`,
    method: 'POST',
  }, params)
}

// 获取不可编辑sheet接口
export function querySheetJson (params) {
  return httpRequest({
    url: `/sheet/querySheetJson`,
    method: 'POST',
  }, params)
}
// 保存编辑sheet接口
export function calculateAndSaveSheet (params) {
  return httpRequest({
    url: `/sheet/calculateAndSaveSheet`,
    method: 'POST',
  }, params)
}