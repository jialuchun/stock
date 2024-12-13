<!--
 * @LastEditors: luchun
-->
<template>
  <div class="chart-container">
    <div id="ar_li" class="ar_li" />
  </div>
</template>
<script>
import echarts from 'echarts'
import resize from './mixins/resize'

export default {
  mixins: [resize],
  props: {
  },
  data() {
    return {
      chart: null,
      ARData: [
        17.39, // 2024年1月
        29.01,
        32.682,
        35.2,
        34.45,
        30.55,
        32.20,
        32.40,
        35.19,
        35.74,
        37.67
      ],
      LIData: [
        31.94,
        38.87,
        50.23,
        52.15,
        50.06,
        48.18,
        43.59,
        42.19,
        40.06,
        38.69,
        34.82
      ]
    }
  },
  mounted() {
    // this.parseProfit()
    // this.getTotalProfit()
    this.initChart()
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(document.getElementById('ar_li'))
      const xData = (function() {
        const data = []
        for (let i = 1; i < 13; i++) {
          data.push(i + '月')
        }
        return data
      }())
      this.chart.setOption({
        title: {
          text: '2024年负债&应收(W)',
          subtext: '月底统计',
          x: '20',
          top: '20'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
        //   x: '5%',
          top: '4%',
          data: ['应收', '负债']
        },
        toolbox: {
          show: true,
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar'] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        calculable: true,
        xAxis: [
          {
            type: 'category',
            // prettier-ignore
            data: xData
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '应收',
            type: 'bar',
            data: this.ARData,
            markPoint: {
              data: [
                { type: 'max', name: 'Max' },
                { type: 'min', name: 'Min' }
              ]
            },
            markLine: {
              data: [{ type: 'average', name: 'Avg' }]
            },
            itemStyle: {
              color: '#b34038'
            }
          },
          {
            name: '负债',
            type: 'bar',
            data: this.LIData,
            markPoint: {
              data: [
                // { name: 'Max', value: 182.2, xAxis: 7, yAxis: 183 },
                // { name: 'Min', value: 2.3, xAxis: 11, yAxis: 3 }
                { type: 'max', name: 'Max' },
                { type: 'min', name: 'Min' }
              ]
            },
            markLine: {
              data: [{ type: 'average', name: 'Avg' }]
            },
            itemStyle: {
              color: 'rgb(0,136,212)'
            }
          }
        ]
      })
    }
  }
}
</script>
<style scoped>
.chart-container{
  position: relative;
  width: 100%;
  height: calc(100vh - 84px);
}
.ar_li {
    width: 100%;
    height: 100%;
}
</style>
