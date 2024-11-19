<template>
  <el-table
    :ref="propRef"
    v-bind="$attrs"
    :max-height="maxHeight"
    border
    v-on="$listeners"
  >
    <el-table-column
      v-if="index"
      type="index"
      :fixed="indexFixed"
    />
    <el-table-column
      v-if="selection"
      type="selection"
      :fixed="selectionFixed"
    />
    <template
      v-for="(column, key) in columns"
    >
      <el-table-column
        v-if="column.slotName"
        :key="key"
        v-bind="column"
      >
        <template #default="scope">
          <slot
            :name="column.slotName"
            :scope="scope"
          ></slot>
        </template>
      </el-table-column>
      <table-column
        v-else
        :key="key"
        :column="column"
      />
    </template>
  </el-table>
</template>
<script>
  import TableColumn from './TableColumn';

  export default {
    name: 'lf-table',
    components: {
      TableColumn,
    },
    props: {
      /**
       * @description: 表格列内容
       * @param {*} 默认 []， 必传参数
       */
      columns: {
        type: Array,
        default: () => [],
      },
      /**
       * @description: 是否展示第一列的排序
       * @param {*} 默认false，可选： true | false
       */
      index: {
        type: Boolean,
        default: false,
      },
      /**
       * @description: 序号对齐方式
       * @param {*} 默认left，可选： left | right
       */
      indexFixed: {
        type: String,
        default: 'left',
      },
      /**
       * @description: 是否可多选
       * @param {*} 默认false，可选： true | false
       */
      selection: {
        type: Boolean,
        default: false,
      },
      /**
       * @description: 多选框对齐方式
       * @param {*} 默认left，可选： left | right
       */
      selectionFixed: {
        type: String,
        default: 'left',
      },
      /**
       * @description: ref值
       * @param {*} 默认lfTable
       */
      propRef: {
        type: String,
        default: 'lfTable',
      },
    },
    data() {
      return {
        maxHeight: document.body.clientHeight - 80,
      };
    },
  };
</script>
