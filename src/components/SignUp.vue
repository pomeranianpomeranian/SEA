<template>
  <div>
    <input
      type="text"
      v-model="userDetails.username"
      :placeholder="$t('form.username')"
    />
    <br />
    <select v-model="userDetails.language">
      <option disabled>{{ $t("form.language") }}</option>
      <option value="en">English</option>
      <option value="ja">日本語</option>
    </select>
    <br />
    <input
      type="text"
      v-model="authData.email"
      :placeholder="$t('form.email')"
    />
    <br />
    <input
      type="password"
      v-model="authData.password"
      :placeholder="$t('form.password')"
    />
    <br />
    <button @click="signUp">{{ $t("nav.signup") }}</button>
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
