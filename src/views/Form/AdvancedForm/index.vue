<template>
  <section class="page-container">
    <spreadExcel ref="spreadExcelVue"></spreadExcel>
    <section v-if="tableEdit">
      <PageFormTitle text="补充说明"></PageFormTitle>
      <el-input type="textarea"
                :rows="2"
                placeholder="请输入内容"
                v-model="textarea">
      </el-input>
      <el-upload action="no"
                 ref="uploadFile"
                 :limit="1"
                 :http-request="handleUpload"
                 :on-change="fileChange"
                 :on-success="handleAvatarSuccess"
                 :before-upload="beforeUpload"
                 :show-file-list="false">
        <el-button type="primary"
                   size="mini">
          上传附件
        </el-button>
      </el-upload>
    </section>
  </section>
</template>
<script>
import spreadExcel from '@/components/spreadExcelDemo';
import { getSheetNameByCode, getCanEditSheet } from '@/api/index'
export default {
  components: {
    spreadExcel
  },
  name: 'advanced-form',
  data () {
    return {
      sheetName: [],
      tableEdit: false
    };
  },
  computed: {
    // 获取表单名称
    sheetCode () {
      return this.$store.state.app.sheetCode
    },
    // 版本id
    versionId () {
      return this.$store.state.app.versionId
    }
  },
  watch: {
    sheetCode (val) {
      this.getSheetName(val)
    },
    versionId (val) {
      this.getSheetName(this.sheetCode)
    }
  },
  methods: {
    handleUpload () { },
    fileChange () { },
    handleAvatarSuccess () { },
    beforeUpload () { },

    // 获取表单名称
    async getSheetName (val) {
      let prams = {
        sheetCode: val
      }
      let res = await getSheetNameByCode(prams)
      this.sheetName = res.data
      this.readOnly()
    },
    async readOnly () {
      let props = {
        version: this.versionId,
        sheetName: this.sheetName[0]
      }
      let res = await getCanEditSheet(props)
      this.tableEdit = res.data
      this.$refs.spreadExcelVue.getData(this.versionId, this.sheetName.length > 0 ? this.sheetName[0] : '投资条件-投发', res.data)
    },


  },
};
</script>
<style lang="scss" scoped>
.page-container {
  box-sizing: border-box;
  padding-bottom: 50px;

  .options-wrap {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 6;
    box-sizing: border-box;
    width: 100%;
    padding-left: $--side-bar-width;
    line-height: 50px;
    text-align: center;
    background-color: $--color-white;
    box-shadow: 4px 0 4px 2px $--color-grey-base;
  }
}
</style>
