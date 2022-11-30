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
        3.8, // 2022年1月18号
        4.2, // 2022年2月28号
        3.8,
        3.8,
        4.1,
        3.8,
        3.8,
        4.3,
        8.3,
        8.2,
        8.2
      ],
      LIData: [
        41.4,
        47.26,
        52.2,
        50.9,
        49.6,
        54.35,
        50.10,
        51.00,
        48.17,
        50.28,
        44.27
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
          text: '2022年负债&应收(W)',
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
    // parseProfit() {
    //   this.formatProfitData = this.profit.map(item => {
    //     if (item < 0) {
    //       return {
    //         value: item,
    //         itemStyle: {
    //           color: 'rgb(0,136,212)'
    //         }
    //       }
    //     } else {
    //       return item
    //     }
    //   })
    // },
    // // 累计盈亏
    // getTotalProfit() {
    //   this.profit.reduce((prev, cur, index, arr) => {
    //     this.totalProfit.push(+(prev + cur).toFixed(2))
    //     return prev + cur
    //   }, 0)
    // }
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
