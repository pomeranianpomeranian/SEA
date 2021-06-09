<template>
  <div>
    <h1>This is Sign Up form!!</h1>
    <p>ここでサインアップできる</p>
    <div>
      <h2>Sign Up</h2>
      <input type="text" v-model="username" placeholder="Username" />
      <br />
      <input type="text" v-model="country" placeholder="Country" />
      <br />
      <input type="text" v-model="email" placeholder="Email" />
      <br />
      <input type="password" v-model="password" placeholder="Password" />
      <br />
      <button @click="signUp({ username, country, email, password })">
        Sign up
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      username: "",
      country: "",
      email: "",
      password: "",
    };
  },
  methods: {
    ...mapActions(["signUp"]),
  },
};
</script>
