import MainPage from '@/pages/MainPage';

const routes = [
    {
        path: '/',
        component: MainPage
    },
    {
        path: '/users',
        component: () => import('@/pages/UserPage')
    },
]

export default routes;