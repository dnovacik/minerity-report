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
  apiKey: "AIzaSyCO2zIxNVapfyeQCvq5gwax7W4iTmsXAA8",
  authDomain: "minerity-report.firebaseapp.com",
  databaseURL: "https://minerity-report.firebaseio.com",
  projectId: "minerity-report",
  storageBucket: "minerity-report.appspot.com",
  messagingSenderId: "742951301404"
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