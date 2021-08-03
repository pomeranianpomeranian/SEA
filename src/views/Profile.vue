<template>
  <div class="page-outline">
    <navbar />
    <div class="container">
      <b-row>
        <b-col cols="3">
          <div v-for="(tab, index) in tabs" :key="index">
            <span>{{ tab }}</span>
          </div>
        </b-col>
        <b-col cols="9">
          <bio
            :userId="userId"
            :userDetails="userDetails"
            v-if="selectedTab === 'bio'"
          />
          <!-- <account :userId="userId" v-if="selectedTab === 'account'" /> -->
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import navbar from "../components/Navbar.vue";
import bio from "../components/Bio.vue";
// import account from "../components/Account.vue";
export default {
  props: ["userId"],
  components: {
    navbar,
    bio,
    // account,
  },
  data() {
    return {
      selectedTab: "bio",
      tabs: ["bio", "account"],
    };
  },
  computed: {
    userDetails() {
      return this.$store.state.auth.userDetails;
    },
  },
};
</script>
