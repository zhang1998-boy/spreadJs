<template>
  <section class="page-container">
    <section class="search-form">
      <el-form
        ref="searchFormRef"
        label-width="100px"
        :model="searchParams"
      >
        <form-item
          :model-keys.sync="searchParams"
          :form-items="formList"
        />
      </el-form>
    </section>

    <section class="options-wrap">
      <el-button
        :disabled="!selectedRows.length"
        @click="showSelectedHandle"
      >
        查看已选
      </el-button>
      <el-button
        type="primary"
        @click="doEditHandle()"
      >
        添加
      </el-button>
    </section>

    <lf-table
      v-loading="loading"
      :data="tableData"
      :columns="columns"
      :selection="true"
      @selection-change="selectionChange"
    />

    <lf-pagination
      :total="total"
      :page-num="searchParams.pageNum"
      @size-change="sizeChange"
      @current-change="currentChange"
    />

    <edit-rules
      :visible.sync="showEditDialog"
      :is-edit="isEdit"
      :params="editParams"
    />

    <show-selected
      :visible.sync="showSelectedDialog"
      :selected-data="selectedRows"
    />
  </section>
</template>

<script>
  import { getTableListData } from '@/api/mocks/tableList';
  import EditRules from '../components/EditRules';
  import ShowSelected from '../components/ShowSelected';

  export default {
    name: 'home',
    components: {
      EditRules,
      ShowSelected,
    },
    data() {
      return {
        loading: false,
        searchParams: {
          pageNum: 1,
          pageSize: 10,
          ruleName: '',
          describe: '',
          status: '',
          frequency: '',
          useTime: '',
        },
        // 表单内容
        formList: [
          {
            _type: 'input',
            _model: 'ruleName',
            label: '规则名称:',
            prop: 'ruleName',
            placeholder: '请输入规则名称',
          },
          {
            _type: 'input',
            _model: 'describe',
            label: '描述:',
            prop: 'describe',
            placeholder: '请输入描述',
          },
          {
            _type: 'input',
            _model: 'frequency',
            label: '调用次数:',
            prop: 'frequency',
            placeholder: '请输入服务调用次数',
          },
          {
            _type: 'select',
            _model: 'status',
            _options: [
              {
                label: '开启',
                value: 1,
              },
              {
                label: '关闭',
                value: 2,
              }
            ],
            label: '状态:',
            prop: 'status',
            placeholder: '请选择状态',
          },
          {
            _type: 'datePicker',
            _model: 'useTime',
            label: '调用时间:',
            prop: 'useTime',
            placeholder: '请选择调用时间',
            'value-format': 'timestamp',
          },
          {
            fixed: true,
            render: () => (
              <div>
                <el-button type="primary" onClick={
                  () => {
                    this.doSearchHandle(true);
                  }
                }>查询</el-button>

                <el-button onClick={
                  () => {
                    this.searchParams = this.$options.data().searchParams;
                  }
                }>重置</el-button>
              </div>
            ),
          }
        ],
        tableData: [],
        total: 0,
        columns: [
          {
            prop: 'ruleName',
            label: '规则名称',
          },
          {
            prop: 'describe',
            label: '描述',
          },
          {
            prop: 'frequency',
            label: '服务调用次数',
          },
          {
            prop: 'status',
            label: '状态',
            formatter: (row) => (row?.status === 1 ? '开启' : '关闭'),
          },
          {
            prop: 'useTime',
            label: '上次调用时间',
            formatter: (row) => this.$dateUtils.parseTime(row?.useTime || ''),
          },
          {
            prop: 'options',
            label: '操作',
            width: 120,
            render: (params) => (
              <div>
                <el-button
                  size="mini"
                  type="text"
                  onClick = {
                    () => {
                      this.doEditHandle(params.row);
                    }
                  }>
                  配置
                </el-button>

                <el-button
                  size="mini"
                  type="text"
                  onClick = {
                    () => {
                      this.$message.success('订阅报警');
                    }
                  }>
                  订阅报警
                </el-button>
              </div>
            ),
          }
        ],

        showSelectedDialog: false,
        selectedRows: [], // 多选选中内容

        showEditDialog: false,
        isEdit: false,
        editParams: {},
      };
    },
    mounted() {
      this.doSearchHandle(true);
    },
    methods: {
      doSearchHandle(firstPage) {
        if (firstPage) { this.searchParams.pageNum = 1; }
        this.loading = true;
        getTableListData({ ...this.searchParams }).then(({ data }) => {
          this.loading = false;
          this.tableData = data?.result || [];
          this.total = data?.total || 0;
        }).finally(() => {
          this.loading = false;
        });
      },
      currentChange(val) {
        this.searchParams.pageNum = val;
        this.doSearchHandle(false);
      },
      sizeChange(val) {
        this.searchParams.pageSize = val;
        this.doSearchHandle(true);
      },
      doEditHandle(params) {
        this.showEditDialog = true;
        this.isEdit = !!(params && Object.keys(params).length);
        this.editParams = params || {};
      },
      showSelectedHandle() {
        this.showSelectedDialog = true;
      },
      selectionChange(selection) {
        this.selectedRows = selection;
      },
    },
  };
</script>
<style lang="scss" scoped>
.options-wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
}
</style>
