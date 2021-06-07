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
      <button @click="signUp">Sign up</button>
      <!-- <span><router-link :to="{ name: 'home' }">Home</router-link>. </span> -->
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
    signUp() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(
          (userCredential) => {
            const userId = userCredential.user.uid;
            this.$router.push({ name: "user", params: { userId } });
          },
          (err) => {
            console.log(err.message);
          }
        );
    },
  },
};
</script>
