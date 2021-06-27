<template>
  <div class="container mt-5">
    <h2 class="text-center mb-5">{{ $t("title.pendboard") }}</h2>
    <div
      class="card my-3 col-8 offset-2"
      v-for="(post, index) in posts"
      @click="transfer(post.postId)"
      :key="index"
    >
      <div class="row g-0">
        <div class="col-md-4">
          <img
            class="img-thumbnail"
            :src="post.imagesRef[0].url"
            alt=""
            width="100%"
            height="100%"
          />
        </div>
        <div class="col-md-8">
          <div class="card-body d-flex flex-column justify-content-around">
            <h4 class="card-title">{{ post.title }}</h4>
            <p class="card-text">{{ post.description }}</p>
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
.card:hover {
  cursor: pointer;
}
.card-body {
  height: 100%;
}
.card-text {
  font-size: 1.2rem;
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
