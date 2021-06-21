<template>
  <div class="sign-in">
    <input type="text" v-model="email" :placeholder="$t('form.email')" /><br />
    <input
      type="password"
      v-model="password"
      :placeholder="$t('form.password')"
    /><br />
    <button @click="signIn">{{ $t("nav.signin") }}</button>
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
