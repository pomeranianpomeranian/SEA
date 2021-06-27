<template>
  <div class="container">
    <client :postId="postId"></client>

    <translateform :postId="postId"></translateform>
  </div>
</template>

<script>
import client from "../components/Client";
import translateform from "../components/TranslateForm";
export default {
  props: ["postId"],
  components: {
    client,
    translateform,
  },
};
</script>

<style scoped>
.container {
  display: flex;
  align-items: flex-start;
  justify-content: space-around;
  align-content: space-around;
  margin: 30px 0;
}
</style>
