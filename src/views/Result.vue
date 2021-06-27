<template>
  <div class="results-container">
    <div
      class="card mb-3"
      v-for="(post, index) in results"
      :key="index"
      style="max-width: 540px"
    >
      <div class="row g-0">
        <div class="col-md-4">
          <img :src="post.imagesRef[0].url" alt="" width="100%" height="100%" />
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">
              <router-link
                class="title"
                :to="{ name: 'details', params: { postId: post.postId } }"
                >{{ post.title }}</router-link
              >
            </h5>
            <p class="card-text">{{ post.description }}</p>
            <p class="card-text">
              <small class="text-muted">Last updated 3 mins ago</small>
            </p>
            <div class="fav">
              <div
                class="like"
                :class="{ liked: post.isLiked }"
                @click="updateLike(index)"
              >
                <span>{{ post.numLike }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--<div class="post-frame" v-for="(post, index) in results" :key="index">
      <div class="image-holder">
        <img :src="post.imagesRef[0].url" />
      </div>
      <div class="description">
        <div>
          <router-link
            class="title"
            :to="{ name: 'details', params: { postId: post.postId } }"
            >{{ post.title }}</router-link
          >
        </div>
        <span>{{ post.date }}</span>
        <p>{{ post.description }}</p>
        <div class="fav">
          <div
            class="like"
            :class="{ liked: post.isLiked }"
            @click="updateLike(index)"
          >
            <span>{{ post.numLike }}</span>
          </div>
        </div>
      </div>
    </div>-->
  </div>
</template>

<script>
export default {
  props: ["category"],
  methods: {
    updateLike(index) {
      if (this.userId) this.$store.dispatch("updateLike", index);
    },
  },
  computed: {
    userId() {
      return this.$store.state.auth.userId;
    },
    results() {
      return this.$store.state.post.posts;
    },
  },
  created() {
    this.$store.dispatch("searchPosts", this.category);
  },
  destroyed() {
    this.$store.dispatch("fetchUserData", this.userId);
  },
};
</script>

<style scoped>
.results-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.post-frame {
  display: flex;
  padding: 5px;
  border: 1px solid lightslategrey;
  width: 90%;
  height: 200px;
}
.image-holder {
  width: 40%;
  margin-right: 5px;
}
img {
  width: 100%;
  height: 100%;
}
.description {
  width: 60%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.title {
  font-weight: bold;
  font-size: 20px;
}
.fav {
  display: flex;
  justify-content: flex-end;
}
.like {
  width: 20px;
  height: 20px;
  border: 1px solid gray;
  border-radius: 50%;
}
.liked {
  background-color: red;
}
</style>
