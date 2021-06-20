<template>
  <div>
    <h1>HOME PAGE!</h1>
    <p>Welcome to Japan! 的な。</p>
    <div class="form-container" v-if="!userId">
      <span
        v-for="(tab, index) in tabs"
        @click="selectedTab = tab"
        :class="{ activeTab: selectedTab === tab }"
        :key="index"
        >{{ tab }}</span
      >
      <div class="form">
        <signinForm v-if="selectedTab === 'Sign In'" />
        <signupForm v-if="selectedTab === 'Sign Up'" />
      </div>
    </div>
  </div>
</template>

<script>
import signinForm from "../components/SignIn";
import signupForm from "../components/SignUp";
export default {
  components: {
    signinForm,
    signupForm,
  },
  data() {
    return {
      selectedTab: "Sign In",
      tabs: ["Sign In", "Sign Up"],
    };
  },
  computed: {
    userId() {
      return this.$store.state.auth.userId;
    },
  },
};
</script>

<style scoped>
.form-container {
  margin-top: 30px;
}
span {
  margin: 10px;
}
.form {
  margin-top: 10px;
}
.activeTab {
  color: darkgray;
}
</style>
