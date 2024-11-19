<template>
  <section
    id="pieSaleAccounts"
    class="dashboard"
  ></section>
</template>
<script>
  import { init } from 'echarts';

  export default {
    mounted() {
      this.createChart();
    },
    methods: {
      createChart() {
        const pieSaleAccountsChart = init(document.getElementById('pieSaleAccounts'));
        const option = {
          tooltip: {
            trigger: 'item',
          },
          title: {
            text: '销售额',
            left: 'center',
            top: '40%',
            textStyle: {
              fontSize: 18,
              align: 'center',
            },
          },
          graphic: {
            type: 'text',
            left: 'center',
            top: '50%',
            style: {
              text: '15781',
              textAlign: 'center',
              fontSize: 36,
              fontWeight: 700,
            },
          },
          series: [
            {
              name: '销售额',
              type: 'pie',
              radius: ['40%', '70%'],
              avoidLabelOverlap: false,
              data: [
                { value: 4544, name: '家用电器' },
                { value: 3321, name: '食用酒水' },
                { value: 3113, name: '个护健康' },
                { value: 2341, name: '服饰箱包' },
                { value: 1231, name: '母婴产品' },
                { value: 1100, name: '其他' }
              ],
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)',
                },
              },
            }
          ],
        };

        option && pieSaleAccountsChart.setOption(option);
      },
    },
  };
</script>
<style lang="scss" scoped>
.dashboard {
  display: flex;
  flex: 1;
  align-items: flex-end;
  height: 360px;
}
</style>
