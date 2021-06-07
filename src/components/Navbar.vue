<template>
  <div>
    <nav>
      <ul class="options">
        <li class="option">
          <router-link :to="{ name: 'home' }">Home</router-link>
        </li>
        <li v-if="userId" class="option">
          <router-link :to="{ name: 'user', params: { userId } }"
            >Mypage</router-link
          >
        </li>
      </ul>
      <div v-if="userId">{{ userId }} is now signed in!</div>
      <div>
        <!-- <button @click="signIn">Sign in</button> -->
        <button v-if="userId" @click="signOut">Sign out</button>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {};
  },
  methods: {
    ...mapActions(["signOut"]),
    // signIn() {
    //   this.$router.push({ name: "home" });
    // },
  },
  computed: {
    userId() {
      return this.$store.state.auth.userId;
    },
  },
};
</script>

<style scoped>
nav {
  border-bottom: 1px solid black;
  display: flex;
  justify-content: space-between;
}
.options {
  list-style-type: none;
}
.option {
  display: inline-block;
  margin: 0 10px;
}
button {
  padding: 10px;
}
</style>
