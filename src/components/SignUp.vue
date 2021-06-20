<template>
  <div>
    <input type="text" v-model="userDetails.username" placeholder="Username" />
    <br />
    <select v-model="userDetails.language">
      <option disabled>Preferred Language</option>
      <option value="en">English</option>
      <option value="ja">日本語</option>
    </select>
    <br />
    <input type="text" v-model="authData.email" placeholder="Email" />
    <br />
    <input type="password" v-model="authData.password" placeholder="Password" />
    <br />
    <button @click="signUp">Sign up</button>
  </div>
</template>

<script>
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
    signUp() {
      this.$store.dispatch("signUp", {
        userDetails: this.userDetails,
        authData: this.authData,
      });
    },
  },
};
</script>
