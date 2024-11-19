<template>
  <div>
    <!-- 菜单组件文档：https://idoc.longfor.com/word/wFToqnmPpq3CpzMWdNtvCQ6OG6Uh -->
    <lf-layout menuShow
               v-if="menuStatus"
               ref="frameyts"
               :styleBlue="true"
               title="可研管理"
               :menuList="menuList"
               :activeIndex="activeIndex"
               navShow
               :breadList="breadList"
               auth
               :userInfor="userInfor"
               :userMore="userMore"
               @logoHandle="logoHandle"
               @menuCallBack="menuCallBack"
               @handleOpen="(item)=>handleOpen(item)"
               @handleClose="handleClose"
               @icon-switch="iconSwitch"
               @breadCallBack="breadCallBack"
               @authCallBack="authCallBack"
               @helpCallBack="helpCallBack"
               @itReportCallBack="itReportCallBack"
               @moreActiveCallBack="moreActiveCallBack"
               @userMoreCallBack="userMoreCallBack">
      <template v-slot:headerRight>
        <div class="top-menu">
          <span class="top-label"> 项目名称:</span>
          <el-input v-model="projectName||$route.query.projectName"
                    disabled
                    style="width: 200px;"
                    placeholder="请输入项目名称" />
          <span class="top-label"> 版本:</span>
          <el-select v-model="form.versionId"
                     placeholder="请选择"
                     style="width: 200px;"
                     @change="changeVersion"
                     filterable>
            <el-option v-for="item in versionList"
                       :key="item.id"
                       :label="`${item.versionName}${item.label=='APPROVAL'?'-职能审批版':''}`"
                       :value="item.id"></el-option>
          </el-select>
          <!-- <el-button type="primary"
                     style="margin-left: 12px;"
                     @click="editVersion">版本管理</el-button> -->
          <el-button type="primary"
                     @click="reset">版本对比</el-button>
          <el-button type="primary"
                     v-if="exportStatus"
                     @click="exportData">导出</el-button>

        </div>

      </template>
      <!-- <template v-slot:headerRight>

    </template> -->
      <transition name="fade-transform"
                  mode="out-in">
        <router-view :key="routerKey" />
      </transition>
    </lf-layout>
    <versionDialog ref='versionDialogVue'
                   @refresh="getVersionList"></versionDialog>
    <editVersionDialog ref='editVersionDialogVue'
                       :versionList='versionList'
                       @refresh="getVersionList"></editVersionDialog>
    <exportVersionDialog ref='exportVersionDialogVue'
                         :versionList='versionList'
                         @refresh="getVersionList"></exportVersionDialog>
  </div>
</template>
<script>
import logoTitle from "@/assets/images/logo.png";
import permission from "@/assets/images/permission.png";
import help from "@/assets/images/help.png";
import { getMenu, getVersions } from "@/api/index";
import Cookies from 'js-cookie'

