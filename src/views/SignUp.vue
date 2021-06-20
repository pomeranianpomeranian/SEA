<template>
  <div>
    <h1>This is Sign Up form!!</h1>
    <p>ここでサインアップできる</p>
    <div>
      <h2>Sign Up</h2>
      <input
        type="text"
        v-model="userDetails.username"
        placeholder="Username"
      />
      <br />
      <!-- <input type="text" v-model="userDetails.country" placeholder="Country" /> -->
      <select v-model="userDetails.language">
        <option disabled>Preferred Language</option>
        <option value="en">English</option>
        <option value="ja">日本語</option>
      </select>
      <br />
      <input type="text" v-model="authData.email" placeholder="Email" />
      <br />
      <input
        type="password"
        v-model="authData.password"
        placeholder="Password"
      />
      <br />
      <button @click="signUp({ userDetails, authData })">Sign up</button>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      userDetails: {
        username: "",
        language: "",
      },
      authData: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    ...mapActions(["signUp"]),
  },
};
</script>
