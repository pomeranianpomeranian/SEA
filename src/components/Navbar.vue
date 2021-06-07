<template>
  <div>
    <nav>
      <ul class="options">
        <li class="option">
          <router-link :to="{ name: 'home' }">Home</router-link>
        </li>
        <li class="option">
          <router-link :to="{ name: 'user', params: { userId } }"
            >Mypage</router-link
          >
        </li>
      </ul>
      <div>
        <button @click="signIn">Sign in</button>
        <button @click="signOut">Sign out</button>
      </div>
    </nav>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  data() {
    return {
      isSignedIn: false,
      userId: null,
    };
  },
  methods: {
    signIn() {
      this.$router.push({ name: "home" });
    },
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          console.log("Sign out successful!!!");
        })
        .catch((err) => {
          console.log("Oh No something went wrong!!", err);
        });
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
