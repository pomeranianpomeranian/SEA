<template>
  <div>
    <h1>{{ userDetails.username }}</h1>
    <router-link :to="{ name: 'newpost' }">{{ $t("nav.newpost") }}</router-link>
    <div class="tabs-container">
      <div
        class="tab"
        :class="{ activeTab: selectedTab === tab }"
        v-for="(tab, index) in tabs"
        :key="index"
        @click="selectedTab = tab"
      >
        {{ tab }}
      </div>
    </div>
    <myPosts v-if="selectedTab === $t('nav.myposts')"></myPosts>
    <okiniiri v-if="selectedTab === $t('nav.liked')"></okiniiri>
  </div>
</template>

<script>
import myPosts from "../components/MyPosts";
import okiniiri from "../components/Okiniiri";
export default {
  components: {
    myPosts,
    okiniiri,
  },
  data() {
    return {
      selectedTab: this.$t("nav.myposts"),
      tabs: [this.$t("nav.myposts"), this.$t("nav.liked")],
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
