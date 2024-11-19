<template>
  <el-dialog
    :visible.sync="visible"
    title="查看已选"
    width="600px"
    :before-close="handleClose"
  >
    <div>
      {{ selectedData }}
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button
          type="primary"
          @click="handleClose()"
        >
          关闭
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
      selectedData: {
        type: Array,
        default: () => [],
      },
    },
    methods: {
      handleClose() {
        this.$emit('update:visible', false);
      },
    },
  };
</script>
