<template>
  <el-pagination
    v-if="total > 0"
    :current-page="currentPage"
    :page-sizes="pageSizes"
    :pager-count="pagerCount"
    layout="total, sizes, prev, pager, next, jumper"
    :total="total"
    :hide-on-single-page="hideOnSinglePage"
    @size-change="changeSize"
    @current-change="changeCurrent"
  />
</template>
<script>
  export default {
    name: 'pagination',
    props: {
      // 只有一页时是否隐藏
      hideOnSinglePage: {
        type: Boolean,
        default: false,
      },
      pageNum: {
        type: Number,
        default: 1,
      },
      pageSizes: {
        type: Array,
        default: () => [10, 100, 200, 300, 400, 500],
      },
      total: {
        type: Number,
        default: 0,
      },
      pagerCount: {
        type: Number,
        default: 7,
      },
    },

    data() {
      return {
        currentPage: 1,
      };
    },

    watch: {
      pageNum: {
        immediate: true,
        handler(newVal) {
          this.currentPage = newVal;
        },
      },
    },

    methods: {
      changeSize(value) {
        this.$emit('size-change', value);
      },

      changeCurrent(value) {
        this.$emit('current-change', value);
      },
    },
  };
</script>
