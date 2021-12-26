/*
 * @LastEditors: luchun
 */
import Layout from '@/layout'

const fundRouter = {
  path: '/fund',
  component: Layout,
  redirect: 'noRedirect',
  name: 'Fund',
  meta: {
    title: '入市统计',
    icon: 'chart'
  },
  children: [
    {
      path: 'stockCurve',
      component: () => import('@/views/fund/line'),
      name: '入市总收益统计',
      meta: { title: '入市总收益统计', noCache: true }
    },
    {
      path: 'stock2021',
      component: () => import('@/views/fund/chart-2021'),
      name: '2021年统计',
      meta: { title: '2021年统计', noCache: true }
    }
  ]
}

export default fundRouter
