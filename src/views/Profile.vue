<template>
  <div class="page-outline">
    <navbar />
    <div class="container">
      <div class="contents">
        <b-row>
          <b-col class="tabs pr-0" cols="3">
            <div
              class="tab"
              :class="{ selected: selectedTab === tab }"
              v-for="(tab, index) in tabs"
              :key="index"
              @click="selectedTab = tab"
            >
              <span>{{ tab }}</span>
            </div>
          </b-col>
          <b-col cols="9">
            <div class="bio">
              <bio
                :userId="userId"
                :userDetails="userDetails"
                v-if="selectedTab === 'Bio'"
              />
            </div>
            <div class="account">
              <account :userId="userId" v-if="selectedTab === 'Account'" />
            </div>
          </b-col>
        </b-row>
      </div>
    </div>
  </div>
</template>

<script>
import navbar from "../components/Navbar.vue";
import bio from "../components/Bio.vue";
import account from "../components/Account.vue";
export default {
  props: ["userId"],
  components: {
    navbar,
    bio,
    account,
  },
  data() {
    return {
      selectedTab: "Bio",
      tabs: ["Bio", "Account"],
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
.contents {
  border: 5px solid white;
  padding-right: 30px;
}
.tabs {
  border-right: 5px solid white;
}
.tab {
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 0.1em;
  padding: 15px;
}
.tab:hover {
  cursor: pointer;
  background-color: rgba(128, 128, 128, 0.1);
  border-left: 5px solid rgba(128, 128, 128, 0.2);
  margin-left: -5px;
}
.selected {
  border-left: 5px solid rgba(128, 128, 128, 0.8);
  margin-left: -5px;
}
.bio {
  padding: 15px 0 15px 15px;
}
.account {
  padding-left: 15px;
}
</style>
