<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  created() {
    this.$store.dispatch("autoSignIn");
  },
};
</script>

<style>
.page-outline {
  min-height: 100vh;
  background-color: #f5f7fa;
  padding-top: 100px;
  padding-bottom: 40px;
}
.en-head {
  font-family: "Noto Serif", serif;
  font-weight: 700;
}
.ja-head {
  font-family: "Noto Serif JP", serif;
  font-weight: 900;
}
.pointer:hover {
  cursor: pointer;
}
.zoom:hover {
  cursor: zoom-in;
}
</style>
