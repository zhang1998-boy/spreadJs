<template>
  <section class="page-container">
    <section
      class="top-card"
    >
      <section class="top-card-item">
        <el-skeleton
          :rows="3"
          animated
          :loading="loading"
        >
          <section class="top-card-con">
            <section class="con-main">
              <section class="con-title">
                <span class="title">总销售额</span>
                <el-tooltip
                  effect="dark"
                  content="指标说明"
                  placement="bottom"
                >
                  <span class="help">
                    <i class="el-icon-warning-outline"></i>
                  </span>
                </el-tooltip>
              </section>

              <section class="amount-price">¥ 126,560</section>

              <section class="dashboard">
                <span>
                  周同比
                  <span>12%</span>
                  <span class="icon-up">
                    <i class="el-icon-caret-top"></i>
                  </span>
                </span>
                <span class="ml20">
                  日同比
                  <span>11%</span>
                  <span class="icon-down">
                    <i class="el-icon-caret-bottom"></i>
                  </span>
                </span>
              </section>
            </section>
            <section class="con-bottom">
              日销售额 ￥12,423
            </section>
          </section>
        </el-skeleton>
      </section>
      <section class="top-card-item">
        <el-skeleton
          :rows="3"
          animated
          :loading="loading"
        >
          <section class="top-card-con">
            <section class="con-main">
              <section class="con-title">
                <span class="title">访问量</span>
                <el-tooltip
                  effect="dark"
                  content="指标说明"
                  placement="bottom"
                >
                  <span class="help">
                    <i class="el-icon-warning-outline"></i>
                  </span>
                </el-tooltip>
              </section>

              <section class="amount-price">8,846</section>

              <visit-counts />
            </section>
            <section class="con-bottom">
              日访问量 ￥12,34
            </section>
          </section>
        </el-skeleton>
      </section>
      <section class="top-card-item">
        <el-skeleton
          :rows="3"
          animated
          :loading="loading"
        >
          <section class="top-card-con">
            <section class="con-main">
              <section class="con-title">
                <span class="title">支付笔数</span>
                <el-tooltip
                  effect="dark"
                  content="指标说明"
                  placement="bottom"
                >
                  <span class="help">
                    <i class="el-icon-warning-outline"></i>
                  </span>
                </el-tooltip>
              </section>

              <section class="amount-price">6,560</section>

              <pay-account-chart />
            </section>
            <section class="con-bottom">
              转化率 60%
            </section>
          </section>
        </el-skeleton>
      </section>
      <section class="top-card-item">
        <el-skeleton
          :rows="3"
          animated
          :loading="loading"
        >
          <section class="top-card-con">
            <section class="con-main">
              <section class="con-title">
                <span class="title">运营活动效果</span>
                <el-tooltip
                  effect="dark"
                  content="指标说明"
                  placement="bottom"
                >
                  <span class="help">
                    <i class="el-icon-warning-outline"></i>
                  </span>
                </el-tooltip>
              </section>

              <section class="amount-price">78%</section>

              <section class="dashboard">
                <el-slider v-model="sliderBarVal" />
              </section>
            </section>
            <section class="con-bottom">
              <span>
                周同比
                <span>12%</span>
                <span class="icon-up">
                  <i class="el-icon-caret-top"></i>
                </span>
              </span>
              <span class="ml20">
                日同比
                <span>11%</span>
                <span class="icon-down">
                  <i class="el-icon-caret-bottom"></i>
                </span>
              </span>
            </section>
          </section>
        </el-skeleton>
      </section>
    </section>

    <section class="second-screen">
      <el-skeleton
        :rows="11"
        animated
        :loading="loading"
      >
        <section class="top-content">
          <section class="left-wrap">
            <section
              class="text"
              :class="activeName === 1 ? 'active' : ''"
              @click="changeTab(1)"
            >
              销售额
            </section>
            <section
              class="text ml-20"
              :class="activeName === 2 ? 'active' : ''"
              @click="changeTab(2)"
            >
              访问量
            </section>
          </section>

          <section class="right-wrap">
            <section
              class="text"
              :class="activeNameRight === 1 ? 'selected' : ''"
              @click="changeRightTab(1)"
            >
              今日
            </section>
            <section
              class="text"
              :class="activeNameRight === 2 ? 'selected' : ''"
              @click="changeRightTab(2)"
            >
              本周
            </section>
            <section
              class="text"
              :class="activeNameRight === 3 ? 'selected' : ''"
              @click="changeRightTab(3)"
            >
              本月
            </section>
            <section
              class="text"
              :class="activeNameRight === 4 ? 'selected' : ''"
              @click="changeRightTab(4)"
            >
              本年
            </section>
            <section class="date-wrap">
              <el-date-picker
                v-model="dateRangeVal"
                type="daterange"
                range-separator="至"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
              />
            </section>
          </section>
        </section>

        <section class="main-content">
          <sale-bar />
          <section class="table-wrap">
            <p>门店销售额排名</p>
            <lf-table
              :index="true"
              :data="storeSaleData"
              :columns="columns"
              :show-header="false"
              empty-text=""
              :border="false"
            />
          </section>
        </section>
      </el-skeleton>
    </section>

    <section class="third-screen">
      <section class="content left-wrap">
        <el-skeleton
          :rows="11"
          animated
          :loading="loading"
        >
          <section class="title">
            <span class="text">线上热门搜索</span>
          </section>
          <visit-accounts-chart />
        </el-skeleton>
      </section>

      <section class="content right-wrap ml-30">
        <el-skeleton
          :rows="11"
          animated
          :loading="loading"
        >
          <section class="title">
            <span class="text">销售额类别占比</span>
          </section>
          <pie-sale-account />
        </el-skeleton>
      </section>
    </section>

    <section class="fourth-screen">
      <el-skeleton
        :rows="11"
        animated
        :loading="loading"
        style="width: 100%;"
      >
        <stack-line />
      </el-skeleton>
    </section>
  </section>
