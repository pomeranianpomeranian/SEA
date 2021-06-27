<template>
  <div class="container d-flex justify-content-center mt-5">
    <div class="col-6">
      <client :postId="postId"></client>
    </div>
    <div class="col-6">
      <translateform :postId="postId"></translateform>
    </div>
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
