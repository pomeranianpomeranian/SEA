<template>
  <div>
    <div class="form-container" v-if="!userId">
      <span
        v-for="(tab, index) in tabs"
        @click="selectedTab = tab"
        :class="{ activeTab: selectedTab === tab }"
        :key="index"
        >{{ tab }}</span
      >
      <div class="form">
        <signinForm v-if="selectedTab === $t('nav.signin')" />
        <signupForm v-if="selectedTab === $t('nav.signup')" />
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
      selectedTab: this.$t("nav.signin"),
      tabs: [this.$t("nav.signin"), this.$t("nav.signup")],
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
