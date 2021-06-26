<template>
  <div class="container d-flex flex-nowrap border rounded p-3 mt-5">
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
          <b-card-title class="title" @click="transfer(post.postId)">{{
            post.title
          }}</b-card-title>
        </b-card-body>
      </b-card>
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
.container {
  overflow-x: scroll;
}
.holder {
  min-width: 10%;
  max-width: 30%;
}
.title:hover {
  cursor: pointer;
  color: lightseagreen;
}
</style>
