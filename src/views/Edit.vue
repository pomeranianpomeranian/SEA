<template>
  <div>
    <h1>Edit Form!</h1>
    <div class="submit-form">
      <postForm />
      <button @click="updatePost">Update</button>
    </div>
  </div>
</template>

<script>
import postForm from "../components/Form";
export default {
  props: ["postId"],
  components: {
    postForm,
  },
  methods: {
    updatePost() {
      this.$store.dispatch("updatePost", this.postId);
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
}
</style>
