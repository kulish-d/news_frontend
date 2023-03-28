import MainPage from '@/pages/MainPage';

const routes = [
    {
        path: '/',
        component: MainPage
    },
    {
        path: '/my-page',
        component: () => import('@/pages/UserPage')
    },
]

export default routes;