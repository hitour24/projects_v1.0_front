import Vue from 'vue';
import VueAuth from '@d0whc3r/vue-auth-plugin';

// --------------------------------------------------------------------
// PLUGIN CONFIGURATION
// --------------------------------------------------------------------
Vue.use(VueAuth, {
    authMeta: 'auth',
    rolesVar: 'role',
    tokenDefaultName: 'project_roken',
    userDefaultName: 'project_auth_user',
    tokenStore: [/*'cookie', */'localStorage', 'vuex'],
    headerTokenReplace: '{auth_token}',
    tokenType: 'Bearer',
    vuexStoreSpace: 'vue-auth',

    authRedirect: '/login',

    loginData: {
        url: '/api/auth/authenticate',
        method: 'POST',
        redirect: '',
        headerToken: 'Authorization',
        fetchUser: true,
        fetchData: (response) => response.data.user,
        customToken: (response) => response.data.token,
    },
    registerData: {
        url: '/api/auth/register',
        method: 'POST',
        redirect: undefined,
        headerToken: 'Authorization',
        fetchUser: false,
        fetchData: (response) => response.data.user,
        customToken: (response) => response.data.token,
    },
    logoutData: { redirect: '/login' },
    fetchData: { url: '/api/auth/user', method: 'GET', enabled: true },
    refreshData: { url: '/api/auth/refresh', method: 'GET', enabled: true },
});