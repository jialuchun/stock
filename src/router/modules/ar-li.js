/*
 * @LastEditors: luchun
 */
import Layout from '@/layout'

const aRAndLiRouter = {
  path: '/ar-li',
  component: Layout,
  redirect: 'noRedirect',
  name: 'ArAndLi',
  meta: {
    title: '负债&应收&收入',
    icon: 'chart'
  },
  children: [
    {
      path: 'income',
      component: () => import('@/views/ar-li/line'),
      name: '收入&提取',
      meta: { title: '收入&提取', noCache: true }
    }, {
      path: '2022',
      component: () => import('@/views/ar-li/chart-2022'),
      name: '2022年负债&应收',
      meta: { title: '2022年负债', noCache: true }
    }, {
      path: '2023',
      component: () => import('@/views/ar-li/chart-2023'),
      name: '2023年负债&应收',
      meta: { title: '2023年负债', noCache: true }
    }, {
      path: '2024',
      component: () => import('@/views/ar-li/chart-2024'),
      name: '2024年负债&应收',
      meta: { title: '2024年负债', noCache: true }
    }, {
      path: '2025',
      component: () => import('@/views/ar-li/chart-2025'),
      name: '2025年负债&应收',
      meta: { title: '2025年负债', noCache: true }
    }
  ]
}

export default aRAndLiRouter
