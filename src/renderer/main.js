import Vue from 'vue';
import axios from 'axios';

import App from './App';
import router from './router/index';
import store from './store';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faCogs, faUserCog, faUsersCog } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faCogs, faUserCog, faUsersCog);

Vue.component('font-awesome-icon', FontAwesomeIcon);

if (!process.env.IS_WEB) {
  Vue.use(require('vue-electron'));
}

Vue.http = Vue.prototype.$http = axios;
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  components: {
    App
  },
  store,
  router,
  template: '<App/>'
}).$mount('#app');