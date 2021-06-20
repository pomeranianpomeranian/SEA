<template>
  <div>
    <h1>New Post!</h1>
    <div class="submit-form">
      <postForm />
      <button @click="submitPost">Submit</button>
    </div>
  </div>
</template>

<script>
import postForm from "../components/Form";
export default {
  components: {
    postForm,
  },
  methods: {
    submitPost() {
      this.$store.dispatch("submitPost");
    },
  },
  created() {
    this.$store.commit("clearContents");
  },
};
</script>

<style scoped>
.submit-form {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
