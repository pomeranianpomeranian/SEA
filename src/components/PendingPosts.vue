<template>
  <div>
    <div class="pending-posts">
      <div class="card-container">
        <div
          class="card"
          v-for="(post, index) in posts"
          :key="index"
          @click="transfer(index)"
        >
          <div class="notification" v-if="post.numSuggestions">
            {{ post.numSuggestions }}
          </div>
          <div class="image">
            <img :src="post.imagesRef[0].url" />
          </div>
          <h3>{{ post.title }}</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    transfer(index) {
      this.$router.push({
        name: "edit",
        params: { postId: this.posts[index].postId },
      });
    },
  },
  computed: {
    posts() {
      return this.$store.state.post.posts;
    },
  },
  created() {
    this.$store.dispatch("getMyPosts", true);
  },
};
</script>

<style scoped>
.pending-posts {
  border: 3px solid darkgray;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5px;
}
.card-container {
  display: flex;
  flex-wrap: wrap;
  width: 80%;
}
.card {
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  width: 30%;
  margin: 5px;
}
.notification {
  background-color: red;
  color: white;
}
.image {
  height: 250px;
}
img {
  width: 100%;
  height: 100%;
}
</style>
