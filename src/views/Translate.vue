<template>
  <div>
    <navbar />
    <div class="container d-flex justify-content-center top">
      <div class="col-6">
        <client :postId="postId"></client>
      </div>
      <div class="col-6">
        <translateform :postId="postId"></translateform>
      </div>
    </div>
  </div>
</template>

<script>
import navbar from "../components/Navbar";
import client from "../components/Client";
import translateform from "../components/TranslateForm";
export default {
  props: ["postId"],
  components: {
    navbar,
    client,
    translateform,
  },
};
</script>
