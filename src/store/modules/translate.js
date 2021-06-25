import firebase from "firebase";
// import router from "../../router";

const pendRef = firebase.firestore().collection("pendingPosts");

const state = {
  posts: [],
  postContents: null,
};

const mutations = {
  storePosts(state, posts) {
    state.posts = [];
    posts.forEach((post) => {
      state.posts.push({
        ...post.data(),
        postId: post.id,
      });
    });
  },
};

const actions = {
  getClientPost({ state }, postId) {
    pendRef
      .doc(postId)
      .get()
      .then((post) => {
        state.postContents = {
          ...post.data(),
        };
      });
  },
  //   getMyPendingPosts({ commit, rootState }) {
  //     pendRef
  //       .where("userId", "==", rootState.auth.userId)
  //       .get()
  //       .then((posts) => {
  //         commit("storePosts", posts);
  //       });
  //   },
  //   getPendingPosts({ commit }) {
  //     pendRef
  //       .orderBy("createdAt", "desc")
  //       .get()
  //       .then((posts) => commit("storePosts", posts));
  //   },
  //   savePost({ rootState }) {
  //     pendRef
  //       .add({
  //         ...rootState.post.postContents,
  //         userId: rootState.auth.userId,
  //         createdAt: firebase.firestore.Timestamp.now(),
  //       })
  //       .then(() => {
  //         router.push({
  //           name: "user",
  //           params: { userId: rootState.auth.userId },
  //         });
  //       });
  //   },
  //   sendSuggestion({ rootState }, suggestion) {
  //     pendRef
  //       .doc(suggestion.postId)
  //       .collection("suggestions")
  //       .add({
  //         title: suggestion.title,
  //         description: suggestion.description,
  //         name: rootState.auth.userDetails.username,
  //       })
  //       .then(() => {
  //         router.push({ name: "pend" });
  //       });
  //   },
};

export default {
  state,
  mutations,
  actions,
};
