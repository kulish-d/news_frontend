import MainPage from '@/pages/MainPage';

import { getGoogleUrl } from '../api/gAuth'
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
        path: '/redirect',
        redirect: () => {
            window.location.href = getGoogleUrl();
            return '/redirecting' // not important since redirecting
        }
    },
]

export default routes;