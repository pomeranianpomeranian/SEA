<template>
  <div>
    <navbar />
    <div class="container top">
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
            <b-card-body
              class="card-body container"
              :title="postContents.title"
            >
              <div>
                <b-card-text>
                  {{ postContents.description }}
                </b-card-text>
              </div>
              <div>
                <span
                  class="badge bg-info text-light"
                  v-for="(category, index) in postContents.categories"
                  :key="index"
                  >#{{ category }}</span
                >
              </div>
              <div>
                <comment :postId="postId"></comment>
              </div>
              <div>
                <b-button class="col-6" variant="outline-info" @click="edit">{{
                  $t("nav.edit")
                }}</b-button>
                <b-button
                  class="col-6"
                  variant="outline-danger"
                  @click="deleteFiles"
                  >{{ $t("nav.delete") }}</b-button
                >
              </div>
            </b-card-body>
          </b-col>
        </b-row>
        <template #footer>
          <p class="footer mb-0 text-muted">Last updated : {{ date }}</p>
        </template>
      </b-card>
    </div>
  </div>
</template>
<script>
import navbar from "../components/Navbar.vue";
import comment from "../components/Comment.vue";
export default {
  props: ["postId"],
  components: {
    navbar,
    comment,
  },
  methods: {
    edit() {
      this.$router.push({
        name: "edit",
        params: { userId: this.userId, postId: this.postId },
      });
    },
    deleteFiles() {
      if (confirm("Are you sure?")) {
        this.$store.dispatch("deleteFiles", this.postId);
      }
    },
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
  destroyed() {
    this.$store.commit("clearContents");
  },
};
</script>

<style scoped>
.images-container {
  width: 100%;
  overflow-x: scroll;
}
.badge {
  font-size: 1rem;
  margin-right: 0.5rem;
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
