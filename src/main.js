/* eslint-disable */
/* eslint-disable no-new */

//IMPORT COMPONENTS
import Vue from 'vue'
import App from './App'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import VueSession from 'vue-session'
import VueGoodTablePlugin from 'vue-good-table';
import * as VueGoogleMaps from 'vue2-google-maps'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import Vuesax from 'vuesax'
import VueMouseParallax from 'vue-mouse-parallax'
import axios from 'axios'
import VueAxios from 'vue-axios'
// import vUploader from 'v-uploader';
import VueScrollReveal from 'vue-scroll-reveal';

// USE
Vue.use(VueSession)
Vue.use(VueGoodTablePlugin);
Vue.use(VueAwesomeSwiper, /* { default global options } */)
Vue.use(BootstrapVue)
Vue.use(Vuesax)
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDhpkVWQbYzo9BT3xpIniDaAonCY1a_Wjw',
    libraries: 'places',
    region: 'TH',
    language: 'th'
  },
})
Vue.use(VueMouseParallax)
Vue.use(VueAxios, axios)
// Vue.use(vUploader);
Vue.use(VueScrollReveal,{delay: 250,easing: 'ease-in'});

// CSS
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './assets/Styleres.css'
import 'vuesax/dist/vuesax.css'
import 'swiper/dist/css/swiper.css'
import 'material-icons/iconfont/material-icons.css';
import './assets/Style.css';
import './assets/Styleres.css';
import './assets/Styleimagegalley.css'
import './assets/StyleAni.css'
import './assets/StyleProductIcon.css'

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  // render: h => h(App)
})
