<template>
  <div class="page-outline">
    <navbar />
    <div class="container p-3">
      <div class="categories">
        <b-button
          v-for="(category, index) in categories"
          :key="index"
          v-b-popover.hover.top="$t(`category.${category.value}`)"
          variant="outline-info"
          @click="changeCategory(category.value)"
        >
          <img :src="category.icon" width="50rem" height="50rem" />
        </b-button>
      </div>
      <!-- <h1>{{ categoryDesplay }}</h1> -->
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
  </div>
</template>

<script>
import navbar from "../components/Navbar.vue";
export default {
  components: {
    navbar,
  },
  data() {
    return {
      selectedCategory: "all",
    };
  },
  methods: {
    transfer(postId) {
      this.$router.push({
        name: "details",
        params: { postId },
      });
    },
    changeCategory(category) {
      this.selectedCategory = category;
      this.$store.dispatch("searchPosts", category);
    },
  },
  computed: {
    posts() {
      return this.$store.state.post.posts;
    },
    userId() {
      return this.$store.state.auth.userId;
    },
    categoryDesplay() {
      return this.$t(`category.${this.selectedCategory}`);
    },
    categories() {
      return this.$store.state.category.categories;
    },
  },
  created() {
    this.$store.dispatch("searchPosts", "all");
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
