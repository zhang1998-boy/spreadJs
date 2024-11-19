<template>
  <div class="empty"
       :class="{'empty-all': imgType === '2'}">
    <template v-if="imgType === '0'">
      <img v-if="isIE"
           src="../../assets/img/emptyTip.png"
           alt=""
           style="width: 90px;height: 90px;">
      <svg-icon v-if="!isIE"
                icon-class="empty" />
    </template>
    <template v-if="imgType === '1'">
      <img v-if="isIE"
           src="../../assets/img/approval_tip.png"
           alt=""
           style="width: 90px;height: 90px;">
      <svg-icon v-if="!isIE"
                icon-class="approval_tip" />
    </template>
    <template v-if="imgType === '2'">
      <div class="background-all">
      </div>
    </template>
    <p class="empty-txt"
       v-if="imgType !== '2'">{{ emptyTxt }}</p>
    <slot name="bottom"></slot>
  </div>
</template>

<script>
export default {
  name: 'Empty',
  props: {
    emptyTxt: {
      default: null
    },
    imgType: {
      type: [String, Number],
      default: '0'
    }
  },
  computed: {
    isIE () { // ie?
      return (!!window.ActiveXObject || "ActiveXObject" in window)
    }
  }
}
</script>

<style lang="scss" scoped>
.empty {
  position: absolute;
  top: 50%;
  left: 50%;
  font-size: 7.2em;
  text-align: center;
  transform: translate(-50%, -50%);

  &.empty-all {
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transform: translate(0, 0);

    .background-all {
      width: 100%;
      height: 100%;
      background-image: url('~@/assets/images/emptyBg.png');
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
      opacity: 0.5; /* 透明度 */
    }
  }

  .empty-txt {
    margin-top: 14px;
    color: #999;
    font-size: 14px;
    line-height: 1;
  }
}
</style>
