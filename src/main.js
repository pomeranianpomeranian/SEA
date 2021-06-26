import Vue from "vue";
import "./plugins/bootstrap-vue";
import App from "./App.vue";
import router from "./router";
import "./firebase.js";
import store from "./store/index";
import * as VueGoogleMaps from "vue2-google-maps";
import VueGeolocation from "vue-browser-geolocation";
Vue.use(VueGeolocation);
import i18n from "./i18n";

Vue.config.productionTip = false;

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyBdqpd-ViC5zdoC3XS1lOjhSNfNBcaznkw",
    libraries: "places",
    region: "jp",
  },
});

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount("#app");
