<template>
  <div id="app">
    <!-- <Navbar></Navbar> -->
    <router-view />
  </div>
</template>
<script>
// import Navbar from "./components/Navbar";

export default {
  // components: {
  //   Navbar,
  // },
  created() {
    this.$store.dispatch("autoSignIn");
  },
};
</script>

<style>
#app {
  min-height: 100vh;
  background-color: #f5f7fa;
}
.top {
  padding: 100px 0 40px 0;
  margin: 0 auto 0 auto;
}
</style>
