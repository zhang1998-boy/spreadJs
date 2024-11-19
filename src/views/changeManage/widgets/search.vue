<template>
  <div class="project-search">
    <el-form v-model="form"
             @submit.native.prevent
             label-width="70px">
      <el-row type="flex"
              justify="space-between">
        <template>
          <el-form-item label="公司:">
            <el-select v-model="form.regionCompanyId"
                       placeholder="请选择"
                       filterable>
              <el-option v-for="item in companyList"
                         :key="item.regionCompanyId"
                         :label="item.regionCompanyName"
                         :value="item.regionCompanyId"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="项目名称:">
            <el-input v-model="form.projectName"
                      placeholder="请输入项目名称"
                      @keyup.enter.native="search" />
          </el-form-item>
          <el-form-item label="业务类型:">
            <el-select v-model="form.company"
                       placeholder="请选择"
                       filterable>
              <el-option v-for="item in companyList"
                         :key="item.id"
                         :label="item.companyName"
                         :value="item.companyCode"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="审批状态:">
            <el-select v-model="form.approvalStatus"
                       placeholder="请选择"
                       filterable>

              <el-option v-for="item in approvalStatusList"
                         :key="item.id"
                         :label="item.label"
                         :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </template>
      </el-row>
      <el-row type="flex"
              justify="end">
        <el-form-item class="el-form-item-btn">
          <el-button type="primary"
                     @click="search">查询</el-button>
          <el-button type="primary"
                     @click="reset">重置</el-button>
        </el-form-item>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getRegionCompanyByName } from '@/api/index'
export default {
  name: 'ProjectSearch',
  props: {
    form: {
      type: Object
    }
  },
  // 职能未审批、职能审批中、职能审批通过、职能审批未通过、未上会审批、上会审批中、上会审批通过、上会审批未通过
  // UNAPPROVED (0, "未审批"),
  // FUNCTION_APPROVING (1, "职能审批中"),
  // FUNCTION_APPROVED (2, "职能审批通过"),
  // FUNCTION_NOT_APPROVED (3, "职能审批未通过"),
  // NOT_MEETING_APPROVED (4, "未上会审批"),
  // MEETING_APPROVING (5, "上会审批中"),
  // MEETING_APPROVED (6, "上会审批通过"),
  // MEETING_NOT_APPROVED (7, "上会审批未通过");
  data () {
    return {
      approvalStatusList: [
        { label: '未审批', value: 0 },
        { label: '职能审批中', value: 1 },
        { label: '职能审批通过', value: 2 },
        { label: '职能审批未通过', value: 3 },
        { label: '未上会审批', value: 4 },
        { label: '上会审批中', value: 5 },
        { label: '上会审批通过', value: 6 },
        { label: '上会审批未通过', value: 7 },],
      companyList: [],
      platFormActionMap: {
        plm: []
      },
      routeQueryData: {}
    }
  },
  computed: {
    // 航道  状态   城市
    ...mapState('meta', ['channels', 'planStatus']),
    isTeam () {
      return this.routeQueryData?.platFormType === 'TEAM'
    }
  },
  mounted () {
    this.routeQueryData = this.$route.query
    this.getIntelnalCompany()
  },
  methods: {
    // 获取公司
    async getIntelnalCompany () {
      let res = await getRegionCompanyByName()
      this.companyList = res.data || []
    },
    search () {
      this.$emit('handleSearch', this.form)
    },
    reset () {
      this.$emit('handleReset', this.form)
    }
  }
}
</script>

<style lang="scss" scoped>
$inputWidth18vw: 18vw;

.project-search ::v-deep {
  padding: 18px 18px 0;
  background: #FFF;

  .el-form-item--small.el-form-item {
    margin-bottom: 12px;

    .el-form-item__label {
      color: #323232;
    }
  }

  .el-select {
    width: $inputWidth18vw;
  }

  .el-input {
    width: $inputWidth18vw;

    .el-input__inner {
      color: #323232;
    }
  }

  .el-input--small .el-input__inner,
  .el-range-editor--small.el-input__inner {
    height: 30px;
  }

  .el-date-editor {
    width: $inputWidth18vw;

    .el-range-input {
      width: 38%;
      color: #323232;
      text-align: center;
    }

    .el-range__icon {
      font-size: 16px;
      line-height: 22px;
    }

    .el-range-separator {
      margin: 0 6px;
      padding: 0;
      line-height: 20px;
    }

    .el-range__close-icon {
      position: absolute;
      top: 1px;
      right: 5px;
      width: 18px;
    }
  }

  .el-form-item-btn {
    .el-form-item__content {
      width: $inputWidth18vw;
      text-align: right;
    }
  }
}

@media screen and (max-width: 1090px) {
  .project-search ::v-deep {
    .el-select {
      width: 195px;
    }

    .el-input {
      width: 195px;
    }

    .el-date-editor {
      width: 195px;

      .el-range-separator {
        width: 10px;
        margin: 0 3px 0 2px;
        padding: 0;
        line-height: 20px;
      }

      .el-range-input {
        width: 38%;
      }

      .el-range__icon,
      .el-range__close-icon {
        line-height: 20px;
      }
    }

    .el-form-item-btn {
      .el-form-item__content {
        width: 195px;
      }
    }
  }
}

@media (min-width: 1091px) and (max-width: 1150px) {
  .project-search ::v-deep {
    .el-date-editor {
      .el-range-separator {
        width: 10px;
        margin: 0 3px 0 2px;
        padding: 0;
        line-height: 20px;
      }

      .el-range__close-icon {
        right: 0;
      }
    }
  }
}

@media (min-width: 1150px) and (max-width: 1230px) {
  .project-search ::v-deep {
    .el-date-editor {
      .el-range__close-icon {
        right: 3px;
      }
    }
  }
}
</style>
