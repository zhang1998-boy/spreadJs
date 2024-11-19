<template>
  <div class="grid-box">
    <div v-for="item in projectList"
         :key="item.id"
         class="gird-item"
         :style="'cursor: pointer'"
         @click="
        handleViewPlan(item.prId, item.projectName)
      ">
      <el-image :src="item.imageUrl">
        <div slot="placeholder"
             class="image-slot">
          <div class="loading">
            <i class="el-icon-loading" />
            <span class="dot">加载中...</span>
          </div>
        </div>
        <div slot="error"
             class="image-slot">
          <img src="../../../assets/img/project-default-img.png"
               alt="" />
        </div>
      </el-image>
      <p class="item-type"> {{!item.wnd ?"未获取":'已拿地'}}</p>
      <div class="item-info">
        <h3 :title="item.planName">
          <el-tag v-if="item.ifdj === '是'"
                  size="mini">代建</el-tag>
          {{ item.planName }}
        </h3>
        <p>
          <!-- <span>航道：{{ item.channel || '-' }}</span> -->
          <span>城市：{{ item.city || '-' }}</span>
          <!-- <span>获地时间：{{ item.landTime ? utils.date(item.landTime, 'YYYY-MM-DD') : '-' }}</span> -->
        </p>
        <p>{{ item.projectName ? item.projectName : '-' }}</p>
      </div>
      <div class="btn-box">
        <el-button type="primary"
                   style="width: 100px;"
                   v-if="item.viewData"
                   @click=" handleViewPlan(item.prId, item.projectName)">查看可研</el-button>
        <el-button type="primary"
                   style="width: 100px;"
                   v-else
                   @click=" handleViewPlan(item.prId, item.projectName)">开始可研</el-button>
      </div>

    </div>
  </div>
</template>

