// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/* eslint-disable */
/* eslint-disable no-new */
import Vue from 'vue'
import App from './App'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
// import HomeContent from '@/component/HomeContent.vue'
import VueSession from 'vue-session'
// import FreeTransform from 'vue-free-transform'
// import { VueSpinners } from '@saeris/vue-spinners'
import VueGoodTablePlugin from 'vue-good-table';
import * as VueGoogleMaps from 'vue2-google-maps'
// import Vuetify from 'vuetify'
import VueAwesomeSwiper from 'vue-awesome-swiper'


Vue.use(VueSession)
// Vue.use(FreeTransform)
// Vue.use(VueSpinners)
Vue.use(VueGoodTablePlugin);
Vue.use(VueAwesomeSwiper, /* { default global options } */)
// vue.use(VueGoogleAutocomplete)
// CSS
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
// import 'vuetify/dist/vuetify.min.css'
import './assets/Styleres.css'

Vue.use(BootstrapVue)
// Vue.use(Vuetify)

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDhpkVWQbYzo9BT3xpIniDaAonCY1a_Wjw',
    libraries: 'places', // This is required if you use the Autocomplete plugin
    region: 'TH',
    language: 'th'
    // OR: libraries: 'places,drawing'
    // OR: libraries: 'places,drawing,visualization'
    // (as you require)
 
    //// If you want to set the version, you can do so:
    // v: '3.26',
  },
 
  //// If you intend to programmatically custom event listener code
  //// (e.g. `this.$refs.gmap.$on('zoom_changed', someFunc)`)
  //// instead of going through Vue templates (e.g. `<GmapMap @zoom_changed="someFunc">`)
  //// you might need to turn this on.
  // autobindAllEvents: false,
 
  //// If you want to manually install components, e.g.
  //// import {GmapMarker} from 'vue2-google-maps/src/components/marker'
  //// Vue.component('GmapMarker', GmapMarker)
  //// then disable the following:
  // installComponents: true,
})

// const routes = [
//   { path: '/Home', component: Home},
//   { path: '/HomeContent', component: HomeContent}
// ]
// const router = new VueRouter({
//   routes
// })


// const express = require('express')
// const app = express()

// app.get('/', (req, res) => {
//   res.send('Hello world')
// })

// app.listen(8080, () => console.log('Hello world'))
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  // render: h => h(App)
})
