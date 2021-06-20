<template>
  <div class="sign-in">
    <input type="text" v-model="email" placeholder="Email" /><br />
    <input type="password" v-model="password" placeholder="Password" /><br />
    <button @click="signIn">Sign in</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    signIn() {
      this.$store.dispatch("signIn", {
        email: this.email,
        password: this.password,
      });
    },
  },
};
</script>
