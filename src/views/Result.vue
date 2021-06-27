<template>
  <div class="container d-flex flex-column align-items-center mt-3">
    <div
      class="card mb-3"
      v-for="(post, index) in results"
      :key="index"
      style="width: 80%"
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
          <div class="card-body d-flex flex-column justify-content-between">
            <div>
              <router-link
                class="title"
                :to="{ name: 'details', params: { postId: post.postId } }"
                >{{ post.title }}</router-link
              >
            </div>
            <p class="card-text pr-5">{{ post.description }}</p>
            <div>
              <span
                class="badge bg-info text-light"
                v-for="(category, index) in post.categories"
                :key="index"
              >
                {{ category }}
              </span>
            </div>
            <div class="d-flex justify-content-between h5 mb-0">
              <div>
                <span class="text-muted">{{ post.date }}</span>
              </div>
              <div>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
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
.card-body {
  height: 100%;
}
.card-text {
  font-size: 1.2rem;
}
.badge {
  font-size: 1rem;
  margin-right: 0.5rem;
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
  font-size: 2rem;
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
