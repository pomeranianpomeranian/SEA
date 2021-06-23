<template>
  <div>
    <div class="submit-form">
      <div class="main">
        <postForm />
        <suggestions
          v-if="suggestions.length"
          :suggestions="suggestions"
        ></suggestions>
      </div>
      <button @click="updatePost">{{ $t("form.update") }}</button>
    </div>
  </div>
</template>

<script>
import postForm from "../components/Form";
import suggestions from "../components/Suggestions";
export default {
  props: ["postId"],
  components: {
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
  },
  created() {
    this.$store.dispatch("getDetails", this.postId);
  },
};
</script>

<style scoped>
.submit-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}
.main {
  display: flex;
  justify-content: space-around;
}
button {
  width: 30%;
  padding: 10px;
  margin-top: 10px;
}
</style>
