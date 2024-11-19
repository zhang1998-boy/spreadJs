<template>
  <el-table-column
    v-if="column.children"
    v-bind="getAttrs(column)"
  >
    <template v-for="(child, key) in column.children">
      <table-column
        :key="key"
        :column="child"
      />
    </template>
  </el-table-column>
  <el-table-column
    v-else-if="column.render && typeof(column.render) === 'function'"
    v-bind="column"
  >
    <template slot-scope="scope">
      <lf-slot
        :render="column.render"
        :row="scope.row"
        :index="scope.$index"
        :column="scope.column"
        :store="scope.store"
        :_self="scope._self"
      />
    </template>
  </el-table-column>
  <el-table-column
    v-else
    v-bind="column"
  />
</template>
<script>
  import LfSlot from './LfSlot';

  export default {
    name: 'table-column',
    components: {
      LfSlot,
    },
    props: {
      column: {
        type: Object,
        required: true,
      },
    },
    methods: {
      /**
       * @description: 格式化参数， 不能将 [object Object] 作为DOM标签的属性
       */
      getAttrs: (params) => {
        const newParams = { ...params };
        delete newParams.children;
        return newParams;
      },
    },
  };
</script>
