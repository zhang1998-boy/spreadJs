<template>
  <div class="fun-empty-data">
    <svg-icon icon-class="no-data" class="no-data" :style="{ width: `${width}px`, height: `${height}px` }"></svg-icon>
    <p class="no-data-content" :style="{ fontSize: `${fontSize}px` }">{{ tips }}</p>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    width: {
      type: Number,
      default: 120,
    },
    height: {
      type: Number,
      default: 120,
    },
    tips: {
      type: String,
      default: '暂无数据',
    },
    fontSize: {
      type: Number,
      default: 14,
    },
  },
  data() {
    return {}
  },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.fun-empty-data {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  color: #0000004D;
  font-weight: 400;
  font-size: 14px;
  font-family: Noto Sans SC;
  line-height: 20.27px;
  text-align: left;

  .no-data-content {
    margin-bottom: 40px;
  }
}
</style>
