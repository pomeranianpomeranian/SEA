<template>
  <div>
    <h1>This is {{ userId }}'s Page!</h1>
    <router-link :to="{ name: 'newpost' }">NewPost</router-link>
    |
    <router-link :to="{ name: 'mypost', params: { postId: 'fav_snack' } }"
      >Post</router-link
    >
    <p>
      ここはユーザーのマイページで、サインインすると表示される。ここから新しい投稿をするのと、自分の過去の投稿を見れる。
    </p>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  props: ["userId"],
  beforeRouteEnter(to, from, next) {
    if (firebase.auth().currentUser.uid === to.params.userId) {
      return next();
    } else {
      alert("You are not allowed to visit this page!");
    }
  },
};
</script>
