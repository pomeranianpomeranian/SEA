<template>
  <div>
    <navbar />
    <div class="container top">
      <div v-if="$i18n.locale === 'ja'">
        <b-tabs align="center">
          <b-tab
            class="mb-5"
            v-bind="{ active: ja.selectedTab === tab }"
            v-for="(tab, index) in ja.tabs"
            :key="index"
            :title="tab"
            @click="ja.selectedTab = tab"
          >
          </b-tab>
          <myPosts v-if="ja.selectedTab === '投稿'"></myPosts>
          <okiniiri v-if="ja.selectedTab === 'お気に入り'"></okiniiri>
          <pendingposts v-if="ja.selectedTab === '翻訳待ち'"></pendingposts>
        </b-tabs>
      </div>

      <div v-if="$i18n.locale === 'en'">
        <b-tabs align="center">
          <b-tab
            class="mb-5"
            v-bind="{ active: en.selectedTab === tab }"
            v-for="(tab, index) in en.tabs"
            :key="index"
            :title="tab"
            @click="en.selectedTab = tab"
          >
          </b-tab>
          <myPosts v-if="en.selectedTab === 'My Posts'"></myPosts>
          <okiniiri v-if="en.selectedTab === 'Liked Posts'"></okiniiri>
        </b-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import navbar from "../components/Navbar";
import myPosts from "../components/MyPosts";
import okiniiri from "../components/Okiniiri";
import pendingposts from "../components/PendingPosts";
export default {
  components: {
    navbar,
    myPosts,
    okiniiri,
    pendingposts,
  },
  data() {
    return {
      ja: {
        selectedTab: "投稿",
        tabs: ["投稿", "お気に入り", "翻訳待ち"],
      },
      en: {
        selectedTab: "My Posts",
        tabs: ["My Posts", "Liked Posts"],
      },
    };
  },
  computed: {
    userDetails() {
      return this.$store.state.auth.userDetails;
    },
  },
};
</script>

<style scoped>
.navlink.active {
  background-color: #f5f7fa;
}
</style>
