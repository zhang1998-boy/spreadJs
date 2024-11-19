<template>
  <section class="page-container">
    <spreadExcel ref="spreadExcel"></spreadExcel>
  </section>
</template>
<script>
import spreadExcel from '@/components/spreadExcel';
export default {
  name: 'basic-form',
  components: {
    spreadExcel
  },
  data () {
    return {
      basicForm: {
        title: '',
        dateVal: [],
        targetDes: '',
        standard: '',
        customer: '',
        inVisitCom: '',
        weights: 6,
      },
      formList: [
        {
          _type: 'input',
          _model: 'title',
          prop: 'title',
          label: '标题',
          placeholder: '请输入标题',
        },
        {
          _type: 'datePicker',
          _model: 'dateVal',
          type: 'daterange',
          label: '起止日期',
          prop: 'dateVal',
          'start-placeholder': '请选择开始日期',
          'end-placeholder': '请选择结束日期',
          'value-format': 'timestamp',
        },
        {
          _type: 'input',
          _model: 'targetDes',
          type: 'textarea',
          autosize: {
            minRows: 3,
            maxRows: 6,
          },
          label: '目标描述',
          prop: 'targetDes',
          placeholder: '请输入目标描述',
        },
        {
          _type: 'input',
          _model: 'standard',
          type: 'textarea',
          autosize: {
            minRows: 3,
            maxRows: 6,
          },
          label: '衡量标准',
          prop: 'standard',
          placeholder: '请输入衡量标准',
        },
        {
          _type: 'input',
          _model: 'customer',
          prop: 'customer',
          label: '客户',
          placeholder: '请输入客户',
        },
        {
          _type: 'input',
          _model: 'inVisitCom',
          prop: 'inVisitCom',
          label: '邀评人',
          placeholder: '请输入邀评人',
        },
        {
          _type: 'inputNumber',
          _model: 'weights',
          prop: 'weights',
          label: '权重',
          placeholder: '请输入权重',
        }
      ],
      formRules: {
        title: [
          {
            required: true,
            message: '请输入标题',
            trigger: 'blur',
          }
        ],
        dateVal: [
          {
            required: true,
            message: '请选择起止日期',
            trigger: 'blur',
          }
        ],
        targetDes: [
          {
            required: true,
            message: '请输入目标描述',
            trigger: 'blur',
          }
        ],
        standard: [
          {
            required: true,
            message: '请输入横联标准',
            trigger: 'blur',
          }
        ],
      },
    };
  },
  mounted () {
    console.log(111111);
    this.$nextTick(() => {
      // this.$refs.spreadExcel.openExcel()
    })
  },
  methods: {
    onSubmit () {
      this.$refs.basicFormRef.validate((valid) => {
        if (valid) {
          this.$message.success(`success submit:${JSON.stringify(this.basicForm)}`);
        } else {
          this.$message.error('error submit');
        }
      });
    },
    onReset () {
      this.$refs.basicFormRef.resetFields();
    },
  },
};
</script>
<style lang="scss" scoped>
.page-container {
  .content {
    width: 560px;
    margin: 0 auto;

    .center {
      margin-top: 20px;
      text-align: center;
    }
  }
}
</style>
