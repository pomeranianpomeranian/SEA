import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./firebase.js";
import store from "./store/index";

import * as VueGoogleMaps from "vue2-google-maps";

Vue.config.productionTip = false;

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyBdqpd-ViC5zdoC3XS1lOjhSNfNBcaznkw",
    libraries: "places", // This is required if you use the Autocomplete plugin
    // OR: libraries: 'places,drawing'
    // OR: libraries: 'places,drawing,visualization'
    // (as you require)
    region: "jp",

    //// If you want to set the version, you can do so:
    // v: '3.26',
  },
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
