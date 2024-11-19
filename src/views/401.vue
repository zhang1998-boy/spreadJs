<template>
  <section class="page-container">
    <el-row class="content">
      <el-col :span="12">
        <h2 class="text-jumbo">Oops!</h2>
        <h3>你没有权限去该页面</h3>
      </el-col>
      <el-col :span="12">
        <img
          src="@/assets/images/error/401.gif"
          width="313"
          height="428"
          alt="Girl has dropped her ice cream."
        />
      </el-col>
    </el-row>
  </section>
</template>
<style lang='scss' scoped>
.page-container {
  display: flex;
  align-items: center;
  justify-content: center;

  .content {
    width: 600px;
    margin-top: -80px;
    line-height: 2;

    .text-jumbo {
      color: #484848;
      font-weight: 700;
      font-size: 60px;
    }
  }
}
</style>
