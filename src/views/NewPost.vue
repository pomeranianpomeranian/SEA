<template>
  <div class="page-outline">
    <navbar />
    <b-container>
      <b-row class="submit-form mt-3">
        <postForm />
      </b-row>
    </b-container>
  </div>
</template>

<script>
import navbar from "../components/Navbar";
import postForm from "../components/Form";
export default {
  components: {
    navbar,
    postForm,
  },
  created() {
    this.$store.commit("clearContents");
  },
};
</script>
