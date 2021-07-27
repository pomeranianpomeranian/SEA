<template>
  <div>
    <navbar />
    <b-container class="top">
      <b-row>
        <b-col>
          <postForm />
        </b-col>
        <b-col>
          <suggestions
            v-if="suggestions.length"
            :suggestions="suggestions"
          ></suggestions>
          <div v-else class="">
            <h5 class="text-center my-3">{{ $t("form.suggestion") }}</h5>
            <div class="info border rounded">
              <p class="text-center mt-5">There are no suggestions yet</p>
            </div>
          </div>
          <b-button
            class="col-8 offset-2 mt-5"
            variant="outline-info"
            type="button"
            size="lg"
            @click="updatePost"
            v-bind="{ disabled: !completed }"
            >{{ $t("form.update") }}</b-button
          >
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import navbar from "../components/Navbar";
import postForm from "../components/Form";
import suggestions from "../components/Suggestions";
export default {
  props: ["postId"],
  components: {
    navbar,
    postForm,
    suggestions,
  },
  methods: {
    updatePost() {
      this.$store.dispatch("updatePost", this.postId);
    },
  },
  computed: {
    suggestions() {
      return this.$store.state.post.suggestions;
    },
    postContents() {
      return this.$store.state.post.postContents;
    },
    completed() {
      if (
        this.postContents.title &&
        this.postContents.description &&
        this.postContents.categories.length &&
        this.postContents.imagesRef.length &&
        this.postContents.position
      )
        return true;
      else return false;
    },
  },
  created() {
    this.$store.dispatch("getDetails", this.postId);
  },
};
</script>

<style scoped>
.info {
  min-height: 20rem;
}
</style>
