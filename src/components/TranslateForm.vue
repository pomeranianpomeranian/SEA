<template>
  <div>
    <h2>{{ $t("form.changed") }}</h2>
    <div class="card">
      <div class="card-header">
        <input type="text" :placeholder="$t('form.title')" v-model="title" />
      </div>
      <div class="card-body">
        <blockquote class="blockquote mb-0">
          <textarea
            cols="30"
            rows="10"
            :placeholder="$t('form.description')"
            v-model="description"
          ></textarea>
        </blockquote>
      </div>
    </div>
    <div>
      <button @click="sendSuggestion">{{ $t("form.send") }}</button>
    </div>
  </div>
  <!--<div class="container">
    <div>
      <input type="text" :placeholder="$t('form.title')" v-model="title" />
    </div>
    <textarea
      cols="30"
      rows="10"
      :placeholder="$t('form.description')"
      v-model="description"
    ></textarea>
    <div>
      <button @click="sendSuggestion">{{ $t("form.send") }}</button>
    </div>
  </div>-->
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
.container {
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
}
</style>
