<template>
  <div v-if="!userId">
    <div class="form-container" v-if="$i18n.locale === 'ja'">
      <span
        v-for="(tab, index) in ja.tabs"
        @click="ja.selectedTab = tab"
        :class="{ activeTab: ja.selectedTab === tab }"
        :key="index"
        >{{ tab }}</span
      >
      <div class="form">
        <signinForm v-if="ja.selectedTab === 'ログイン'" />
        <signupForm v-if="ja.selectedTab === 'サインアップ'" />
      </div>
    </div>
    <div class="form-container" v-if="$i18n.locale === 'en'">
      <span
        v-for="(tab, index) in en.tabs"
        @click="en.selectedTab = tab"
        :class="{ activeTab: en.selectedTab === tab }"
        :key="index"
        >{{ tab }}</span
      >
      <div class="form">
        <signinForm v-if="en.selectedTab === 'Sign in'" />
        <signupForm v-if="en.selectedTab === 'Sign up'" />
      </div>
    </div>
    <GmapMap
      :center="{ lat: 35.645974459469834, lng: 139.70496042046145 }"
      :zoom="12"
      map-type-id="terrain"
      style="width: 500px; height: 300px"
      justifiy-content-center
    >
      <!-- <GmapMarker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :clickable="true"
        :draggable="true"
        @click="center = m.position"
      /> -->
    </GmapMap>
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
.form-container {
  margin-top: 100px;
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
