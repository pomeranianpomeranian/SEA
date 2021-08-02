<template>
  <div class="page-outline">
    <navbar />
    <div class="container">
      <div class="user">
        <div class="user-avatar">
          <div
            class="avatar-img"
            v-if="userDetails.avatar"
            :style="{
              'background-image': 'url(' + userDetails.avatar + ')',
            }"
          ></div>
          <div class="avatar-img" v-else>
            <b-icon icon="person-fill"></b-icon>
          </div>
          <div class="overlay" @click="openFile">
            <p class="overlay-text">{{ $t("user.avatar") }}</p>
            <input
              type="file"
              id="avatar"
              accept=".jpg, .jpeg, .png"
              style="display: none"
              @change="changeAvatar"
            />
          </div>
        </div>
        <div class="user-info">
          <div class="user-info-head">
            <h2 class="username">{{ userDetails.username }}</h2>
            <b-button
              variant="faded"
              style="padding: 0"
              v-b-tooltip.hover
              :title="$t('user.edit')"
              ><b-icon icon="pencil-square"></b-icon
            ></b-button>
          </div>
          <p v-if="userDetails.bio">{{ userDetails.bio }}</p>
        </div>
      </div>

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
  methods: {
    openFile() {
      document.getElementById("avatar").click();
    },
    changeAvatar(event) {
      this.$store.dispatch("changeAvatar", event);
    },
  },
  computed: {
    userDetails() {
      return this.$store.state.auth.userDetails;
    },
    userId() {
      return this.$store.state.auth.userId;
    },
  },
};
</script>

<style scoped>
.user {
  display: flex;
  margin-bottom: 60px;
}
.user-avatar {
  position: relative;
}
.avatar-img {
  background-color: darkgray;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  text-align: center;
  font-size: 90px;
  color: white;
  transition-duration: 0.2s;
}
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  opacity: 0;
  transition: all 0.2s;
}
.overlay-text {
  margin: 0 auto;
}
.overlay:hover {
  opacity: 1;
  cursor: pointer;
}
.user-info {
  margin-left: 40px;
  max-width: 600px;
}
.user-info-head {
  display: flex;
  align-items: center;
}
.username {
  display: inline-block;
  margin: 0 20px 10px 0;
}
</style>
