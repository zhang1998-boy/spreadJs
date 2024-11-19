<template>
  <div class="page-form-title">
    <div class="title-cont">
      <div class="border-icon"></div>
      <div class="text">
        <span class="textContent"
              v-if="showTip">{{ text }}</span>
        <el-tooltip v-else
                    :content="text"
                    placement="right">
          <span class="textContent">{{ text }}</span>
        </el-tooltip>
        <el-tooltip v-if="warText"
                    :content="warText"
                    placement="right">
          <i class="el-icon-warning-outline"
             style=" vertical-align: super;cursor: pointer;"></i>
        </el-tooltip>
      </div>
    </div>
    <div class="btn-cont">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageFormTitle',
  props: {
    text: { type: String, default: '' }, // 标题
    warText: { type: String, default: '' }, // 小i提示文案
  },
  data () {
    return {
      showTip: true
    }
  },
  mounted () {
    const content = document.querySelector('.textContent')
    const boxWidth = content.offsetWidth;
    // 获取内容的宽度
    const contentWidth = content.scrollWidth;
    if (contentWidth > boxWidth) {
      this.showTip = false
    } else {
      this.showTip = true
    }
  }
}
</script>

<style lang="scss" scoped>
.page-form-title {
  position: relative;

  .title-cont {
    position: relative;
    padding-left: 12px;

    .border-icon {
      position: absolute;
      top: 5.5px;
      left: 0;
      height: 14px;
      border-left: 3px solid $--color-primary;
      border-radius: 2px;
    }

    .text {
      font-weight: 600;
      font-size: 14px;
      line-height: 24px;

      span {
        display: inline-block;
        max-width: 400px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        cursor: pointer;
      }
    }
  }

  .btn-cont {
    position: absolute;
    top: 0;
    right: 0;

    ::v-deep .el-button {
      height: 24px;
      line-height: 24px;
    }
  }
}
</style>
