<template>
  <div>
    <h1>HOME PAGE!</h1>
    <router-link :to="{ name: 'search' }">Search</router-link> |
    <router-link :to="{ name: 'signup' }">Sign Up</router-link>
    <p>Welcome to Japan! 的な。</p>
    <div v-if="!userId" class="sign-in">
      <input type="text" v-model="email" placeholder="Email" /><br />
      <input type="password" v-model="password" placeholder="Password" /><br />
      <button @click="signIn({ email, password })">Sign in</button>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "HelloWorld",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    ...mapActions(["signIn"]),
  },
  computed: {
    userId() {
      return this.$store.state.auth.userId;
    },
  },
};
</script>

<style scoped>
.sign-in {
  margin-top: 30px;
}
</style>
