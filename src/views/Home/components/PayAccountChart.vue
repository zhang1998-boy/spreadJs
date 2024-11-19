<template>
  <section
    id="payAccount"
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
        const payAccountChart = init(document.getElementById('payAccount'));
        const option = {
          grid: {
            top: 0,
            left: 6,
            right: 6,
            bottom: 0,
          },
          tooltip: {
            trigger: 'axis',
            formatter: '{c0}',
            axisPointer: {
              type: 'shadow',
            },
          },
          xAxis: {
            type: 'category',
            axisLine: {
              show: false,
            },
            axisLabel: {
              show: false,
            },
            axisTick: {
              show: false,
            },
          },
          yAxis: {
            type: 'value',
            min: 0,
            axisLine: {
              show: false,
            },
            axisLabel: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              show: false,
            },
          },
          series: [
            {
              data: [7, 5, 4, 2, 4, 7, 5, 6, 5, 9, 6, 3, 1, 5, 3, 6, 5],
              type: 'bar',
              barWidth: 8,
            }
          ],
        };

        option && payAccountChart.setOption(option);
      },
    },
  };
</script>
<style lang="scss" scoped>
.dashboard {
  display: flex;
  flex: 1;
  align-items: flex-end;
  height: 46px;
}
</style>
