<template>
  <div>
    <nav>
      <ul class="options">
        <li class="option">
          <router-link :to="{ name: 'home' }">{{ $t("nav.home") }}</router-link>
        </li>
        <li v-if="userId" class="option">
          <router-link :to="{ name: 'user', params: { userId } }">{{
            $t("nav.mypage")
          }}</router-link>
        </li>
        <li class="option">
          <router-link :to="{ name: 'search' }">{{
            $t("nav.search")
          }}</router-link>
        </li>
      </ul>
      <div class="auth">
        <div v-if="isSigningIn && !userId">
          <input type="text" placeholder="email" v-model="email" />
          <input type="password" placeholder="password" v-model="password" />
        </div>
        <div>
          <select v-model="lang" @change="switchLang">
            <option value="en">English</option>
            <option value="ja">日本語</option>
          </select>
          <button
            v-if="!userId"
            @click="signIn({ email, password })"
            @mouseover="isSigningIn = true"
          >
            {{ $t("nav.signin") }}
          </button>
          <button v-if="userId" @click="signOut">
            {{ $t("nav.signout") }}
          </button>
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
      lang: "",
    };
  },
  methods: {
    ...mapActions(["signOut", "signIn"]),
    switchLang() {
      this.$i18n.locale = this.lang;
    },
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
