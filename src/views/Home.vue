<template>
  <div>
    <div class="backGround" v-if="!userId">
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
    <div class="backGround" id="homeSetting" v-if="userId">
      <p class="siteTtl">welcome to suSEAnaSEA</p>
      <!--<h2 class="slogan">welcome to</h2>
      <h1 class="siteTtl">suSEAnaSEA</h1>-->
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
.backGround {
  background-image: url("~@/images/seabackground.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  width: 100%;
  height: 800px;
}
#homeSetting {
  display: flex;
  justify-content: center;
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
.slogan {
  color: white;
  text-align: center;
  padding-top: 300px;
  font-size: 50px;
}
.siteTtl {
  color: white;
  text-align: center;
  font-size: 100px;
}

@keyframes typing {
  from {
    width: 0;
  }
}
@keyframes caret {
  50% {
    border-color: transparent;
  }
}

.siteTtl {
  font-family: monospace;
  width: 21ch;
  height: 5rem;
  border-right: 0.08em solid;
  overflow: hidden;
  font-size: 4em;
  white-space: nowrap;
  animation: typing 5s steps(21, end), caret 0.5s step-end infinite;
  text-align: center;
  margin-top: 30px;
}
</style>
