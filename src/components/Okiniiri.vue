<template>
  <!-- <div class="container d-flex flex-nowrap p-3">
    <div class="holder px-2" v-for="(post, index) in posts" :key="index">
      <b-card :img-src="post.imagesRef[0].url" img-alt="Image" img-top>
        <template #header>
          <b-icon
            icon="heart-fill"
            v-if="post.isLiked"
            variant="danger"
            @click="updateLike(index)"
          ></b-icon>
          <b-icon
            icon="heart"
            v-if="!post.isLiked"
            @click="updateLike(index)"
          ></b-icon>
        </template>

        <b-card-body class="m-0 p-0">
          <b-card-title
            class="title text-center"
            @click="transfer(post.postId)"
            >{{ post.title }}</b-card-title
          >
        </b-card-body>
      </b-card>
    </div>
  </div> -->
  <div class="container p-3">
    <div class="row">
      <div class="col-4 mb-5" v-for="(post, index) in posts" :key="index">
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
    updateLike(index) {
      this.$store.dispatch("updateLike", index);
    },
    transfer(postId) {
      this.$router.push({ name: "details", params: { postId } });
    },
  },
  computed: {
    userId() {
      return this.$store.state.auth.userId;
    },
    posts() {
      return this.$store.state.post.posts;
    },
  },
  created() {
    this.$store.dispatch("getOkiniiriList");
  },
  destroyed() {
    this.$store.dispatch("fetchUserData", this.userId);
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
