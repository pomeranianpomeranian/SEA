<template>
  <div>
    <h1>{{ userDetails.username }}</h1>
    <router-link :to="{ name: 'newpost' }">{{ $t("nav.newpost") }}</router-link>
    <div v-if="$i18n.locale === 'ja'">
      <div class="tabs-container">
        <div
          class="tab"
          :class="{ activeTab: ja.selectedTab === tab }"
          v-for="(tab, index) in ja.tabs"
          :key="index"
          @click="ja.selectedTab = tab"
        >
          {{ tab }}
        </div>
      </div>
      <myPosts v-if="ja.selectedTab === '投稿'"></myPosts>
      <okiniiri v-if="ja.selectedTab === 'お気に入り'"></okiniiri>
      <pendingposts v-if="ja.selectedTab === '翻訳待ち'"></pendingposts>
    </div>
    <div v-if="$i18n.locale === 'en'">
      <div class="tabs-container">
        <div
          class="tab"
          :class="{ activeTab: en.selectedTab === tab }"
          v-for="(tab, index) in en.tabs"
          :key="index"
          @click="en.selectedTab = tab"
        >
          {{ tab }}
        </div>
      </div>
      <myPosts v-if="en.selectedTab === 'My Posts'"></myPosts>
      <okiniiri v-if="en.selectedTab === 'Liked Posts'"></okiniiri>
    </div>
  </div>
</template>

<script>
import myPosts from "../components/MyPosts";
import okiniiri from "../components/Okiniiri";
import pendingposts from "../components/PendingPosts";
export default {
  components: {
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
.tabs-container {
  display: flex;
  justify-content: center;
}
.tab {
  margin: 5px;
}
.activeTab {
  font-size: 120%;
  font-weight: bold;
  color: lightgreen;
}
</style>