import versionDialog from './versionDialog.vue';
import editVersionDialog from './editVersion.vue';
import exportVersionDialog from './exportVersion.vue';
export default {
  name: "layout-index",
  components: {
    versionDialog,
    editVersionDialog,
    exportVersionDialog
  },
  data () {
    return {
      exportStatus: false,
      addVersionDialog: false,
      versionList: [],
      menuStatus: false,
      form: {
        planName: '测试项目1.0',
        versionId: '',
      },
      logoTitle,


      userInfor: {
        avatar:
          "https://prod-longxin-oss.oss-cn-beijing.aliyuncs.com/original-nas-pro/headImg/small/zhaoshengdi.jpg",
        userName: "zsd",
      },
      userMore: [
        {
          id: 1,
          title: "修改密码",
        },
      ],
    };
  },
  computed: {
    activeIndex () {
      return 'A1';
    },
    breadList () {
      return this.$route.matched
        .filter(({ meta }) => !meta?.hideBreadcrumb)
        .map((item) => {
          return {
            title: item.meta.title,
          };
        });
    },
    routerKey () {
      return this.$store.state.app.currentDate;
    },
    projectId () {
      return this.$store.state.app.projectInfo.projectId || this.$route.query.pId
    },
    projectName () {
      return this.$store.state.app.projectInfo.projectName || this.$route.query.projectName
    }
  },
  created () {
    this.getMenuList()
    this.getVersionList()
  },
  methods: {
    exportData () {
      this.$refs.exportVersionDialogVue.open()
    },
    // 获取版本列表
    async getVersionList () {
      let res = await getVersions({ projectId: this.projectId, projectStage: "KY" })
      this.versionList = res.data || []
      if (this.versionList.length > 0) {
        this.form.versionId = this.versionList[0].id
        this.$store.commit('app/updateVersionData', { versionId: this.versionList[0].id })
        this.exportStatus = this.versionList[0].label == 'APPROVAL'
      } else {
        this.$refs.versionDialogVue.open()
      }

    },
    editVersion () {
      this.$refs.editVersionDialogVue.open()
    },
    changeVersion (val) {
      this.exportStatus = this.versionList.filter(item => item.id == val)[0]?.label == 'APPROVAL'
      this.$store.commit('app/updateVersionData', { versionId: this.form.versionId })
    },
    // 获取菜单数据
    async getMenuList () {
      let res = await getMenu({ stageCode: "KY" })
      res.data.forEach((item) => {
        if (item.sheetName == '输入') {
          item.name = item.sheetName
          item.icon = require(`@/assets/images/help.png`)
          item.children ? this.dealPath(item.children) : null
          item.id = item.sheetCode
        } else {
          item.name = item.sheetName
          item.icon = require(`@/assets/images/itsm.png`)
          item.children ? this.dealPath(item.children) : null
          item.id = item.sheetCode
        }
      })
      if (this.$route.query.type == 'KY') {
        this.$store.commit('app/updateSheetCode', { sheetCode: "A1" })
      }
      this.menuList = res.data
      this.menuStatus = true
    },
    dealPath (arr) {
      arr.forEach((item) => {
        item.name = item.sheetName
        item.icon = item.sheetCode
        item.id = item.sheetCode
        item.children ? this.dealPath(item.children) : null
      })
      return arr
    },
    logoHandle (type) {
      console.log("点击了logo或产品名称", type);
    },
    menuCallBack (row) {
      console.log(row.sheetCode, '111');
      this.$store.commit('app/updateSheetCode', { sheetCode: row.sheetCode })
      this.$router.push({
        path: '/entry/table',
        query: this.$route.query,
      });
    },
    handleOpen (key) {
      console.log("--open", key);
    },
    handleClose (key, keyPath) {
      console.log("--handleClose", key, keyPath);
    },
    iconSwitch (status) {
      console.log("--iconSwitch", status);
    },
    breadCallBack (item) {
      console.log("--breadCallBack", item);
    },
    authCallBack () {
      console.log("--authCallBack");
    },
    helpCallBack () {
      console.log("--helpCallBack");
    },
    itReportCallBack () {
      console.log("--itReportCallBack");
    },

    moreActiveCallBack (item) {
      console.log("--moreActiveCallBack", item);
    },
    userMoreCallBack (item) {
      console.log("--userMoreCallBack", item);
    },
  },
};
</script>
<style lang="scss" scoped>
::v-deep .layout-menu {
  background: $--color-primary;

  .menu-logo {
    height: 44px;
    padding: 12px 16px;

    .logo-icon {
      width: auto;
      margin-right: 8px;
    }

    .logo-name {
      line-height: 26px;
    }
  }

  .first-title {
    .first-name.list-name {
      .txt-ellipsis {
        font-size: 14px;
      }
    }
  }

  .first-title.first-active {
    .first-name.list-name {
      .txt-ellipsis {
        font-weight: 600;
        font-size: 14px;
      }
    }
  }

  .second-main {
    background: #264E86;

    .second-title {
      margin-left: -25.5px;

      &.title-active,
      &:hover {
        background: rgba(255, 255, 255, 0.08);
      }

      .second-name {
        left: 44.5px;
      }

      .second-flag {
        left: 24px;
      }
    }
  }

  &.menu-simple {
    .second-title {
      margin-left: 0;

      .second-name {
        left: 24.5px;
      }
    }
  }
}

::v-deep .lf-layout-main {
  height: 100%;
  background-color: #F8F8F8;

  .lf-layout-content {
    height: 100%;

    .layout-container {
      height: 100%;

      .layout-main-content {
        height: 100%;
        padding-bottom: 12px;
        overflow: auto;
      }
    }
  }
}

::v-deep .layout-header .header-right .right-slot {
  width: 60vw;
  margin-right: 20%;
}

.el-form .el-form-item {
  margin-bottom: 0 !important;
  border-radius: 1px;
}

.top-menu {
  display: flex;
}

.top-label {
  margin-top: 6px;
  margin-right: 6px;
  margin-left: 6px;
  font-size: 12px;
}

::v-deep .option-title {
  white-space: nowrap !important;
}
</style>

