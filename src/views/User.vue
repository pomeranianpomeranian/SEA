<template>
  <div>
    <h1>This is {{ userDetails.username }}'s Page!</h1>
    <router-link :to="{ name: 'newpost' }">NewPost</router-link>
    <p>
      ここはユーザーのマイページで、サインインすると表示される。ここから新しい投稿をするのと、自分の過去の投稿を見れる。
    </p>
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
    <myPosts v-if="selectedTab === 'myPosts'"></myPosts>
    <okiniiri v-if="selectedTab === 'okiniiri'"></okiniiri>
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
      tabs: ["myPosts", "okiniiri"],
      selectedTab: "myPosts",
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
