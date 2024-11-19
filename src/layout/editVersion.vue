<!--
 * @Author: 张鹏 215683509@qq.com
 * @Date: 2024-07-31 10:59:13
 * @LastEditors: 张鹏 215683509@qq.com
 * @LastEditTime: 2024-11-19 14:21:19
 * @FilePath: /dc-tender-front/src/layout/demandManage/technicalStandardList/uploadDrawDialog.vue
 * @Description: 版本管理
 label 字段
DRAFT(1, "草稿"),
APPROVAL(2, "审批版"),
MEETING(3, "上会版");
是否锁定 是 locked true-锁定 false-未锁定
-->
<template>
  <!-- 新增弹窗 -->
  <div v-show="editDialog">
    <el-dialog title="版本管理"
               :visible.sync="editDialog"
               :show-close="false"
               :close-on-click-modal="false"
               width="40vw">
      <el-button type="primary"
                 class="right-btn"
                 @click="addVersion">添加版本</el-button>
      <el-table :data="versionList">
        <el-table-column property="date"
                         width="300"
                         label="版本号">
          <template #default="{ row }">
            <p> <i v-if="row.locked"
                 class="el-icon-lock"></i> {{row.versionName}}<el-tag style="margin-left: 6px;"
                      v-if="row.label=='APPROVAL'">职能审批版</el-tag> </p>
          </template>
        </el-table-column>
        <el-table-column property="updatedAt"
                         label="保存时间"></el-table-column>
        <el-table-column property="address"
                         label="操作">
          <template #default="{ row }">
            <template v-if="row.label=='DRAFT'">
              <el-button type="text"
                         @click="editVersion(row)">设为审批版</el-button>
              <el-button type="text"
                         @click="deleteVersion(row)">删除</el-button>
            </template>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer">
        <el-button type="info"
                   @click="back">关闭</el-button>
      </span>
    </el-dialog>
    <!-- 新增版本 -->
    <el-dialog title="添加新版本"
               :visible.sync="addDialog"
               :show-close="false"
               :close-on-click-modal="false"
               width="500px">
      <el-form :model="dataInfo"
               ref="ruleForm"
               label-width="95px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="新增版本号">
              <el-input class="search-input"
                        style="width: 300px;"
                        disabled
                        v-model.trim="versionName"></el-input>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="复制版本数据">
              <el-select v-model="addVersionId"
                         placeholder="请选择"
                         style="width: 300px;"
                         filterable>
                <el-option v-for="item in versionList"
                           :key="item.id"
                           :label="item.versionName"
                           :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer">
        <el-button type="info"
                   @click="addDialog=false">关闭</el-button>
        <el-button type="primary"
                   @click="commitData">确定</el-button>
      </span>
    </el-dialog>

  </div>
</template>
<script>
import { deleteVersion, setVersion, getVersions, getVersionName, copyVersion } from '@/api'
export default {
  props: {
    versionList: { type: Array, default: () => ([]) },
    reviewType: { type: Number, default: 0 } // 0新增、1编辑、2查看
  },
  data () {
    return {
      dataInfo: {},
      addDialog: false,
      editDialog: false,
      versionName: '',
      addVersionId: '',
    };
  },
  computed: {
    // 版本id
    versionId () {
      return this.$store.state.app.versionId
    },
    projectId () {
      return this.$store.state.app.projectInfo.projectId || this.$route.query.pId
    }
  },

  methods: {
    editVersion (row) {
      this.$confirm('确认将此版本设为审批版？', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        cancelButtonClass: 'cancel-btn',
        type: 'warning'
      }).then(async () => {
        let res = await setVersion(row.id)
        this.$message.success('设置成功', 1000)
        this.$emit('refresh')
        this.editDialog = false;

      })
    },
    deleteVersion (row) {
      this.$confirm(`确认删除${row.versionName}版本？`, '提示', {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        cancelButtonClass: 'cancel-btn',
        type: 'warning'
      }).then(async () => {
        let res = await deleteVersion(row.id)
        this.editDialog = false
        this.$message.success('删除成功', 1000)
        this.$emit('refresh')
      })
    },
    async open () {
      this.editDialog = true;
    },
    back () {
      this.editDialog = false;
    },
    // 添加版本
    async addVersion () {
      this.addDialog = true
      let res = await getVersionName(this.versionId)
      this.versionName = res.data
    },
    // 新增版本-提交
    async commitData () {
      let res = await copyVersion(this.addVersionId)
      this.versionName = res.data
      this.addDialog = false
      this.editDialog = false
      this.$message.success('新增成功', 500)
      this.$emit('refresh')
    }
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
</style>
