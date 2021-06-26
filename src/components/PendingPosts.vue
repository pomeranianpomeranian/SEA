<template>
  <div class="container d-flex flex-nowrap border rounded p-3 mt-5">
    <div class="holder px-2" v-for="(post, index) in posts" :key="index">
      <b-card
        @click="transfer(index)"
        :title="post.title"
        :img-src="post.imagesRef[0].url"
        img-alt="Image"
        img-top
      >
        <template v-if="post.numSuggestions" #header>
          <p class="text-center mt-1 mb-0 p-1 bg-danger text-light">
            翻訳案が {{ post.numSuggestions }} 件届いています
          </p>
        </template>
        <template v-else #header>
          <p class="text-center">翻訳案は届いていません</p>
        </template>
      </b-card>
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
.container {
  overflow-x: scroll;
}
.holder {
  min-width: 20%;
  max-width: 30%;
}
</style>
