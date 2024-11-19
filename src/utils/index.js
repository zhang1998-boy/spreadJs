function queryParams (variable) {
  const urlSeatch = window.location.href.split('?')
  if (urlSeatch.length > 1) {
    var query = urlSeatch[1]
    var vars = query.split('&')
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split('=')
      if (pair[0] == variable) { return pair[1] }
    }
    return (false)
  } else {
    return (false)
  }
}

const getCookie = function (name) {
  var arr; var reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
  if (document.cookie.match(reg)) {
    arr = document.cookie.match(reg)
    return (arr[2])
  } else {
    return null
  }
}

const clearCookie = function (name) {
  const keys = document.cookie.match(/[^ =;]+(?==)/g);
  if (keys) {
    for (let i in keys) {
      document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString() + "; path=/";
    }
  }
}

const getMenuCode = function (arr, routeName) {
  arr.some(item => {
    if (item.menuName == '模板管理' && this.$route.name == 'templateManagement') {
      sessionStorage.setItem('compCode', item.menuCode)
    } else if (item.menuName == '内部版本管理' && this.$route.name == 'insideVersion') {
      sessionStorage.setItem('compCode', item.menuCode)
    } else if (item.menuName == '内部SheetName管理' && this.$route.name == 'insideSheetName') {
      sessionStorage.setItem('compCode', item.menuCode)
    } else if (item.menuName == '内部接受龙头主表维护' && this.$route.name == 'LT-mainTableMaintenance') {
      sessionStorage.setItem('compCode', item.menuCode)
    } else if (item.menuName == '内部小i提示' && this.$route.name == 'i-hint') {
      sessionStorage.setItem('compCode', item.menuCode)
    } else if (item.menuName == '内部tab页面维护' && this.$route.name == 'page_maintenance') {
      sessionStorage.setItem('compCode', item.menuCode)
    } else if (item.menuName == '内部大区对应关系管理' && this.$route.name == 'regional_correspondence') {
      sessionStorage.setItem('compCode', item.menuCode)
    } else if (item.menuName == '内部项目信息维护' && this.$route.name == 'project_information') {
      sessionStorage.setItem('compCode', item.menuCode)
    } else if (item.menuName == '内部项目成员维护' && this.$route.name == 'project_members') {
      sessionStorage.setItem('compCode', item.menuCode)
    } else if (item.menuName == '公式修改' && this.$route.name == 'modify_formula') {
      sessionStorage.setItem('compCode', item.menuCode)
    } else if (item.menuName == '项目状态' && this.$route.name == 'project_status') {
      sessionStorage.setItem('compCode', item.menuCode)
    } else if (item.menuName == '项目锁定状态' && this.$route.name == 'project_locking_status') {
      sessionStorage.setItem('compCode', item.menuCode)
    } else if (item.menuName == '修改公式历史记录' && this.$route.name == 'modify_formula_history') {
      sessionStorage.setItem('compCode', item.menuCode)
    } else if (item.menuName == '内部版本管理（初筛）' && this.$route.name == 'preliminary_insideVersion') {
      sessionStorage.setItem('compCode', item.menuCode)
    } else if (item.menuName == '审批通过项目' && this.$route.name == 'approved_projects') {
      sessionStorage.setItem('compCode', item.menuCode)
    } else if (item.menuName == '映射用户管理' && this.$route.name == 'mapping_userManagement') {
      sessionStorage.setItem('compCode', item.menuCode)
    } else if (item.menuName == '定时任务维护' && this.$route.name == 'timing_task_maintain') {
      sessionStorage.setItem('compCode', item.menuCode)
    } else if (item.menuName == "二维土地品类分档" && this.$route.name == 'land_classification') {
      sessionStorage.setItem('compCode', item.menuCode)
    } else if (item.menuName == "地区滚动费效水平" && this.$route.name == 'region_rolling_costEffectiveness_level') {
      sessionStorage.setItem('compCode', item.menuCode)
    } else if (item.menuName == "缓存监控" && this.$route.name === 'cacheMonitoring') {
      sessionStorage.setItem('compCode', item.menuCode)
    }
  })
}

// 根据单元格列数（数字）获取英文字母  0-A 1-B
const getColLetter = function (col) {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  if (col <= 25) {
    return letters[col]
  } else {
    const a = Math.floor((col - 26) / 26)
    const b = (col - 26) % 26
    return letters[a] + letters[b]
  }
}

export { queryParams, getCookie, clearCookie, getMenuCode, getColLetter }
