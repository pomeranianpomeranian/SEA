<template>
  <div>
    <h1>This is {{ userDetails.username }}'s Page!</h1>
    <router-link :to="{ name: 'newpost' }">NewPost</router-link>
    <p>
      ここはユーザーのマイページで、サインインすると表示される。ここから新しい投稿をするのと、自分の過去の投稿を見れる。
    </p>
    <myPosts></myPosts>
  </div>
</template>

<script>
import firebase from "firebase";
import router from "../router";
import myPosts from "../components/MyPosts";
export default {
  components: {
    myPosts,
  },
  computed: {
    userDetails() {
      return this.$store.state.auth.userDetails;
    },
  },
  beforeRouteEnter(to, from, next) {
    if (!firebase.auth().currentUser) {
      router.push({ name: "home" });
    } else if (firebase.auth().currentUser.uid === to.params.userId) {
      return next();
    } else {
      alert("You are not allowed to visit this page!");
    }
  },
};
</script>
