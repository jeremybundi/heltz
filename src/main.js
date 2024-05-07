import Vue from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUserSecret } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';


library.add(faUserSecret);

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.use(BootstrapVue)

Vue.use(IconsPlugin)




const pinia = createPinia()

Vue.use(pinia)

new Vue({

  el: '#app',
 
  pinia,

  router,
  render: h => h(App)
}).$mount('#app')
