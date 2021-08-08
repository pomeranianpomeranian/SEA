<template>
  <b-container>
    <b-form-row>
      <b-form class="signup-form" @submit="signUp">
        <b-form-group :label="`${$t('form.username')} :`" label-for="name">
          <b-form-input
            v-model="userDetails.username"
            id="name"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group :label="`${$t('form.language')} :`" label-for="lang">
          <b-form-select
            v-model="userDetails.language"
            id="lang"
            :options="langOptions"
            required
          ></b-form-select>
        </b-form-group>

        <b-form-group :label="`${$t('form.email')} :`" label-for="email">
          <b-form-input
            v-model="authData.email"
            id="email"
            type="email"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group :label="`${$t('form.password')} :`" label-for="password">
          <b-form-input
            v-model="authData.password"
            id="password"
            type="password"
            required
          ></b-form-input>
        </b-form-group>

        <b-button
          class="submit-button"
          type="submit"
          variant="outline-primary"
          >{{ $t("nav.signup") }}</b-button
        >
      </b-form>
    </b-form-row>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      langOptions: [
        { value: "en", text: "English" },
        { value: "ja", text: "日本語" },
      ],
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
    signUp(event) {
      event.preventDefault();
      this.$store.dispatch("signUp", {
        userDetails: this.userDetails,
        authData: this.authData,
      });
    },
  },
};
</script>

<style scoped>
.signup-form {
  display: flex;
  flex-direction: column;
}
.submit-button {
  width: 70%;
  margin: 20px auto 0 auto;
}
</style>
