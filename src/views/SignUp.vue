<template>
  <div>
    <h1>This is Sign Up form!!</h1>
    <p>ここでサインアップできる</p>
    <div class="register">
      <p>Sign Up</p>
      <input type="text" v-model="email" placeholder="Email" />
      <br />
      <input type="password" v-model="password" placeholder="Password" />
      <br />
      <button @click="signUp({ email, password })">Sign up</button>
      <!-- <span><router-link :to="{ name: 'home' }">Home</router-link>. </span> -->
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    ...mapActions(["signUp"]),
  },
};
</script>
