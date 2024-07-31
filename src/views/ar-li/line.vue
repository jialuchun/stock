<!--
 * @LastEditors: luchun
-->
<template>
  <div class="chart-container">
    <div id="fund_chart" class="fund_chart" />
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
      monthProfit: [
        6879.91, // 2018年5月
        9835.00,
        9835.00,
        9835.00,
        9835.00,
        10362.50,
        10362.50,
        10362.50,
        24424.25, // 2019年1月 + 奖金
        10553.25,
        10553.25,
        10553.25,
        10553.25,
        10553.25,
        10268.00,
        10152.50,
        10152.50,
        10152.50,
        10152.50,
        10152.50,
        17343.25, // 2020年1月 + 奖金
        10553.25,
        10553.25,
        10553.25,
        10553.25,
        10553.25,
        10268.00,
        15899.95,
        9777.56,
        9965.03,
        9965.03,
        9965.03,
        24901.20, // 2021年1月 + 奖金
        10351.20,
        10351.20,
        10351.20,
        13261.19,
        13044.19,
        12665.03,
        16715.03,
        12688.43,
        12676.73,
        18076.73,
        12676.73,
        13273.81, // 2022年1月
        23458.81,
        13267.57,
        12676.73,
        12676.73,
        12676.73,
        12676.73,
        12676.73,
        105915.81,
        0
      ], // 每月收入 2018年5月开始
      profitData: [],
      fundAmount: [
        0, // 2018年5月
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0, // 2019年
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0, // 2020年1月
        0,
        0,
        4500,
        0,
        0,
        6000,
        0,
        0,
        6000,
        0,
        0,
        6000, // 2021年1月
        0,
        0,
        6000,
        0,
        0,
        6000,
        0,
        0,
        6000,
        0,
        0,
        6000, // 2022年1月
        0,
        0,
        6000,
        0,
        0,
        6000,
        0,
        0,
        6000,
        0,
        0,
        6000, // 2023年1月
        0,
        0,
        6000,
        0,
        0,
        6000,
        0,
        0,
        6000,
        0,
        0,
        6000, // 2024年1月
        0,
        0,
        0,
        0,
        0,
        0
      ],
      totalFundAmount: []
    }
  },
  mounted() {
    this.getProfit()
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
      // 从2017年10月开始计算
      this.chart = echarts.init(document.getElementById('fund_chart'))
      this.chart.setOption({
        backgroundColor: '#394056',
        title: {
          top: 20,
          text: '收入&公积金提取',
          textStyle: {
            fontWeight: 'normal',
            fontSize: 16,
            color: '#F1F1F3'
          },
          left: '1%'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            lineStyle: {
              color: '#57617B'
            }
          }
        },
        legend: {
          top: 20,
          icon: 'rect',
          itemWidth: 14,
          itemHeight: 5,
          itemGap: 13,
          data: ['收入累计', '公积金累计', '每月收入'],
          right: '4%',
          textStyle: {
            fontSize: 12,
            color: '#F1F1F3'
          }
        },
        grid: {
          top: 100,
          left: '2%',
          right: '2%',
          bottom: '2%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          boundaryGap: false,
          axisLine: {
            lineStyle: {
              color: '#57617B'
            }
          },
          data: this.getYearAndMonth('2018-04', this.getCurrentDate())
        }],
        yAxis: [{
          type: 'value',
          name: '(元)',
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#57617B'
            }
          }
        }],
        series: [{
          name: '收入累计',
          type: 'line',
          smooth: true,
          symbol: 'circle',
          symbolSize: 5,
          showSymbol: false,
          lineStyle: {
            normal: {
              width: 1
            }
          },
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(219, 50, 51, 0.3)'
              }, {
                offset: 0.8,
                color: 'rgba(219, 50, 51, 0)'
              }], false),
              shadowColor: 'rgba(0, 0, 0, 0.1)',
              shadowBlur: 10
            }
          },
          itemStyle: {
            normal: {
              color: 'rgb(219,50,51)',
              borderColor: 'rgba(219,50,51,0.2)',
              borderWidth: 12
            }
          },
          data: this.profitData
        }, {
          name: '公积金累计',
          type: 'line',
          smooth: true,
          symbol: 'circle',
          symbolSize: 5,
          showSymbol: false,
          lineStyle: {
            normal: {
              width: 1
            }
          },
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(0, 136, 212, 0.3)'
              }, {
                offset: 0.8,
                color: 'rgba(0, 136, 212, 0)'
              }], false),
              shadowColor: 'rgba(0, 0, 0, 0.1)',
              shadowBlur: 10
            }
          },
          itemStyle: {
            normal: {
              color: 'rgb(0,136,212)',
              borderColor: 'rgba(0,136,212,0.2)',
              borderWidth: 12

            }
          },
          data: this.totalFundAmount
        }, {
          name: '每月收入',
          type: 'line',
          smooth: true,
          symbol: 'circle',
          symbolSize: 5,
          showSymbol: false,
          lineStyle: {
            normal: {
              width: 1
            }
          },
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgb(221, 164, 81, 0.3)'
              }, {
                offset: 0.8,
                color: 'rgba(221, 164, 81, 0)'
              }], false),
              shadowColor: 'rgba(0, 0, 0, 0.1)',
              shadowBlur: 10
            }
          },
          itemStyle: {
            normal: {
              color: 'rgb(221, 164, 81)',
              borderColor: 'rgba(221, 164, 81,0.2)',
              borderWidth: 12
            }
          },
          data: this.monthProfit
        }]
      })
    },
    getYearAndMonth(start, end) {
      const result = []
      const starts = start.split('-')
      const ends = end.split('-')
      let staYear = parseInt(starts[0])
      let staMon = parseInt(starts[1])
      const endYear = parseInt(ends[0])
      const endMon = parseInt(ends[1])
      while (staYear <= endYear) {
        if (staYear === endYear) {
          while (staMon < endMon) {
            staMon++
            const str = staYear + '-' + (staMon >= 10 ? staMon : '0' + staMon)
            result.push(str)
          }
          staYear++
        } else {
          staMon++
          if (staMon > 12) {
            staMon = 1
            staYear++
          }
          const str = staYear + '-' + (staMon >= 10 ? staMon : '0' + staMon)
          result.push(str)
        }
      }
      return result
    },
    getCurrentDate() {
      const date = new Date()
      const fullYear = date.getFullYear()
      const fullMonth = date.getMonth() + 1
      return `${fullYear}-${fullMonth}`
    },
    getProfit() {
      this.monthProfit.reduce((prev, cur, index, arr) => {
        this.profitData.push(+(prev + cur).toFixed(2))
        return prev + cur
      }, 0)
      this.fundAmount.reduce((prev, cur, index, arr) => {
        this.totalFundAmount.push(+(prev + cur).toFixed(2))
        return prev + cur
      }, 0)
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
.fund_chart {
    width: 100%;
    height: 100%;
}
</style>
