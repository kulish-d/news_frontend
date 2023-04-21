import MainPage from '@/pages/MainPage';

const routes = [
    {
        path: '/',
        component: MainPage
    },
    {
        path: '/users/:id',
        component: () => import('@/pages/UserPage'),
        name: 'users',
        props: true
    },
    {
        path: '/posts/:id',
        component: () => import('@/pages/CommentPage.vue'),
        name: 'posts',
        props: true
    }
]

export default routes;