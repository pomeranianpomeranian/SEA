<template>
  <div>
    <div class="card">
      <div class="card-header">
        <b-form-input
          type="text"
          :placeholder="$t('form.title')"
          v-model="title"
        />
      </div>
      <div class="card-body">
        <blockquote class="blockquote mb-0">
          <b-form-textarea
            rows="12"
            :placeholder="$t('form.description')"
            v-model="description"
          ></b-form-textarea>
        </blockquote>
      </div>
    </div>
    <div>
      <b-button
        class="button mt-3"
        variant="outline-info"
        @click="sendSuggestion"
        >{{ $t("form.send") }}</b-button
      >
    </div>
  </div>
</template>
<script>
export default {
  props: ["postId"],
  data() {
    return {
      title: "",
      description: "",
    };
  },
  methods: {
    sendSuggestion() {
      this.$store.dispatch("sendSuggestion", {
        title: this.title,
        description: this.description,
        postId: this.postId,
      });
    },
  },
};
</script>

<style scoped>
.button {
  width: 100%;
}
/* .container {
  width: 50%;
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  border-radius: 10px;
  padding: 5px;
}
input {
  width: 100%;
  margin: 5px 0;
}
button {
  width: 100%;
  margin: 5px 0;
} */
</style>
