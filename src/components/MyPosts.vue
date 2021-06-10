<template>
  <div>
    <button @click="getMyPosts">get my posts</button>
    <div>
      <div v-for="(post, index) in myposts" :key="index">
        {{ post.title }}:
        <img :src="post.imagesRef[0]" />
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  data() {
    return {
      myposts: [],
    };
  },
  methods: {
    getMyPosts() {
      firebase
        .firestore()
        .collection("users")
        .doc(this.userId)
        .collection("myposts")
        .get()
        .then((posts) => {
          posts.forEach((doc) => {
            this.myposts.push(doc.data());
          });
        });
    },
  },
  computed: {
    userId() {
      return this.$store.state.auth.userId;
    },
  },
};
</script>
