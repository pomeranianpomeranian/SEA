<template>
  <div>
    <h2>{{ $t("form.original") }}</h2>
    <!--<div class="container">-->
    <div class="card">
      <div class="card-header">
        {{ $t("form.title") }}:{{ postContents.title }}
      </div>
      <div class="card-body">
        <blockquote class="blockquote mb-0">
          <p>{{ $t("form.description") }}:{{ postContents.description }}</p>
        </blockquote>
      </div>
    </div>
  </div>
  <!--</div>
    <div class="holder">
      <p class="header">{{ $t("form.title") }}:</p>
      <p class="body">{{ postContents.title }}</p>
    </div>
    <div class="holder">
      <p class="header">{{ $t("form.description") }}:</p>
      <p class="body">{{ postContents.description }}</p>
    </div>
  </div>-->
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
};
</script>

<style scoped>
.card-header {
  width: 333px;
  height: 65px;
}
.card-body {
  width: 333px;
  height: 353px;
}
.container {
  display: flex;
  flex-direction: column;
  width: 40%;
  border: 1px solid black;
  border-radius: 10px;
  padding: 5px;
}
.holder {
  border: 1px solid darkgray;
  border-radius: 5px;
  padding: 5px;
  margin: 20px 0;
}
.header {
  text-align: start;
  font-weight: bold;
}
</style>