</template>

<script>
  import PayAccountChart from './components/PayAccountChart';
  import VisitCounts from './components/VisitCounts';
  import SaleBar from './components/SaleBar';
  import PieSaleAccount from './components/PieSaleAccount';
  import VisitAccountsChart from './components/VisitAccountsChart';
  import StackLine from './components/StackLine';

  export default {
    name: 'home',
    components: {
      PayAccountChart,
      VisitCounts,
      SaleBar,
      PieSaleAccount,
      VisitAccountsChart,
      StackLine,
    },
    data() {
      return {
        loading: true,
        sliderBarVal: 78,
        activeName: 1,
        activeNameRight: 4,
        dateRangeVal: ['2021-01-01', '2021-12-31'],
        storeSaleData: [
          {
            address: '工专路 0 号店',
            account: '323,234',
          },
          {
            address: '工专路 1 号店',
            account: '323,234',
          },
          {
            address: '工专路 3 号店',
            account: '323,234',
          },
          {
            address: '工专路 4 号店',
            account: '323,234',
          },
          {
            address: '工专路 5 号店',
            account: '323,234',
          },
          {
            address: '工专路 6 号店',
            account: '323,234',
          },
          {
            address: '工专路 7 号店',
            account: '323,234',
          }
        ],
        columns: [
          {
            prop: 'address',
            label: '',
          },
          {
            prop: 'account',
            label: '',
          }
        ],
      };
    },
    mounted() {
      setTimeout(() => {
        this.loading = false;
      }, 500);
    },
    methods: {
      changeTab(status) {
        this.activeName = status;
      },
      changeRightTab(status) {
        this.activeNameRight = status;
        switch (status) {
        case 1:
          this.dateRangeVal = [this.$dateUtils.getDay(0), this.$dateUtils.getDay(0)];
          break;
        case 2:
          this.dateRangeVal = [this.$dateUtils.getMonday('s', 0), this.$dateUtils.getMonday('e', 0)];
          break;
        case 3:
          this.dateRangeVal = [this.$dateUtils.getMonth('s', 0), this.$dateUtils.getMonth('e', 0)];
          break;
        case 4:
          this.dateRangeVal = [this.$dateUtils.getYear('s', 0), this.$dateUtils.getYear('e', 0)];
          break;
        default:
          this.dateRangeVal = [this.$dateUtils.getYear('s', 0), this.$dateUtils.getYear('e', 0)];
          break;
        }
      },
    },
  };
</script>
<style lang="scss" scoped>
::v-deep .el-slider {
  width: 100%;
}

.title {
  color: $--color-grey2;
  font-size: 14px;
}

.help {
  font-size: 16px;
  cursor: pointer;
}

.top-card {
  @include flex-box();

  box-sizing: border-box;

  .top-card-item {
    flex: 1;
    box-sizing: border-box;
    margin: 0 8px;
    padding: 12px;
    background-color: $--color-white;

    .top-card-con {
      .con-main {
        .con-title {
          @include flex-box();
        }

        .amount-price {
          margin-top: 4px;
          font-weight: 500;
          font-size: 30px;
          line-height: 38px;
        }

        .dashboard {
          display: flex;
          align-items: flex-end;
          height: 46px;
        }
      }

      .ml20 {
        margin-left: 20px;
      }

      .icon-up,
      .icon-down{
        margin-left: 4px;
        font-size: 12px;
      }

      .icon-up {
        color: $--color-tomato;
      }

      .icon-down {
        color: $--color-green;
      }

      .con-bottom {
        margin-top: 8px;
        padding-top: 8px;
        color: $--color-grey1;
        font-size: 14px;
        border-top: 1px solid $--color-grey-base;
      }
    }
  }
}

.second-screen {
  margin: 16px 8px;
  background-color: $--color-white;

  .top-content {
    @include flex-box();

    box-sizing: border-box;
    padding: 0 16px;
    border-bottom: 1px solid $--color-grey-base;

    .left-wrap,
    .right-wrap {
      display: flex;
      align-items: center;

      .text {
        position: relative;
        box-sizing: border-box;
        margin-left: 20px;
        padding: 16px 0;
        cursor: pointer;

        &:first-child {
          margin-left: 0;
        }

        &.active:after {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 2px;
          background-color: $--color-primary;
          content: '';
        }

        &:hover {
          color: $--color-primary;
        }

        &.selected {
          color: $--color-primary;
        }
      }

      .date-wrap {
        height: 30px;
        margin-left: 20px;
      }
    }
  }

  .main-content {
    @include flex-box();

    box-sizing: border-box;
    height: auto;
    padding: 12px 16px;

    .table-wrap {
      min-width: 320px;
      margin-left: 20px;
    }
  }
}

.third-screen {
  @include flex-box();

  margin: 16px 8px;

  .content {
    flex: 1;
    background-color: $--color-white;

    .title {
      box-sizing: border-box;
      padding: 16px;
      border-bottom: 1px solid $--color-grey-base;
    }
  }

  .ml-30 {
    margin-left: 20px;
  }
}

.fourth-screen {
  @include flex-box();

  margin: 16px 8px;
  background-color: $--color-white;
}
</style>
