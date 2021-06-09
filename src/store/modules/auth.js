import firebase from "firebase";
import router from "../../router";

const state = {
  userId: null,
  userData: null,
  idToken: null,
};
const mutations = {
  signIn(state, userCredential) {
    state.userId = userCredential.user.uid;
  },
  signUp(state, userCredential) {
    state.userId = userCredential.user.uid;
    router.push({ name: "user", params: { userId: state.userId } });
  },
  signOut(state) {
    state.userId = null;
    alert("See you soon!");
    router.push({ name: "home" });
  },
  registerUser(state, userData) {
    state.userData = userData;
    router.push({ name: "user", params: { userId: state.userId } });
    alert(`Welcome ${userData.username}!!`);
  },
  fetchUserData(state, userData) {
    state.userData = userData;
    router.push({ name: "user", params: { userId: state.userId } });
    alert(`Welcome back ${userData.username}!!`);
  },
  storeIdToken(state, idToken) {
    state.idToken = idToken;
    localStorage.setItem("idToken", idToken);
  },
};
const actions = {
  signIn({ commit, dispatch }, userData) {
    firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(() => {
        firebase
          .auth()
          .signInWithEmailAndPassword(userData.email, userData.password)
          .then((userCredential) => {
            commit("signIn", userCredential);
          })
          .then(() => dispatch("fetchUserData"))
          //   .then(() => dispatch("storeIdToken"))
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
  fetchUserData({ commit, state }) {
    firebase
      .firestore()
      .collection("users")
      .doc(state.userId)
      .get()
      .then((doc) => commit("fetchUserData", doc.data()))
      .catch((err) => console.log(err));
  },
  //   storeIdToken({ commit }) {
  //     firebase
  //       .auth()
  //       .currentUser.getIdToken(true)
  //       .then((idToken) => {
  //         commit("storeIdToken", idToken);
  //       })
  //       .catch((err) => console.log(err));
  //   },
  //   autoSignIn() {
  //     const idToken = localStorage.getItem("idToken");
  //     if (idToken) {
  //       firebase
  //         .auth()
  //         .signInWithCustomToken(idToken)
  //         .then((res) => {
  //           console.log(res);
  //         })
  //         .catch((err) => console.log(err));
  //     }
  //   },
};

export default {
  state,
  mutations,
  actions,
};
