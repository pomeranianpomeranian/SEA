<template>
  <div class="container mt-5">
    <b-card no-body class="overflow-hidden">
      <b-row no-gutters>
        <b-col cols="4">
          <div class="images-container d-flex p-3">
            <b-card-img
              class="img-thumbnail"
              v-for="(image, index) in postContents.imagesRef"
              :key="index"
              :src="image.url"
            ></b-card-img>
          </div>
        </b-col>
        <b-col cols="8">
          <b-card-body class="card-body container" :title="postContents.title">
            <div>
              <b-card-text>
                {{ postContents.description }}
              </b-card-text>
            </div>
            <div>
              <span
                v-for="(category, index) in postContents.categories"
                :key="index"
                >#{{ $t(`category.${category}`) }}</span
              >
            </div>
            <div>
              <comment :postId="postId"></comment>
            </div>
          </b-card-body>
        </b-col>
      </b-row>
      <template #footer>
        <p class="footer mb-0 text-muted">Last updated : {{ date }}</p>
      </template>
    </b-card>
  </div>
</template>

<script>
import comment from "../components/Comment";
export default {
  props: ["postId"],
  components: {
    comment,
  },
  computed: {
    userId() {
      return this.$store.state.auth.userId;
    },
    postContents() {
      return this.$store.state.post.postContents;
    },
    date() {
      const timestamp = this.postContents.createdAt.toDate();
      return `${timestamp.getFullYear()}/${
        timestamp.getMonth() + 1
      }/${timestamp.getDate()}`;
    },
  },
  created() {
    this.$store.dispatch("getDetails", this.postId);
  },
};
</script>

<style scoped>
.images-container {
  width: 100%;
  overflow-x: scroll;
}
.card-body {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.footer {
  text-align: end;
}
</style>
