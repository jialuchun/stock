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
    },
    {
      path: 'stock2022',
      component: () => import('@/views/fund/chart-2022'),
      name: '2022年统计',
      meta: { title: '2022年统计', noCache: true }
    },
    {
      path: 'stock2023',
      component: () => import('@/views/fund/chart-2023'),
      name: '2023年统计',
      meta: { title: '2023年统计', noCache: true }
    },
    {
      path: 'stock2024',
      component: () => import('@/views/fund/chart-2024'),
      name: '2024年统计',
      meta: { title: '2024年统计', noCache: true }
    }
  ]
}

export default fundRouter
