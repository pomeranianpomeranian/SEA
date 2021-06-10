import firebase from "firebase";
import router from "../../router";

const state = {
  userId: null,
  userData: null,
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
    router.push({ name: "home" });
  },
  registerUser(state, userData) {
    state.userData = userData;
    router.push({ name: "user", params: { userId: state.userId } });
  },
  fetchUserData(state, userData) {
    state.userData = userData;
  },
};
const actions = {
  signIn({ commit, dispatch }, userData) {
    firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(() => {
        firebase
          .auth()
          .signInWithEmailAndPassword(userData.email, userData.password)
          .then((userCredential) => {
            commit("signIn", userCredential.user.uid);
            dispatch("fetchUserData", userCredential.user.uid);
          })
          .catch((err) => {
            console.log(err.message);
          });
      });
  },
  signUp({ commit, dispatch }, userData) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(userData.email, userData.password)
      .then((userCredential) => commit("signUp", userCredential))
      .then(() => dispatch("registerUser", userData))
      .catch((err) => {
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
        console.log(err.message);
      });
  },
  registerUser({ commit, state }, userData) {
    firebase
      .firestore()
      .collection("users")
      .doc(state.userId)
      .set({
        ...userData,
      })
      .then(() => {
        commit("registerUser", userData);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  fetchUserData({ commit }, userId) {
    firebase
      .firestore()
      .collection("users")
      .doc(userId)
      .get()
      .then((doc) => commit("fetchUserData", doc.data()))
      .catch((err) => console.log(err));
  },
  autoSignIn({ commit, dispatch }) {
    firebase.auth().onAuthStateChanged((user) => {
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
