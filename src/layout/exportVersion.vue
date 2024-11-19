
<!--
 * @Author: 张鹏 215683509@qq.com
 * @Date: 2024-07-31 10:59:13
 * @LastEditors: 张鹏 215683509@qq.com
 * @LastEditTime: 2024-11-19 11:01:48
 * @FilePath: /dc-tender-front/src/layout/demandManage/technicalStandardList/uploadDrawDialog.vue
 * @Description: 导出版本
-->
<template>
  <!-- 新增弹窗 -->
  <div v-show="editDialog">
    <el-dialog title="导出"
               :visible.sync="editDialog"
               :show-close="false"
               :close-on-click-modal="false"
               width="40vw">
      <div class="table-name">
        <i v-if="versionRow.locked"
           class="el-icon-lock"></i>
        {{versionRow.versionName}}
        <el-tag style="margin-left: 6px;"
                v-if="versionRow.label=='APPROVAL'">职能审批版</el-tag>
      </div>
      <el-table :data="tableVersionList"
                @selection-change="handleSelectionChange">
        <el-table-column type="selection"
                         width="55">
        </el-table-column>
        <el-table-column property="date"
                         label="表名称">
          <template #default="{ row }">
            <i v-if="row.locked"
               class="el-icon-lock"></i> {{row.sheetName}}<el-tag style="margin-left: 6px;"
                    v-if="row.label=='APPROVAL'">职能审批版</el-tag>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer">
        <el-button type="info"
                   @click="editDialog=false">关闭</el-button>
        <el-button type="primary"
                   @click="editVersion">导出</el-button>
      </span>
    </el-dialog>

  </div>
</template>
<script>
import { exportVersion, getCanDownloadSheet } from '@/api'
export default {
  props: {
    reviewType: { type: Number, default: 0 }, // 0新增、1编辑、2查看
    versionList: { type: Array, default: () => [] }
  },
  data () {
    return {
      dataInfo: {},
      addDialog: false,
      editDialog: false,
      versionName: '',
      addVersionId: '',
      multipleSelection: [],
      tableVersionList: []
    };
  },
  computed: {
    // 版本id
    versionId () {
      return this.$store.state.app.versionId
    },
    versionRow () {
      return this.versionList.filter(item => item.id == this.versionId)[0]
    },
    projectId () {
      return this.$store.state.app.projectInfo.projectId || this.$route.query.pId
    }
  },

  methods: {
    handleSelectionChange (val) {
      this.multipleSelection = val;
    },
    editVersion () {
      if (this.multipleSelection == 0) {
        this.$message.warning('请选择要导出的版本')
        return
      }
      let nameList = this.multipleSelection.map(item => item.versionName)
      this.$confirm(`确认导出${nameList.splice(',')}？`, '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        cancelButtonClass: 'cancel-btn',
        type: 'warning'
      }).then(async () => {
        let prams = {
          versionId: this.versionId,
          sheetCode: this.multipleSelection.map(item => item.id)
        }
        let res = await exportVersion(prams)
        debugger
        if (res.code != 0) {
          this.$message.error(res.msg)
        } else {
          this.$emit('refresh')
          this.editDialog = false;
        }
      })
    },

    async open () {

      let res = await getCanDownloadSheet({ stageCode: this.$route.query.type || 'KY' })
      this.tableVersionList = res.data
      this.editDialog = true;
    },
    back () {
      this.editDialog = false;
    },

  }
};
</script>
<style lang="scss" scoped>
.pagination-test {
  padding: 0 0 24px !important;
}

::v-deep .el-dialog__footer {
  border: none !important;
}

.search-input {
  width: 100%;
}

::v-deep.el-dialog__header {
  text-align: left !important;
}

.file-list {
  margin-left: 12px !important;
  color: #2F61A7 !important;
  cursor: pointer;
}

::v-deep .vxe-cell {
  height: auto !important;
  max-height: 2000px !important;
}

::v-deep .el-dialog__body {
  text-align: center;
}

.table-name {
  font-weight: bold;
  text-align: left;
}
</style>
