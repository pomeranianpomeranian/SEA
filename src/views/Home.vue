<template>
  <div class="home px-5 py-3">
    <navbar />
    <div v-if="!userId">
      <div class="form-container" v-if="$i18n.locale === 'ja'">
        <div>
          <span
            v-for="(tab, index) in ja.tabs"
            @click="ja.selectedTab = tab"
            :class="{ activeTab: ja.selectedTab === tab }"
            :key="index"
            >{{ tab }}</span
          >
        </div>

        <div class="form">
          <signinForm v-if="ja.selectedTab === 'ログイン'" />
          <signupForm v-if="ja.selectedTab === 'サインアップ'" />
        </div>
      </div>
      <div class="form-container" v-if="$i18n.locale === 'en'">
        <div>
          <span
            v-for="(tab, index) in en.tabs"
            @click="en.selectedTab = tab"
            :class="{ activeTab: en.selectedTab === tab }"
            :key="index"
            >{{ tab }}</span
          >
        </div>
        <div class="form">
          <signinForm v-if="en.selectedTab === 'Sign in'" />
          <signupForm v-if="en.selectedTab === 'Sign up'" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import navbar from "../components/Navbar-home.vue";
import signinForm from "../components/SignIn";
import signupForm from "../components/SignUp";
export default {
  components: {
    navbar,
    signinForm,
    signupForm,
  },
  data() {
    return {
      ja: {
        selectedTab: "ログイン",
        tabs: ["ログイン", "サインアップ"],
      },
      en: {
        selectedTab: "Sign in",
        tabs: ["Sign in", "Sign up"],
      },
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
.home {
  height: 100vh;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),
    url(~@/images/sorasak-_UIN-pFfJ7c-unsplash-min.jpg);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}
.form-container {
  padding-top: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.changeTab {
  display: flex;
  flex-direction: row;
}
span {
  margin: 10px;
  color: white;
}
.form {
  margin-top: 10px;
  display: flex;
  justify-content: space-around;
}
.activeTab {
  color: darkgray;
}
</style>
