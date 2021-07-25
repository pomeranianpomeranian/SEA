<template>
  <div class="home px-5 py-3">
    <navbar />

    <div v-if="!userId">
      <div class="form-container" v-if="$i18n.locale === 'ja'">
        <div>
          <b-tabs content-class="mt-3">
            <b-tab
              v-for="(tab, index) in ja.tabs"
              @click="ja.selectedTab = tab"
              v-bind="{ active: ja.selectedTab === tab }"
              :key="index"
              :title="tab"
            ></b-tab>
          </b-tabs>
        </div>

        <div class="form">
          <signinForm v-if="ja.selectedTab === 'ログイン'" />
          <signupForm v-if="ja.selectedTab === 'サインアップ'" />
        </div>
      </div>
      <div class="form-container" v-if="$i18n.locale === 'en'">
        <div>
          <b-tabs content-class="mt-3">
            <b-tab
              v-for="(tab, index) in en.tabs"
              @click="en.selectedTab = tab"
              v-bind="{ active: en.selectedTab === tab }"
              :key="index"
              :title="tab"
            ></b-tab>
          </b-tabs>
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
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
    url(~@/images/sorasak-_UIN-pFfJ7c-unsplash-min.jpg);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}
.form-container {
  width: 300px;
  border-radius: 4px;
  margin-top: 100px;
  padding: 30px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.8);
}
.form {
  margin-top: 10px;
}
</style>
