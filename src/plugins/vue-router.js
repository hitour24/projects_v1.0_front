import Vue from 'vue';
import Router from 'vue-router';
import Login from '../components/auth/Login.vue';
import Register from '../components/auth/Register.vue';
import projects from '../components/projects/projects.vue';
import objectives from '../components/objectives/objectives.vue';
import products from '../components/products/products.vue';
import members from '../components/members/members.vue';
import settings from '../components/auth/settings';
import catalogs from '../components/settings/catalogs/catalogs.vue';
import viewProject from '../components/views/viewProject.vue';
// import sources from '../components/public/sources/sources';
// --------------------------------------------------------------------
// vue-router CONFIGURATION
// --------------------------------------------------------------------

Vue.use(Router);

const router = new Router({
    mode: 'history',
    // base: '/',
    routes: [
        {
            path: '/',
            name: 'projects',
            component: projects,
            meta: {
                auth: true,
            },
        },
        {
            path: '/view/project/',
            name: 'viewProject',
            component: viewProject,
            meta: {
                auth: true,
            },
        },
        {
            path: '/objectives',
            name: 'objectives',
            component: objectives,
            meta: {
                auth: 'admin',
            },
        },
        {
            path: '/products',
            name: 'products',
            component: products,
            meta: {
                auth: 'admin',
            },
        },
        {
            path: '/members',
            name: 'members',
            component: members,
            meta: {
                auth: 'admin',
            },
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
        },
        {
            path: '/register',
            name: 'register',
            component: Register,
        },
        // {
        //     path: '/editor',
        //     name: 'Редактор',
        //     component: editor
        // },
        // {
        //     path: '/contacts',
        //     name: 'Контакты',
        //     component: contacts
        // },
        {
            path: '/settings',
            name: 'Настройки',
            component: settings,
            meta: {
                auth: true,
            },
        },
        {
            path: '/settings/catalogs',
            name: 'Настройка каталогов',
            component: catalogs,
            meta: {
                auth: 'admin',
            },
        },
        // {
        //     path: '/',
        //     name: 'main-user',
        //     component: User,
        //     children: [
        //         {
        //             path: '',
        //             name: 'user1',
        //             meta: {
        //                 auth: true,
        //             },
        //             component: Info,
        //         },
        //         {
        //             path: 'user',
        //             name: 'user2',
        //             meta: {
        //                 auth: 'ROLE_ADMIN',
        //             },
        //             component: Info,
        //         },
        //     ],
        // },
        // {
        //     path: '/admin',
        //     meta: {
        //         auth: true,
        //     },
        //     component: Admin,
        //     children: [
        //         {
        //             path: '',
        //             name: 'admin1',
        //             meta: {
        //                 auth: ['ROLE_ADMIN'],
        //             },
        //             component: Info,
        //         },
        //         {
        //             path: 'auth',
        //             name: 'admin2',
        //             meta: {
        //                 auth: ['ROLE_UNKNOWN'],
        //             },
        //             component: Info,
        //         },
        //     ],
        // },
        // {
        //     path: '/logout',
        //     component: Logout,
        // },
        // {
        //     path: '*',
        //     redirect: '/',
        // },
    ],
});

(Vue).router = router;

export default router;