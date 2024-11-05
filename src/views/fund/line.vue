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
        219.30, // 2017年10月
        -1278.42,
        5417.49,
        -3834.93, // 2018年1月
        -4706.85,
        -885.86,
        6718.01,
        -11799.49,
        -4161.52,
        -27302.49,
        -14318.73,
        5835.07,
        -7684.67,
        -69.64,
        3035.05,
        -10386.61, // 2019年1月
        20442.63,
        -25882.09,
        -6861.16,
        13264.57,
        45098.55,
        -21711.94,
        47637.87,
        -3237.13,
        -15220.47,
        565.36,
        7840.83,
        -17066.94, // 2020年1月
        3542.34,
        -23509.05,
        -18253.57,
        -8338.53,
        28139.71,
        18454.81,
        930.16,
        -37453.52,
        -10654.61,
        10083.73,
        -16100.11,
        -35350.46, // 2021年1月
        10381.77,
        8538.39,
        -15714.52,
        708.42,
        4610.47,
        10927.25,
        50980.66,
        92870.36, // 2021年9月
        -35055.37,
        9432.44,
        -46194.65,
        -199452.93, //  2022年1月
        100775.00,
        -1630.65,
        135414.40,
        32657.91,
        -19750.27,
        -20438.72,
        -94487.81,
        -41762.51,
        101470.47,
        -11160.86,
        -23264.92,
        64453.76, //  2023年1月
        23529.48,
        35098.87,
        -106649.70,
        10104.93,
        -18392.59,
        44402.12,
        -50814.01,
        -4617.24,
        -3790.15,
        -23010.88,
        -25274.16,
        14957.09, // 2024年1月
        8120.22,
        -2858.12,
        5813.27,
        -4202.71,
        -35030.39,
        24878.14,
        -37209.58,
        11555.49,
        -11645.86
      ],
      profitData: [],
      totalAmount: [
        10092.90, // 2017年10月
        17494.95,
        57988.39,
        72171.46, // 2018年1月
        78764.61,
        75855.95,
        8012.10,
        84333.75,
        120698.3,
        121336.83,
        67199.15,
        77682.00,
        120379.42,
        119208.32,
        63587.14,
        134723.33, // 2019年1月
        162568.12,
        176151.68,
        146132.99,
        188227.26,
        287853.36,
        243496.60,
        131748.10,
        204764.73,
        231291.35,
        218428.50,
        245182.50,
        196911.49, // 2020年1月
        249812.80,
        247606.51,
        242188.50,
        240500.50,
        301448.49,
        246116.99,
        342554.86,
        319961.49,
        299552.48,
        308682.09,
        224294.57,
        247280.70, // 2021年1月
        261006.17,
        273352.79,
        239490.50,
        280917.75,
        357039.70,
        454691.09,
        538320.90,
        282084.40, // 2021年9月 开始取市值
        538321.80,
        749717.30,
        944854.00,
        845191.00, // 2022年1月
        945966.00,
        972103.91,
        1109368.31,
        752065.01,
        816042.00,
        785798.00,
        1049192.04,
        932814.45,
        802855.60,
        787674.42,
        796656.68,
        638008.00, //  2023年1月
        839946.76,
        970180.00,
        844145.00,
        5763.00,
        652179.10,
        236935,
        607282,
        662497,
        317832,
        487265,
        14082,
        108466.51, // 2024年1月
        13695,
        302166,
        23694,
        127117,
        292903,
        400326,
        225167,
        23760,
        253463
      ]
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
          text: '资金收益&总资金',
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
          data: ['资金收益累计', '总资金', '每月盈亏'],
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
          data: this.getYearAndMonth('2017-09', this.getCurrentDate())
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
          name: '资金收益累计',
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
          name: '总资金',
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
          data: this.totalAmount
        }, {
          name: '每月盈亏',
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
