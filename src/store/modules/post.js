import firebase from "firebase";
import router from "../../router";

const postRef = firebase.firestore().collection("posts");
const userRef = firebase.firestore().collection("users");
const storage = firebase.storage();

const state = {
  comments: [],
  posts: [],
  postContents: null,
};

const mutations = {
  clearContents(state) {
    return (state.postContents = {
      title: "",
      address: "",
      categories: [],
      imagesRef: [],
      description: "",
    });
  },
  registerComment(state, comment) {
    const timestamp = comment.createdAt.toDate();
    state.comments.push({
      username: comment.username,
      comment: comment.comment,
      date: `${timestamp.getFullYear()}/${
        timestamp.getMonth() + 1
      }/${timestamp.getDate()}`,
    });
  },
  registerPosts(state, posts) {
    const likedPosts = this.state.auth.userDetails.likedPosts;
    posts.forEach((post) => {
      if (likedPosts.includes(post.id)) {
        state.posts.push({
          postId: post.id,
          isLiked: true,
          ...post.data(),
        });
      } else {
        state.posts.push({
          postId: post.id,
          isLiked: false,
          ...post.data(),
        });
      }
    });
  },
  transfer(state, path) {
    state.postContents = null;
    router.push({
      name: "mypost",
      params: { ...path },
    });
  },
};

const actions = {
  addLike({ state, rootState }, index) {
    const target = state.posts[index];
    userRef
      .doc(rootState.auth.userId)
      .update({
        likedPosts: firebase.firestore.FieldValue.arrayUnion(target.postId),
      })
      .then(() => {
        target.isLiked = true;
      });
  },
  deleteFiles({ dispatch, state }, postId) {
    const files = state.postContents.imagesRef;
    for (let i = 0; i <= files.length - 1; i++) {
      storage
        .ref(files[i].path)
        .delete()
        .then(() => {
          if (i === files.length - 1) {
            dispatch("deletePost", postId);
          }
        });
    }
  },
  deleteImage({ state }, index) {
    storage
      .ref(state.postContents.imagesRef[index].path)
      .delete()
      .then(() => {
        state.postContents.imagesRef.splice(index, 1);
      });
  },
  deletePost({ rootState }, postId) {
    postRef
      .doc(postId)
      .delete()
      .then(() => {
        router.push({
          name: "user",
          params: { userId: rootState.auth.userId },
        });
      });
  },
  getOkiniiriList({ dispatch, rootState }) {
    userRef
      .doc(rootState.auth.userId)
      .get()
      .then((user) => {
        dispatch("getOkiniiriPosts", user.data().likedPosts);
      });
  },
  getOkiniiriPosts({ commit, state }, list) {
    state.posts = [];
    const posts = [];
    for (let i = 0; i <= list.length - 1; i++) {
      postRef
        .doc(list[i])
        .get()
        .then((post) => {
          posts.push(post);
          if (posts.length === list.length) {
            commit("registerPosts", posts);
          }
        });
    }
  },
  getComments({ commit, state }, postId) {
    state.comments = [];
    postRef
      .doc(postId)
      .collection("comments")
      .orderBy("createdAt")
      .get()
      .then((comments) =>
        comments.forEach((comment) => {
          commit("registerComment", comment.data());
        })
      );
  },
  getDetails({ state }, postId) {
    state.postContents = null;
    postRef
      .doc(postId)
      .get()
      .then((post) => {
        state.postContents = {
          ...post.data(),
        };
      });
  },
  getImageURL({ state }, path) {
    if (!state.postContents) {
      state.postContents = { imagesRef: [] };
    }
    storage
      .ref(path)
      .getDownloadURL()
      .then((url) => {
        state.postContents.imagesRef.push({ url, path });
      });
  },
  getMyPosts({ commit, state, rootState }) {
    state.posts = [];
    postRef
      .where("userId", "==", rootState.auth.userId)
      .orderBy("createdAt", "desc")
      .get()
      .then((posts) => commit("registerPosts", posts));
  },
  removeLike({ state, rootState }, index) {
    const target = state.posts[index];
    userRef
      .doc(rootState.auth.userId)
      .update({
        likedPosts: firebase.firestore.FieldValue.arrayRemove(target.postId),
      })
      .then(() => {
        target.isLiked = false;
      });
  },
  searchPosts({ commit, state }, category) {
    state.posts = [];
    if (category === "all") {
      postRef.get().then((posts) => commit("registerPosts", posts));
    } else {
      postRef
        .where("categories", "array-contains", category)
        .get()
        .then((posts) => commit("registerPosts", posts));
    }
  },
  storeImage({ dispatch, rootState }, event) {
    const file = event.target.files[0];
    const path = `${rootState.auth.userId}/${file.name}`;
    storage
      .ref(path)
      .put(file)
      .then(() => {
        dispatch("getImageURL", path);
      });
  },
  submitComments({ commit, rootState }, contents) {
    const newComment = {
      username: rootState.auth.userDetails.username,
      comment: contents.comment,
      createdAt: firebase.firestore.Timestamp.now(),
    };
    postRef
      .doc(contents.postId)
      .collection("comments")
      .add(newComment)
      .then(() => {
        commit("registerComment", newComment);
      });
  },
  submitPost({ commit, rootState }, postContents) {
    postRef
      .add({
        ...postContents,
        userId: rootState.auth.userId,
        createdAt: firebase.firestore.Timestamp.now(),
      })
      .then((res) => {
        commit("transfer", {
          userId: rootState.auth.userId,
          postId: res.id,
        });
      });
  },
  updateLike({ dispatch, state }, index) {
    const target = postRef.doc(state.posts[index].postId);
    if (!state.posts[index].isLiked) {
      target
        .update({
          numLike: firebase.firestore.FieldValue.increment(1),
        })
        .then(() => {
          dispatch("addLike", index);
        });
    } else {
      target
        .update({
          numLike: firebase.firestore.FieldValue.increment(-1),
        })
        .then(() => {
          dispatch("removeLike", index);
        });
    }
  },
  updatePost({ commit, rootState }, request) {
    postRef
      .doc(request.postId)
      .set({
        ...request.postContents,
        userId: rootState.auth.userId,
        createdAt: firebase.firestore.Timestamp.now(),
      })
      .then(() => {
        commit("transfer", {
          userId: rootState.auth.userId,
          postId: request.postId,
        });
      });
  },
};

export default {
  state,
  mutations,
  actions,
};
