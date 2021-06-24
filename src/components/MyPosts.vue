<template>
  <div>
    <div class="my-posts">
      <div class="card-container">
        <div
          class="card"
          v-for="(post, index) in myPosts"
          :key="index"
          @click="transfer(index)"
        >
          <div class="image">
            <img :src="post.imagesRef[0].url" />
          </div>
          <h3>{{ post.title }}</h3>
          <div>{{ post.position }}</div>
        </div>
      </div>
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
.my-posts {
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
.image {
  height: 250px;
}
img {
  width: 100%;
  height: 100%;
}
</style>
