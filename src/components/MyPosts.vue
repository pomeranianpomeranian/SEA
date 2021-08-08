<template>
  <div class="container p-3">
    <div class="row">
      <div class="col-4 mb-5" v-for="(post, index) in myPosts" :key="index">
        <div class="holder" @click="transfer(post.postId)">
          <div
            class="thumbnail-img"
            :style="{
              'background-image': 'url(' + post.imagesRef[0].url + ')',
            }"
          ></div>
          <div class="card-content">
            <h4>{{ post.title }}</h4>
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
.holder {
  padding: 0;
  margin: auto;
  border-radius: 8px;
  overflow: hidden;
  background-color: white;
  transition-property: box-shadow, transform;
  transition-duration: 200ms;
  transition-timing-function: ease-out;
}
.holder:hover {
  cursor: pointer;
  box-shadow: 0 15px 30px rgba(26, 49, 88, 0.15);
  transform: translateY(-2px);
}
.thumbnail-img {
  height: 300px;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}
.card-content {
  font-family: "Noto Serif", serif;
  font-weight: 400;
  padding: 15px 0;
  text-align: center;
}
</style>
