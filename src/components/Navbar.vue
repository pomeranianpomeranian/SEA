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
      <div class="auth">
        <div v-if="isSigningIn && !userId">
          <input type="text" placeholder="email" v-model="email" />
          <input type="text" placeholder="password" v-model="password" />
        </div>
        <div>
          <button
            v-if="!userId"
            @click="signIn({ email, password })"
            @mouseover="isSigningIn = true"
          >
            Sign in
          </button>
          <button v-if="userId" @click="signOut">Sign out</button>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      isSigningIn: false,
      email: "",
      password: "",
    };
  },
  methods: {
    ...mapActions(["signOut", "signIn"]),
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
.auth {
  display: flex;
  align-items: flex-end;
}
button {
  padding: 10px;
}
</style>
