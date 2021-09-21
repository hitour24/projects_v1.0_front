import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
// import router from './routing/router'
import router from './plugins/vue-router';
import vuetify from '@/plugins/vuetify' // path to vuetify export

import VueTheMask from 'vue-the-mask'

import Toast from "vue-toastification"
import "vue-toastification/dist/index.css"

import VueAuth from '@d0whc3r/vue-auth-plugin';
import store from './plugins/vuex';

import './plugins/vue-axios';
import './plugins/vue-auth';

import './plugins/helper';
// import './plugins/report';

// Vue.prototype.$func = func

const options = {
  draggable: false
}
Vue.config.productionTip = false

Vue.use(Toast, options);
Vue.use(VueRouter);
Vue.use(VueTheMask);
Vue.use(VueAuth);



new Vue({
  vuetify,
  store,
  render: h => h(App),
  router,
}).$mount('#app')
