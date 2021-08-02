import firebase from "firebase";
import router from "../../router";
import i18n from "../../i18n";

const authRef = firebase.auth();
const userRef = firebase.firestore().collection("users");
const storage = firebase.storage();

const state = {
  userId: null,
  userDetails: null,
};

const mutations = {
  registerUser(state, userDetails) {
    state.userDetails = userDetails;
    router.push({ name: "user", params: { userId: state.userId } });
  },
  setLang(state) {
    i18n.locale = state.userDetails.language;
  },
  signIn(state, userId) {
    state.userId = userId;
    router.push({ name: "user", params: { userId: state.userId } });
  },
  // autoSignIn(state, userId) {
  //   state.userId = userId;
  // },
  signOut(state) {
    state.userId = null;
    state.userDetails = null;
    router.push({ name: "home" });
  },
  signUp(state, userCredential) {
    state.userId = userCredential.user.uid;
  },
  // fetchUserData(state, userData) {
  //   state.userDetails = userData;
  // },
};

const actions = {
  autoSignIn({ state, dispatch }) {
    authRef.onAuthStateChanged((user) => {
      if (user) {
        // commit("autoSignIn", user.uid);
        state.userId = user.uid;
        dispatch("fetchUserData", user.uid);
      }
    });
  },
  changeAvatar({ state, dispatch }, event) {
    const avatar = event.target.files[0];
    const path = `${state.userId}/avatar`;
    if (!state.userDetails.avatar) {
      storage
        .ref(path)
        .put(avatar)
        .then(() => {
          dispatch("getAvatarURL", path);
        });
    } else {
      storage
        .ref(path)
        .delete()
        .then(() => {
          storage
            .ref(path)
            .put(avatar)
            .then(() => {
              dispatch("getAvatarURL", path);
            });
        });
    }
  },
  fetchUserData({ state, commit }, userId) {
    userRef
      .doc(userId)
      .get()
      .then((doc) => {
        // commit("fetchUserData", doc.data());
        state.userDetails = doc.data();
        commit("setLang");
      });
  },
  getAvatarURL({ state }, path) {
    storage
      .ref(path)
      .getDownloadURL()
      .then((url) => {
        state.userDetails.avatar = url;
        userRef.doc(state.userId).update({
          avatar: url,
        });
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
  signOut({ commit }) {
    authRef.signOut().then(() => {
      commit("signOut");
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
};

export default {
  state,
  mutations,
  actions,
};
