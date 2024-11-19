<!--
 * @Author: 张鹏 215683509@qq.com
 * @Date: 2024-09-27 14:24:11
 * @LastEditors: 张鹏 215683509@qq.com
 * @LastEditTime: 2024-11-14 16:41:45
 * @FilePath: /plm-project-front/src/components/empty/authEmpty.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="fun-empty-data">
    <div class="empty-content">
      <img class="empty-icon"
           src="@/assets/images/auth/icon_no_auth.png"
           alt />
      <span class="empty-title">{{ label }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AuthEmpty',
  components: {},
  props: {
    // 设置label显示
    label: {
      type: String,
      default: '您没有权限访问当前的页面',
    },
  },
  data () {
    return {}
  },
  created () { },
  mounted () { },
  methods: {},
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.fun-empty-data {
  position: relative;
  width: 100%;
  height: 100vh;
  background: linear-gradient(180deg, #DCECFC 0%, #D6E8FC 100%);

  .empty-content {
    position: absolute;
    top: 50%;
    left: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    transform: translate(-50%, -50%);

    img {
      width: 120px;
      height: 120px;
    }

    .empty-icon {
      display: block;
      width: 240px;
      height: 240px;
      margin: 0 auto;
    }

    .empty-title {
      display: flex;
      justify-content: center;
      width: 80%;
      margin-top: 24px;
      color: rgba($color: #000, $alpha: 0.3);
      font-weight: 400;
      font-size: 14px;
      font-family: Noto Sans SC;
      line-height: 20.27px;
      text-align: center;
    }
  }
}
</style>
