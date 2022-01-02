<template>
  <div class="page-outline">
    <navbar />
    <b-container>
      <div v-if="originalContents.pending === true">
        <b-alert :show="suggestions.length" fade variant="info"
          >You got {{ suggestions.length }} suggestions!</b-alert
        >
        <b-alert :show="!suggestions.length" fade variant="secondary"
          >You haven't got any suggestion yet. Hang on!</b-alert
        >
      </div>
      <b-row>
        <postForm :postId="postId" />
      </b-row>
    </b-container>
    <div v-if="suggestions.length" class="overflow-auto p-3">
      <b-pagination
        v-if="originalContents.pending === true"
        align="center"
        pills
        v-model="selected"
        :total-rows="suggestions.length + 1"
        per-page="1"
      ></b-pagination>
    </div>
  </div>
</template>

<script>
import navbar from "../components/Navbar";
import postForm from "../components/Form";
export default {
  props: ["postId"],
  components: {
    navbar,
    postForm,
  },
  data() {
    return {
      selected: 1,
    };
  },
  computed: {
    suggestions() {
      return this.$store.state.post.suggestions;
    },
    originalContents() {
      return this.$store.state.post.postContents;
    },
    submitContents() {
      return this.$store.state.post.submitContents;
    },
  },
  watch: {
    selected() {
      const index = this.selected - 2;
      if (index === -1) {
        this.submitContents.title = this.originalContents.title;
        this.submitContents.description = this.originalContents.description;
      } else {
        this.submitContents.title = this.suggestions[index].title;
        this.submitContents.description = this.suggestions[index].description;
      }
    },
  },
  created() {
    this.$store.dispatch("getDetails", this.postId);
    this.$store.dispatch("getSuggestions", this.postId);
  },
};
</script>
