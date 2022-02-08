/*
 * @LastEditors: luchun
 */
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
    title: '负债&应收',
    icon: 'chart'
  },
  children: [
    {
      path: '2022',
      component: () => import('@/views/ar-li/chart-2022'),
      name: '2022年负债&应收',
      meta: { title: '2022年负债', noCache: true }
    }
  ]
}

export default aRAndLiRouter
