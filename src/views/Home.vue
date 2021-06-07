<template>
  <div>
    <h1>HOME PAGE!</h1>
    <router-link :to="{ name: 'search' }">Search</router-link> |
    <router-link :to="{ name: 'signup' }">Sign Up</router-link>
    <p>Welcome to Japan! 的な。多分ここにサインインするフォームも組み込む。</p>
    <div class="login">
      <h2>Login</h2>
      <input type="text" v-model="email" placeholder="Email" /><br />
      <input type="password" v-model="password" placeholder="Password" /><br />
      <button @click="signIn">Sign in</button>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    signIn() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then((userCredential) => {
          const userId = userCredential.user.uid;
          this.$router.push({ name: "user", params: { userId } });
        })
        .catch((err) => {
          console.log(err.message);
        });
    },
  },
};
</script>
