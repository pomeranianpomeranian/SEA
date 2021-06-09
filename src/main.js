import Vue from "vue";
import App from "./App.vue";
import router from "./router";

// import as VueGoogleMaps from 'gmap-vue'

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");

// Vue.use(VueGoogleMaps, {
//   load: {
//     key: process.env.AIzaSyCQgE9VDrIarzaPds_kwX87aus7gRxy1Ds,
//     libraries: 'places',
//     region: 'JP',
//     language: 'ja'
//   }
// })
// Vue.config.productionTip = false

// new Vue({
//   render: h => h(App),
// }).$mount('#app')
