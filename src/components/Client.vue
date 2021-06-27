<template>
  <div class="card">
    <div class="card-header mb-0">
      <span>{{ $t("form.title") }} :</span>
      <h4 class="text-center">{{ postContents.title }}</h4>
    </div>
    <div class="card-body">
      <blockquote class="blockquote mb-0">
        <span>{{ $t("form.description") }} :</span>
        <p class="my-5 text-center">{{ postContents.description }}</p>
      </blockquote>
    </div>
  </div>
</template>

<script>
export default {
  props: ["postId"],
  computed: {
    postContents() {
      return this.$store.state.post.postContents;
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
span {
  font-size: 1rem;
}
</style>
