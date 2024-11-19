<template>
  <div
    v-if="isLinkUrl"
    class="svg-icon svg-external-icon"
    :style="styleExternalIcon"
    v-bind="$attrs"
    v-on="$listeners"
  ></div>
  <svg
    v-else
    :class="svgClass"
    aria-hidden="true"
    v-bind="$attrs"
  >
    <use :xlink:href="iconName" />
  </svg>
</template>

<script>
  import { isExternal } from '@/utils/validate';

  export default {
    name: 'svg-icon',
    inheritAttrs: false, // 组件上的$attrs不自动添加到组件根元素上 默认添加到组件根元素上
    props: {
      /**
       * @description: 图标链接
       */
      iconClass: {
        type: String,
        require: true,
        default: '',
      },
      /**
       * @description: 自定义类名
       */
      className: {
        type: String,
        default: '',
      },
    },

    computed: {
      isLinkUrl() {
        return isExternal(this.iconClass || '');
      },
      iconName() {
        return `#icon-${this.iconClass}`;
      },
      svgClass() {
        return this.className ? `svg-icon ${this.className}` : 'svg-icon';
      },
      styleExternalIcon() {
        return {
          mask: `url(${this.iconClass}) no-repeat 50% 50%`,
          '-webkit-mask': `url(${this.iconClass}) no-repeat 50% 50%`,
        };
      },
    },
  };
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  overflow: hidden;
  vertical-align: -0.15em;
  fill: currentColor;
}

.svg-external-icon {
  display: inline-block;
  background-color: currentColor;
  mask-size: cover !important;
}
</style>
