<template>
  <div>
    <div class="submit-form">
      <postForm />
      <button @click="updatePost">{{ $t("form.update") }}</button>
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
