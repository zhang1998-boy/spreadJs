<template>
  <section class="page-container">
    <section class="content">
      <section class="pic-404">
        <img
          class="pic-404__parent"
          src="@/assets/images/error/404.png"
          alt="404"
        />
        <img
          class="pic-404__child left"
          src="@/assets/images/error/404_cloud.png"
          alt="404"
        />
        <img
          class="pic-404__child mid"
          src="@/assets/images/error/404_cloud.png"
          alt="404"
        />
        <img
          class="pic-404__child right"
          src="@/assets/images/error/404_cloud.png"
          alt="404"
        />
      </section>
      <section>
        <h2 class="text-jumbo">Oops!</h2>
        <h3>请检查您输入的网址是否正确</h3>
      </section>
    </section>
  </section>
</template>

<style lang='scss' scoped>
.page-container {
  display: flex;
  align-items: center;
  justify-content: center;

  .content {
    position: relative;
    display: flex;
    margin-top: -80px;
    overflow: hidden;
    line-height: 2;

    .pic-404 {
      position: relative;
      float: left;
      width: 600px;
      overflow: hidden;

      &__parent {
        width: 100%;
      }

      &__child {
        position: absolute;

        &.left {
          top: 17px;
          left: 220px;
          width: 80px;
          opacity: 0;
          animation-name: cloud-left;
          animation-duration: 2s;
          animation-timing-function: linear;
          animation-delay: 1s;
          animation-fill-mode: forwards;
        }

        &.mid {
          top: 10px;
          left: 420px;
          width: 46px;
          opacity: 0;
          animation-name: cloud-mid;
          animation-duration: 2s;
          animation-timing-function: linear;
          animation-delay: 1.2s;
          animation-fill-mode: forwards;
        }

        &.right {
          top: 100px;
          left: 500px;
          width: 62px;
          opacity: 0;
          animation-name: cloud-right;
          animation-duration: 2s;
          animation-timing-function: linear;
          animation-delay: 1s;
          animation-fill-mode: forwards;
        }

        @keyframes cloud-left {
          0% {
            top: 17px;
            left: 220px;
            opacity: 0;
          }

          20% {
            top: 33px;
            left: 188px;
            opacity: 1;
          }

          80% {
            top: 81px;
            left: 92px;
            opacity: 1;
          }

          100% {
            top: 97px;
            left: 60px;
            opacity: 0;
          }
        }

        @keyframes cloud-mid {
          0% {
            top: 10px;
            left: 420px;
            opacity: 0;
          }

          20% {
            top: 40px;
            left: 360px;
            opacity: 1;
          }

          70% {
            top: 130px;
            left: 180px;
            opacity: 1;
          }

          100% {
            top: 160px;
            left: 120px;
            opacity: 0;
          }
        }

        @keyframes cloud-right {
          0% {
            top: 100px;
            left: 500px;
            opacity: 0;
          }

          20% {
            top: 120px;
            left: 460px;
            opacity: 1;
          }

          80% {
            top: 180px;
            left: 340px;
            opacity: 1;
          }

          100% {
            top: 200px;
            left: 300px;
            opacity: 0;
          }
        }
      }
    }

    .text-jumbo {
      color: #484848;
      font-weight: 700;
      font-size: 60px;
    }
  }
}
</style>
