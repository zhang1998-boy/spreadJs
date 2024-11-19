const CreateItem = {
  functional: true,
  props: {
    render: {
      type: Function,
      default: null,
    },
  },
  render(createElement, context) {
    return context.props.render(context.props);
  },
};
export default CreateItem;