<script>
import { createPlan, getProjectFolderId } from '@/api/index'
import { mapMutations } from 'vuex';
export default {
  name: 'Grid',
  props: {
    projectList: {
      type: Array,
      default: () => []
    },
    projectImgList: {
      type: Object,
      default: () => { }
    }
  },
  data () {
    return {
      TYPE: 'projectlist',
      statusMap: {
        0: '待创建',
        1: '进行中',
        2: '进行中',
        3: '已完成',
        4: '待发布'
      },
      statusClassMap: {
        0: 'notCreated',
        1: 'progressing',
        2: 'progressing',
        3: 'completed',
        4: 'notRelease'
      },
      routeQueryData: {}
    }
  },
  computed: {
    isTeam () {
      return this.routeQueryData?.platFormType === 'TEAM'
    }
  },
  created () {
    console.log('grid created')
    this.routeQueryData = this.$route.query
  },
  methods: {

    //  维护计划
    handleClickMaintainPlan (pId) {
      const path = `/coe/projectPlan/${pId}`
      this.handleJump(path, () => {
        this.$router.push({ name: 'ProjPlan', params: { id: pId } })
      })
    },
    // 跳转文档视图
    async viewFileView (pId) {
      const params = {
        projectId: pId
      }
      const res = await getProjectFolderId(params)
      if (res.data) {
        this.zhuge.track('设计管理-我的项目-文档视图')
        const path = `/coe/fileView?folderId=${res.data}`
        this.handleJump(path, () => {
          this.$router.push({
            name: 'FileView',
            query: {
              folderId: res.data
            }
          })
        })
      } else {
        this.$message.warning('项目文件夹获取失败')
      }
    },
    // 查看
    handleViewPlan (pId, projectName) {
      this.$store.commit('app/updateZtProjectData', { projectId: pId, projectName: projectName })
      if (process.env.NODE_ENV == 'development') {
        this.$router.push({
          path: '/entry/table',
          query: {
            pId,
            projectName,
            type: "KY"
          }
        })
      } else {
        window.open(`https://zt-invest-calculate-web.h5-uat.longfor.com/zt-invest-calculate-web/#/entry/table?pId=${pId}&&projectName=${projectName}&&type=KY`, "_blank");
      }
    },
    handleJump (path, cb) {
      if (this.isTeam) {
        const routeUrl = this.$router.resolve({
          path: path
        })
        window.open(routeUrl.href, '_blank')
      } else {
        cb()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.btn-box {
  text-align: right;
}

.item-type {
  position: absolute;
  top: 12px;
  right: -20px;
  width: 79px;
  width: 100px;
  overflow: hidden;
  color: #FFF;
  font-size: 12px;
  white-space: nowrap;
  text-align: center;
  background-color: #2F61A7;
  box-shadow: 0 0 10px #2F61A7;
  transform: rotate(45deg);
}

@mixin textoverflow {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.grid-box {
  display: flex;
  flex-wrap: wrap;
  padding: 0 18px;

  .gird-item {
    position: relative;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    overflow: hidden;
    border: 1px solid #EAEAEA;
    border-radius: 2px;
    transition: all 0.2s;

    &:hover {
      box-shadow: 0 0 10px #DCDCDC;
      // transform: scale(1.01);
    }

    ::v-deep .el-image {
      width: 100%;

      .image-slot {
        height: 100%;

        .loading {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100%;
          color: #FFF;
          background: url('../../../assets/img/project-default-img.png');

          .el-icon-loading {
            margin-bottom: 8px;
            font-size: 20px;
          }

          span.dot {
            font-size: 12px;
            line-height: 18px;
          }
        }

        img {
          width: 100%;
          height: 100%;
        }
      }
    }

    .item-info {
      padding: 12px;

      h3 {
        @include textoverflow;

        margin: 0 0 3px;
        color: #323232;
        font-weight: 600;
        font-size: 14px;
        line-height: 22px;
      }

      p {
        color: #999;
        font-size: 12px;
        line-height: 18px;

        span {
          position: relative;
          padding: 0 6px;

          &:after {
            position: absolute;
            top: 3px;
            left: 0;
            width: 1px;
            height: 12px;
            background: #EAEAEA;
            content: '';
          }

          &:first-child {
            padding-left: 0;

            &:after {
              width: 0;
            }
          }
        }
      }
    }

    .action {
      padding: 0 12px 0 0;

      .el-button {
        position: relative;
        margin: 0;
        padding: 0;
        padding: 0 12px;
        line-height: 18px;
        border: none;

        &:after {
          position: absolute;
          top: 3px;
          left: 0;
          width: 1px;
          height: 12px;
          background: #EAEAEA;
          content: '';
        }

        &:first-child:after {
          width: 0;
        }
      }
    }

    .item-status {
      position: absolute;
      right: 0;
      z-index: 1;
      width: 90px;
      height: 35px;
      color: #FFF;

      &:before {
        position: absolute;
        top: -4px;
        right: -32px;
        display: block;
        width: 100px;
        height: 42px;
        border-style: none solid solid;
        border-width: 0 15px 22px;
        transform: rotate(45deg);
        content: '';
      }
      // clip-path: polygon(0% 0, 50% 0, 100% 50%, 100% 100%);
      em {
        position: absolute;
        top: 14px;
        right: 6px;
        display: inline-block;
        font-size: 12px;
        font-style: normal;
        line-height: 18px;
        transform: rotate(45deg);
      }

      &.notCreated {
        &:before {
          border-color: transparent transparent #FD9C43;
        }
      }

      &.progressing {
        &:before {
          border-color: transparent transparent #5587F0;
        }
      }

      &.completed {
        &:before {
          border-color: transparent transparent #5AC2A7;
        }
      }

      &.notRelease {
        &:before {
          border-color: transparent transparent #999;
        }
      }
    }
  }
}
</style>
<style lang="scss" scoped>
.grid-box {
  // justify-content: center;
  .gird-item {
    flex-grow: 0;
    flex-shrink: 0;
    min-width: 168px;
    // width: 234px;
    // height: 251px;
    height: 236px;
    margin: 0 0 12px 12px;

    .el-image {
      height: 137px;
    }
  }
}

@media screen and (max-width: 1300px) {
  .grid-box {
    .gird-item {
      flex-basis: calc(25% - 12px); // 兼容ie
      &:nth-child(4n + 1) {
        margin-left: 0;
      }
    }
  }
}

@media (min-width: 1301px) and (max-width: 1440px) {
  .grid-box {
    .gird-item {
      //flex: 0 0 calc(20% - 9.7px);
      flex-basis: calc(20% - 12px); // 兼容ie
      // height: 240px;
      height: 220px;

      &:nth-child(5n + 1) {
        margin-left: 0;
      }

      .el-image {
        height: 126px;
      }
    }
  }
}

@media (min-width: 1441px) and (max-width: 1700px) {
  .grid-box {
    .gird-item {
      flex-basis: calc(16.666% - 12px); // 兼容ie
      //flex: 0 0 calc(16.666% - 10.1px);
      flex-grow: 0;
      flex-shrink: 0;
      // height: 240px;
      height: 220px;
      margin: 0 0 12px 12px;

      &:nth-child(6n + 1) {
        margin-left: 0;
      }

      .el-image {
        height: 126px;
      }
    }
  }
}

@media (min-width: 1701px) and (max-width: 1920px) {
  .grid-box {
    .gird-item {
      flex-basis: calc(12.5% - 13px); // 兼容ie
      //flex: 0 0 calc(12.5% - 11.6px);
      flex-grow: 0;
      flex-shrink: 0;
      // height: 240px;
      height: 220px;
      margin: 0 0 12px 12px;

      &:nth-child(8n + 1) {
        margin-left: 0;
      }

      .el-image {
        height: 126px;
      }
    }
  }
}

@media (min-width: 1921px) {
  .grid-box {
    // justify-content: center;
    .gird-item {
      width: 224px;
      // height: 240px;
      height: 220px;
      margin: 0 0 12px 12px;

      .el-image {
        height: 126px;
      }
    }
  }
}
</style>
