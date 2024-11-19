const LfSlot = {
  functional: true,
  props: {
    row: {
      type: Object,
      default: null,
    },
    render: {
      type: Function,
      default: null,
    },
    index: {
      type: Number,
      default: -1,
    },
    column: {
      type: Object,
      default: null,
    },
    store: {
      type: Object,
      default: null,
    },
    _self: {
      type: Object,
      default: null,
    },
  },
  /*
   * 为了弥补缺少的实例
   * 提供第二个参数作为上下文
   */
  render(createElement, context) {
    return context.props.render(context.props);
  },
};
export default LfSlot;
