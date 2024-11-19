<template>
  <section
    id="saleCounts"
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
        const saleCountsChart = init(document.getElementById('saleCounts'));
        const option = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow',
            },
          },
          grid: {
            top: 30,
            left: 50,
            right: 10,
            bottom: 30,
          },
          xAxis: {
            type: 'category',
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
          },
          yAxis: {
            type: 'value',
          },
          series: [
            {
              data: [845, 806, 470, 809, 865, 434, 545, 906, 488, 321, 890, 919],
              type: 'bar',
            }
          ],
        };

        option && saleCountsChart.setOption(option);
      },
    },
  };
</script>
<style lang="scss" scoped>
.dashboard {
  display: flex;
  flex: 1;
  align-items: flex-end;
  height: 300px;
}
</style>
