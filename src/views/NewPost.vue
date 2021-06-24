<template>
  <div>
    <div class="submit-form">
      <postForm />
      <div>
        <button @click="submitPost(false)">{{ $t("form.submit") }}</button>
        <button @click="submitPost(true)">{{ $t("form.save") }}</button>
      </div>
    </div>
  </div>
</template>

<script>
import postForm from "../components/Form";
export default {
  data() {
    return {
      selected: "all",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
      },
    };
  },

  components: {
    postForm,
  },
  methods: {
    submitPost(pending) {
      this.$store.dispatch("submitPost", pending);
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
