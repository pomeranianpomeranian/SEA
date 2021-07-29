<template>
  <div class="page-outline">
    <navbar />
    <b-container class="top">
      <b-row>
        <b-col class="p-0" cols="6">
          <b-carousel class="slide-show" :interval="4000" controls indicators>
            <b-carousel-slide
              v-for="(image, index) in postContents.imagesRef"
              :key="index"
              :caption="image.caption"
            >
              <template #img>
                <div
                  class="slide-img d-block img-fluid w-100"
                  :style="{
                    'background-image': 'url(' + image.url + ')',
                  }"
                ></div>
              </template>
            </b-carousel-slide>
          </b-carousel>
        </b-col>

        <b-col class="post-content p-5" cols="6" offset="">
          <div>
            <h1 class="en-head">{{ postContents.title }}</h1>
            <!--make each category an icon later-->
            <span
              v-for="(category, index) in postContents.categories"
              :key="index"
            >
              {{ category }}
            </span>
            <p class="mt-5">{{ postContents.description }}</p>
          </div>
          <div>
            <comment :postId="postId" />
            <div class="mt-2">
              <b-button class="col-6" variant="outline-warning" @click="edit">{{
                $t("nav.edit")
              }}</b-button>
              <b-button
                class="col-6"
                variant="outline-danger"
                @click="deleteFiles"
                >{{ $t("nav.delete") }}</b-button
              >
            </div>
          </div>
        </b-col>
      </b-row>
    </b-container>
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
.container {
  background-color: white;
}
.slide-show {
  border-radius: 2px;
  overflow: hidden;
  text-shadow: 1px 1px 2px #333;
}
.slide-img {
  height: 80vh;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}
.post-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
