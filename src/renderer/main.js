import Vue from 'vue';
import axios from 'axios';

import App from './App';
import router from './router';

import firebase from 'firebase';

if (!process.env.IS_WEB) {
  Vue.use(require('vue-electron'));
}


// Initialize Firebase
const config = {

};

firebase.initializeApp(config);

Vue.http = Vue.prototype.$http = axios;
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  components: {
    App
  },
  router,
  template: '<App/>'
}).$mount('#app');