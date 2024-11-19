<!--
 * @Author: 张鹏 215683509@qq.com
 * @Date: 2024-11-14 15:46:10
 * @LastEditors: 张鹏 215683509@qq.com
 * @LastEditTime: 2024-11-14 16:41:50
 * @FilePath: /zt-invest-calculate-web/src/components/BreadCrumbNav.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="bread-crumb-nav">
    <!-- <el-breadcrumb separator="/" v-if="showBreadCrumb">
      <el-breadcrumb-item class="head-tag">当前位置：设计管理</el-breadcrumb-item>
      <template v-if="$route.meta.breadcrumb && $route.meta.breadcrumb.length">
        <el-breadcrumb-item
          v-for="(item, index) in $route.meta.breadcrumb"
          :to="item.name ? item : ''"
          :key="index">
          {{ item.title }}
        </el-breadcrumb-item>
      </template>
      <el-breadcrumb-item>{{ $route.meta.title }}</el-breadcrumb-item>
    </el-breadcrumb> -->
    <!-- <div class="flex-stand"></div> -->
    <div class="plan-page-entrance"
         v-if="$slots.btn">
      <slot name="btn"></slot>
    </div>
    <div v-if="$store.state.innerUser && $route.meta.showUsers"
         class="plan-page-entrance">
      <div class="avatar-btn"
           title="人员列表"
           @click="goAddress"
           v-if="hasPrivilege('viewPartner', TYPE) || hasPrivilege('editPartner', TYPE)">
        <template v-if="roleList.length">
          <template v-for="(role, index) in roleList">
            <el-avatar :key="index"
                       v-if="index < 6"
                       :size="30"
                       :style="{left: 10 * (Math.min(6, roleList.length) - index - 1) + 'px', zIndex: 6 - index}"
                       :src="`https://img.longfor.com/headImg/small/${role.userName}.jpg`"
                       style="background: transparent; border: 2px solid #FFF;">
              <svg-icon icon-class="avatar-default"
                        style="width: 100%;height: 100%;"></svg-icon>
            </el-avatar>
            <span v-if="index == 6"
                  :key="index"
                  class="avatar-etc">···</span>
          </template>
        </template>
        <template v-else>
          <template v-for="num in 6">
            <el-avatar :key="num + 15"
                       :size="30"
                       :style="{left: 10 * (Math.min(5, 6) - num + 1) + 'px', zIndex: 6 - num}"
                       style="background: transparent; border: 2px solid #FFF;">
              <svg-icon icon-class="avatar-default"
                        style="width: 100%;height: 100%;"></svg-icon>
            </el-avatar>
          </template>
        </template>
      </div>
      <el-button v-if="$store.state.innerUser"
                 type="text"
                 @click="jumpFileViewFn"
                 style="margin-left: 24px;">文档视图</el-button>
    </div>
  </div>
</template>
<script>
import { getProjectFolderId } from '@/api/index'
export default {
  name: 'BreadCrumbNav',
  props: {
    id: {
      type: [Number, String],
      default: ''
    },
    showBreadCrumb: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      TYPE: 'projectlist',
      roleList: []
    }
  },
  created () {
    if (this.$route.meta.showUsers && (
      this.hasPrivilege('viewPartner', this.TYPE) ||
      this.hasPrivilege('editPartner', this.TYPE)
    )) {
      this.getPartnerList()
    }
  },
  methods: {
    async jumpFileViewFn () {
      const params = {
        projectId: this.id
      }
      const res = await getProjectFolderId(params)
      if (res.data) {
        this.zhuge.track('设计管理-节点维护-文档视图')
        this.$router.push({
          name: 'FileView',
          params: {
            id: this.id
          },
          query: {
            folderId: res.data,
            ...this.$route.query
          }
        })
      } else {
        this.$message.warning('没有获取到项目文件夹id')
      }
    },
    async getPartnerList () {
      const params = {
        projectId: this.id,
        systemSource: 'PLM'
      }
      const { data: { roleUserList = [] } } = await this.$http.post(this.$api.getUserList, params, { hideLoading: true })
      roleUserList.map(role => {
        this.roleList = [...this.roleList, ...role.userList]
      })
    },
    goAddress () {
      this.$router.push({
        name: 'Partner',
        params: {
          id: this.id
        },
        query: this.$route.query
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.bread-crumb-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-height: 20px;
  margin-bottom: 12px;

  .el-button--text {
    padding: 0;
  }

  .el-breadcrumb {
    font-size: 12px;

    .head-tag ::v-deep .el-breadcrumb__inner {
      color: #999;
    }
  }

  .plan-page-entrance {
    display: flex;
    align-items: center;

    .avatar-btn {
      display: flex;
      align-items: center;
      cursor: pointer;

      .el-avatar {
        position: relative;
      }

      span.avatar-etc {
        margin-left: 12px;
        color: #478AEE;
        font-weight: bolder;
        font-size: 14px;
      }
    }
  }
}
</style>

