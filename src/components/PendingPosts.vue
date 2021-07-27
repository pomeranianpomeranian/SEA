<template>
  <!-- <div class="container d-flex flex-nowrap p-3">
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
          <b-icon
            class="icon"
            icon="exclamation"
            v-if="post.numSuggestions"
          ></b-icon>
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
/* .container {
  overflow-x: scroll;
}
.holder {
  min-width: 20%;
  max-width: 30%;
}
.title:hover {
  cursor: pointer;
  color: lightseagreen;
} */
.holder {
  padding: 0;
  margin: auto;
  border-radius: 8px;
  background-color: white;
  position: relative;
  transition-property: box-shadow, transform;
  transition-duration: 200ms;
  transition-timing-function: ease-out;
}
.holder:hover {
  cursor: pointer;
  box-shadow: 0 15px 30px rgba(26, 49, 88, 0.15);
  transform: translateY(-2px);
}
.icon {
  font-size: 50px;
  position: absolute;
  top: -10px;
  right: -10px;
  background-color: rgb(255, 205, 79);
  border-radius: 50%;
}
.thumbnail-img {
  height: 300px;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: 8px 8px 0 0;
}
.card-content {
  font-family: "Noto Serif", serif;
  font-weight: 400;
  padding: 15px 0;
  text-align: center;
}
</style>
