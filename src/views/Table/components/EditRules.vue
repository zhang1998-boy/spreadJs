<template>
  <el-dialog
    :visible.sync="visible"
    :title="title"
    width="560px"
    :before-close="handleClose"
  >
    <el-form
      ref="editForm"
      :model="editParams"
      :rules="rules"
      label-width="120px"
      class="normal"
    >
      <form-item
        :model-keys.sync="editParams"
        :columns="1"
        :form-items="formItems"
      />
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">关闭</el-button>
        <el-button
          type="primary"
          @click="submitHandle"
        >
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script>

  export default {
    props: {
      visible: {
        type: Boolean,
        default: false,
      },
      isEdit: {
        type: Boolean,
        default: false,
      },
      params: {
        type: Object,
        default: () => ({}),
      },
    },
    data() {
      return {
        title: '添加规则',
        editParams: {},
        formItems: [
          {
            _type: 'input',
            _model: 'ruleName',
            label: '规则名称:',
            prop: 'ruleName',
            placeholder: '请输入规则名称',
            clearable: true,
          },
          {
            _type: 'input',
            _model: 'describe',
            label: '描述:',
            prop: 'describe',
            placeholder: '请输入描述',
            clearable: true,
          },
          {
            _type: 'input',
            _model: 'frequency',
            label: '调用次数:',
            prop: 'frequency',
            placeholder: '请输入服务调用次数',
            clearable: true,
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
            clearable: true,
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
          }
        ],
        rules: {
          ruleName: [
            {
              required: true,
              message: '请输入规则名称',
              trigger: 'blur',
            }
          ],
          frequency: [
            {
              required: true,
              message: '请输入调用次数',
              trigger: 'blur',
            }
          ],
          status: [
            {
              required: true,
              message: '请选择状态',
              trigger: 'blur',
            }
          ],
          useTime: [
            {
              required: true,
              message: '请选择调用时间',
              trigger: 'blur',
            }
          ],
        },
      };
    },
    watch: {
      visible: {
        immediate: true,
        handler(val) {
          if (val) {
            this.title = this.isEdit ? '配置规则' : '添加规则';

            if (Object.keys(this.params).length > 0) {
              this.editParams = { ...this.params };
            }
          }
        },
      },
    },
    methods: {
      submitHandle() {
        this.$refs.editForm.validate((valid) => {
          if (valid) {
            this.$message.success(`success submit:${JSON.stringify(this.editParams)}`);
          } else {
            this.$message.error('error submit');
          }
        });
      },
      handleClose() {
        this.$emit('update:visible', false);
        this.$refs.editForm.resetFields();
      },
    },
  };
</script>
