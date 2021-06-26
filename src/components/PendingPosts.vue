<template>
  <div class="container d-flex flex-nowrap border rounded p-3 mt-5">
    <div class="holder px-2" v-for="(post, index) in posts" :key="index">
      <b-card :img-src="post.imagesRef[0].url" img-alt="Image" img-top>
        <template v-if="post.numSuggestions" #header>
          <p class="text-center mt-1 mb-0 p-1 bg-danger text-light">
            翻訳案が {{ post.numSuggestions }} 件届いています
          </p>
        </template>
        <template v-else #header>
          <p class="text-center">翻訳案は届いていません</p>
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
    transfer(postId) {
      this.$router.push({
        name: "edit",
        params: { postId },
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
