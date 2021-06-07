import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase";
import router from "../router/index";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userId: null,
  },
  mutations: {
    signIn(state, userCredential) {
      state.userId = userCredential.user.uid;
      console.log("You successfully signed in!");
    },
    signUp(state, userCredential) {
      state.userId = userCredential.user.uid;
      console.log("You successfully signed up!");
    },
    signOut(state) {
      state.userId = null;
      router.push({ name: "home" });
    },
  },
  actions: {
    signIn({ commit }, payload) {
      firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then((userCredential) => {
          commit("signIn", userCredential);
        })
        .catch((err) => {
          alert("ugh, it is not working...");
          console.log(err.message);
        });
    },
    signUp({ commit }, payload) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then((userCredential) => {
          commit("signUp", userCredential);
        })
        .catch((err) => {
          alert("OMG, sign up failed!");
          console.log(err.message);
        });
    },
    signOut({ commit }) {
      firebase
        .auth()
        .signOut()
        .then(() => {
          commit("signOut");
        })
        .catch((err) => {
          alert("Oh No something went wrong!!");
          console.log(err.message);
        });
    },
  },
  modules: {},
});
