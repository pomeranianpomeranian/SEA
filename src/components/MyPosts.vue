<template>
  <div class="container d-flex flex-nowrap border rounded p-3 mt-5">
    <div class="holder px-2" v-for="(post, index) in myPosts" :key="index">
      <b-card
        @click="transfer(index)"
        :title="post.title"
        :img-src="post.imagesRef[0].url"
        img-alt="Image"
        img-top
      >
      </b-card>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    transfer(index) {
      const postId = this.myPosts[index].postId;
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
  min-width: 30%;
}
</style>
