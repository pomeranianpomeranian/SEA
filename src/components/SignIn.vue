<template>
  <b-container>
    <b-form-row>
      <b-form class="signin-form" @submit="signIn">
        <b-form-group :label="`${$t('form.email')} :`" label-for="email">
          <b-form-input
            v-model="email"
            id="email"
            type="email"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group :label="`${$t('form.password')} :`" label-for="password">
          <b-form-input
            v-model="password"
            id="password"
            type="password"
            required
          ></b-form-input>
        </b-form-group>

        <b-button
          class="submit-button"
          type="submit"
          variant="outline-primary"
          >{{ $t("nav.signin") }}</b-button
        >
      </b-form>
    </b-form-row>
  </b-container>
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
    signIn(event) {
      event.preventDefault();
      this.$store.dispatch("signIn", {
        email: this.email,
        password: this.password,
      });
    },
  },
};
</script>

<style scoped>
.signin-form {
  display: flex;
  flex-direction: column;
}
.submit-button {
  width: 70%;
  margin: 20px auto 0 auto;
}
</style>
