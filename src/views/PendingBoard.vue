<template>
  <div class="container">
    <h1>Pending Board</h1>
    <div class="post-box">
      <div
        class="post-holder"
        v-for="(post, index) in posts"
        @click="transfer(post.postId)"
        :key="index"
      >
        <p class="title">{{ post.title }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    transfer(postId) {
      this.$router.push({ name: "translate", params: { postId } });
    },
  },
  computed: {
    posts() {
      return this.$store.state.post.posts;
    },
  },
  created() {
    this.$store.dispatch("getPendingPosts");
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.post-box {
  width: 80%;
  min-height: 300px;
  padding: 30px;
  border: 2px solid darkgrey;
  border-radius: 10px;
}
.post-holder {
  border: 1px solid darkgray;
  border-radius: 5px;
}
</style>
