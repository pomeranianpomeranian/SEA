import firebase from "firebase";
import router from "../../router";
import i18n from "../../i18n";

const authRef = firebase.auth();
const userRef = firebase.firestore().collection("users");

const state = {
  userId: null,
  userDetails: null,
};
const mutations = {
  signIn(state, userId) {
    state.userId = userId;
    router.push({ name: "user", params: { userId: state.userId } });
  },
  autoSignIn(state, userId) {
    state.userId = userId;
  },
  signUp(state, userCredential) {
    state.userId = userCredential.user.uid;
  },
  signOut(state) {
    state.userId = null;
    state.userDetails = null;
    router.push({ name: "home" });
  },
  registerUser(state, userDetails) {
    state.userDetails = userDetails;
    router.push({ name: "user", params: { userId: state.userId } });
  },
  fetchUserData(state, userData) {
    state.userDetails = userData;
  },
  setLang(state) {
    i18n.locale = state.userDetails.language;
  },
};
const actions = {
  signIn({ commit, dispatch }, userData) {
    authRef.setPersistence(firebase.auth.Auth.Persistence.SESSION).then(() => {
      authRef
        .signInWithEmailAndPassword(userData.email, userData.password)
        .then((userCredential) => {
          commit("signIn", userCredential.user.uid);
          dispatch("fetchUserData", userCredential.user.uid);
        });
    });
  },
  signUp({ commit, dispatch }, userData) {
    authRef
      .createUserWithEmailAndPassword(
        userData.authData.email,
        userData.authData.password
      )
      .then((userCredential) => commit("signUp", userCredential))
      .then(() => dispatch("registerUser", userData.userDetails));
  },
  signOut({ commit }) {
    authRef.signOut().then(() => {
      commit("signOut");
    });
  },
  registerUser({ commit, state }, userDetails) {
    userRef
      .doc(state.userId)
      .set({
        ...userDetails,
      })
      .then(() => {
        commit("registerUser", userDetails);
        commit("setLang");
      });
  },
  fetchUserData({ commit }, userId) {
    userRef
      .doc(userId)
      .get()
      .then((doc) => {
        commit("fetchUserData", doc.data());
        commit("setLang");
      });
  },
  autoSignIn({ commit, dispatch }) {
    authRef.onAuthStateChanged((user) => {
      if (user) {
        commit("autoSignIn", user.uid);
        dispatch("fetchUserData", user.uid);
      }
    });
  },
};

export default {
  state,
  mutations,
  actions,
};
