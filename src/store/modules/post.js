import firebase from "firebase";
import router from "../../router";
// import heic2any from "heic2any";

const postRef = firebase.firestore().collection("posts");
const userRef = firebase.firestore().collection("users");
const storage = firebase.storage();

const heicDetector = function (path) {
  if (path.split("").reverse().slice(0, 4).reverse().join("") === "heic")
    return true;
  else return false;
};

const state = {
  comments: [],
  posts: [],
  postContents: null,
  suggestions: [],
};

const mutations = {
  clearContents(state) {
    return (state.postContents = {
      title: "",
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
    if (this.state.auth.userDetails) {
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
    } else {
      posts.forEach((post) => {
        state.posts.push({
          postId: post.id,
          ...post.data(),
        });
      });
    }
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
  getDetails({ state, dispatch }, postId) {
    state.postContents = null;
    postRef
      .doc(postId)
      .get()
      .then((post) => {
        state.postContents = {
          ...post.data(),
        };
        dispatch("getSuggestions", postId);
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
        // if (heicDetector(path)) dispatch("heicConverter", { url, path });
        state.postContents.imagesRef.push({ url, path });
      });
  },
  getMyPosts({ commit, state, rootState }, pending) {
    state.posts = [];
    postRef
      .where("pending", "==", pending)
      .where("userId", "==", rootState.auth.userId)
      .orderBy("createdAt", "desc")
      .get()
      .then((posts) => commit("registerPosts", posts));
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
  getPendingPosts({ commit, state }) {
    state.posts = [];
    postRef
      .where("pending", "==", true)
      .orderBy("createdAt", "desc")
      .get()
      .then((posts) => {
        commit("registerPosts", posts);
      });
  },
  getSuggestions({ state }, postId) {
    state.suggestions = [];
    postRef
      .doc(postId)
      .collection("suggestions")
      .get()
      .then((suggestions) => {
        suggestions.forEach((suggestion) => {
          state.suggestions.push({
            ...suggestion.data(),
          });
        });
      });
  },
  //   heicConverter({ state }, file) {
  //     fetch(file.url)
  //       .then((res) => res.blob())
  //       .then((blob) => {
  //         heic2any({
  //           blob,
  //           toType: "image/jpag",
  //         });
  //       })
  //       .then((res) => {
  //         const url = URL.createObjectURL(res);
  //         console.log(url);
  //         state.postContents.imagesRef.filter(
  //           (ref) => ref.path === file.path
  //         ).url = url;
  //       })
  //       .catch((err) => console.log(err));
  //   },
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
      postRef
        .where("pending", "==", false)
        .get()
        .then((posts) => commit("registerPosts", posts));
    } else {
      postRef
        .where("pending", "==", false)
        .where("categories", "array-contains", category)
        .get()
        .then((posts) => commit("registerPosts", posts));
    }
  },
  sendSuggestion({ rootState }, suggestion) {
    postRef
      .doc(suggestion.postId)
      .collection("suggestions")
      .add({
        title: suggestion.title,
        description: suggestion.description,
        name: rootState.auth.userDetails.username,
      })
      .then(() => {
        postRef.doc(suggestion.postId).update({
          numSuggestions: firebase.firestore.FieldValue.increment(1),
        });
      })
      .then(() => {
        router.push({ name: "pend" });
      });
  },
  storeImage({ dispatch, rootState }, event) {
    const file = event.target.files[0];
    const path = `${rootState.auth.userId}/${file.name}`;
    if (heicDetector(path))
      alert(
        "Invalid file format. Make sure the format is 'jpg', 'jpeg' or 'png'"
      );
    else {
      storage
        .ref(path)
        .put(file)
        .then(() => {
          dispatch("getImageURL", path);
        });
    }
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
  submitPost({ commit, state, rootState }, pending) {
    postRef
      .add({
        ...state.postContents,
        userId: rootState.auth.userId,
        createdAt: firebase.firestore.Timestamp.now(),
        pending,
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
  updatePost({ commit, state, rootState }, postId) {
    postRef
      .doc(postId)
      .set({
        ...state.postContents,
        userId: rootState.auth.userId,
        createdAt: firebase.firestore.Timestamp.now(),
        pending: false,
      })
      .then(() => {
        commit("transfer", {
          userId: rootState.auth.userId,
          postId,
        });
      });
  },
};

export default {
  state,
  mutations,
  actions,
};
