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
.top {
  margin: 100px auto 40px auto;
}
</style>
