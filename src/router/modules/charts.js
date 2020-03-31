/*
 * @Author: your name
 * @Date: 2020-03-31 21:33:56
 * @LastEditTime: 2020-04-01 00:11:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /stock/src/router/modules/charts.js
 */
/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const chartsRouter = {
  path: '/charts',
  component: Layout,
  redirect: 'noRedirect',
  name: 'Charts',
  meta: {
    title: '2020年统计',
    icon: 'chart'
  },
  children: [
    // {
    //   path: 'keyboard',
    //   component: () => import('@/views/charts/keyboard'),
    //   name: 'KeyboardChart',
    //   meta: { title: 'Keyboard Chart', noCache: true }
    // },
    {
      path: 'stockRate',
      component: () => import('@/views/charts/line'),
      name: '收益率图表',
      meta: { title: '收益率图表', noCache: true }
    },
    {
      path: 'stockMoney',
      component: () => import('@/views/charts/mix-chart'),
      name: '资金图表',
      meta: { title: '资金图表', noCache: true }
    }
  ]
}

export default chartsRouter
