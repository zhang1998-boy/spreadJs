

<!--
 * @Author: 张鹏 215683509@qq.com
 * @Date: 2024-07-31 10:59:13
 * @LastEditors: 张鹏 215683509@qq.com
 * @LastEditTime: 2024-11-18 15:27:32
 * @FilePath: /dc-tender-front/src/layout/demandManage/technicalStandardList/uploadDrawDialog.vue
 * @Description: 版本弹窗
-->
<template>
  <!-- 新增弹窗 -->
  <div v-show="addDialog">
    <el-dialog title="新建版本"
               :visible.sync="addDialog"
               :show-close="false"
               :close-on-click-modal="false"
               width="20vw">
      还未新建测算版本,直接新建?
      <span slot="footer">
        <el-button type="info"
                   @click="back">取消</el-button>
        <el-button type="primary"
                   @click="submit">新建</el-button>
      </span>
    </el-dialog>

  </div>
</template>
<script>
import { addVersion } from '@/api'
export default {
  props: {
    stagesObj: { type: Object, default: () => ({}) },
    reviewType: { type: Number, default: 0 } // 0新增、1编辑、2查看
  },
  data () {
    return {
      addDialog: false
    };
  },
  computed: {
    projectId () {
      return this.$store.state.app.projectInfo.projectId || this.$route.query.pId
    }
  },

  methods: {
    async open () {
      this.addDialog = true;
    },
    back () {
      this.addDialog = false;
      this.$router.push('/outSystem/list')
    },
    // 确定提交
    async submit () {
      // 
      let res = await addVersion({ projectCode: this.projectId })
      this.$emit('refresh')
      this.addDialog = false;
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
</style>
