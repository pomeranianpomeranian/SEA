<template>
  <div class="container">
    <h1>Pending Board</h1>
    <div
      class="card mb-3"
      v-for="(post, index) in posts"
      @click="transfer(post.postId)"
      :key="index"
      style="max-width: 540px"
    >
      <div class="row g-0">
        <div class="col-md-4">
          <img :src="post.imagesRef[0].url" alt="" width="100%" height="100%" />
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">{{ post.title }}</h5>
            <p class="card-text">{{ post.description }}</p>
            <p class="card-text">
              <small class="text-muted">Last updated 3 mins ago</small>
            </p>
          </div>
        </div>
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
