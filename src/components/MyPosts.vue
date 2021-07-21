<template>
  <div class="container d-flex flex-nowrap p-3">
    <div class="holder px-2" v-for="(post, index) in myPosts" :key="index">
      <b-card :img-src="post.imagesRef[0].url" img-alt="Image" img-top>
        <b-card-body class="m-0 p-0">
          <b-card-title
            class="title text-center"
            @click="transfer(post.postId)"
            >{{ post.title }}</b-card-title
          >
        </b-card-body>
      </b-card>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    transfer(postId) {
      this.$router.push({
        name: "mypost",
        params: { userId: this.userId, postId },
      });
    },
  },
  computed: {
    myPosts() {
      return this.$store.state.post.posts;
    },
    userId() {
      return this.$store.state.auth.userId;
    },
  },
  created() {
    this.$store.dispatch("getMyPosts", false);
  },
};
</script>

<style scoped>
.container {
  overflow-x: scroll;
}
.holder {
  min-width: 20%;
  max-width: 30%;
}
.title:hover {
  cursor: pointer;
  color: lightseagreen;
}
</style>
