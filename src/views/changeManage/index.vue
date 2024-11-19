<template>
  <div class="change-manage-main">
    <bread-crumb-nav />
    <search :form="searchForm"
            @handleReset="handleReset"
            @handleSearch="handleSearch" />
    <div class="project-content">
      <div :class="isRoll && 'shadow'"
           class="switch">
        <div class="project-content-title">
          项目列表
        </div>
      </div>
      <el-scrollbar ref="scrollbar"
                    wrap-class="scrollbar-wrapper el-scrollbar__hidden-x">
        <template v-if="projectList.length">
          <grid :project-list="projectList"
                :project-img-list="projectImgList" />
        </template>
        <empty img-type="2"
               v-else
               emptyTxt="没有找到项目哦" />
      </el-scrollbar>
      <el-pagination background
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :page-sizes="[15, 20, 30, 40]"
                     :page-size="page.size"
                     :current-page="page.page"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="page.total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import search from './widgets/search'
import grid from './widgets/grid'
import BreadCrumbNav from '@/components/BreadCrumbNav'
import Empty from '@/components/empty/index'
import { getQueryList } from '@/api/index'
import Cookies from 'js-cookie'
const formObj = {
  projectName: '',
  regionCompanyId: '',
  approvalStatus: '',

}
export default {
  name: 'ProjectList',
  components: {
    Empty,
    BreadCrumbNav,
    search,
    grid,
  },
  data () {
    return {
      TYPE: 'projectlist',
      searchForm: JSON.parse(JSON.stringify(formObj)),
      listCached: false,
      switchList: [
        {
          type: 1,
          text: '缩略图',
          icon: 'grid-icon'
        },
        {
          type: 2,
          text: '列表',
          icon: 'list-icon'
        }
      ],
      projectList: [],
      projectImgList: {},
      routeQueryData: {},
      page: {
        page: 1,
        size: 20,
        total: 0
      },
      isRoll: false // scrollbar 是否滚动
    }
  },
  computed: {
    // 团队职能空间
    isTeam () {
      return this.routeQueryData?.platFormType === 'TEAM'
    },
    // 记忆筛选条件
    isMemory () {
      return Number(this.routeQueryData?.isMemory) === 1
    }
  },

  created () {
    Cookies.set('CASTGC', 'AAECAzY3M0MyRjRCNjczQzY3OEJ5dWZlbmdjZXNoaTOHLLrm31iNl0ySgdKmpRMlb7h3cg_-EEcloudPivot')
  },

  async mounted () {
    this.getIssueInstanceData()
  },

  methods: {
    receiveMessage (event) {
      // if (event.origin !== "") return
      this[event.data.action] && this[event.data.action](event.data.params)
    },

    // 重置
    handleReset () {
      const type = this.searchForm.type
      this.searchForm = JSON.parse(JSON.stringify(formObj))
      this.$set(this.searchForm, 'type', type)
      this.$set(this.page, 'page', 1)
      this.getIssueInstanceData()
    },
    // 搜索
    handleSearch () {
      // this.isMemory && window.sessionStorage.setItem('searchForm', JSON.stringify(this.searchForm))
      this.$set(this.page, 'page', 1)
      this.getIssueInstanceData()
    },
    // 改变分页条数
    handleSizeChange (val) {
      this.$set(this.page, 'size', val)
      this.getIssueInstanceData()
    },
    // 当前页
    handleCurrentChange (val) {
      this.$set(this.page, 'page', val)
      this.getIssueInstanceData()
    },
    showLoadingAndSwitchMode (item) {
      if (this.listCached) {
        this.handleSwitchMode(item)
        return
      }
      const loadingInstance = this.$loading({ fullscreen: true })
      setTimeout(() => {
        loadingInstance.close()
      }, 800)
      setTimeout(() => {
        this.handleSwitchMode(item)
      }, 100)
      this.listCached = true
    },
    handleSwitchMode (item) {
      if (this.searchForm.type === item.type) {
        return
      }
      this.$set(this.searchForm, 'type', item.type)
      // this.searchForm.type === 1 && this.getProjectImage()
      window.sessionStorage.setItem('searchForm', JSON.stringify(this.searchForm))
    },
    // 项目以及事项列表
    async getIssueInstanceData () {
      const form = JSON.parse(JSON.stringify(this.searchForm))
      const params = {
        ...form,
        ...this.page,
      }
      delete (params.total)
      const res = await getQueryList(params)
      this.projectList = res.data?.records
      this.$set(this.page, 'total', res.data.total)
    },
    async getProjectImage () {
      const res = await getPlanImage()
      this.projectImgList = res.data
    }
  }
}
</script>
<style lang="scss">
.add-task .el-dialog__footer .dialog-footer .el-button--primary {
  background-color: $--color-primary !important;
  border-color: $--color-primary !important;
}
</style>
<style lang="scss" scoped>
@import './index.scss';
</style>
