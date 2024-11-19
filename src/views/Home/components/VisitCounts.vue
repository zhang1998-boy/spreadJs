<template>
  <section
    id="visitCounts"
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
        const visitCountsChart = init(document.getElementById('visitCounts'));
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
            boundaryGap: false,
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
              symbol: 'none',
              data: [7, 5, 4, 2, 4, 7, 5, 6, 5, 9, 6, 3, 1, 5, 3, 6, 5],
              type: 'line',
              itemStyle: {
                borderWidth: 0,
              },
              areaStyle: {},
            }
          ],
        };

        option && visitCountsChart.setOption(option);
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
