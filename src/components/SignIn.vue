<template>
  <b-container>
    <b-form-row>
      <b-form @submit="signIn">
        <b-form-group
          :label="`${$t('form.email')} :`"
          label-for="email"
          class="colorStting"
        >
          <b-form-input
            v-model="email"
            id="email"
            type="email"
            placeholder="Enter email"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          :label="`${$t('form.password')} :`"
          label-for="password"
          class="colorStting"
        >
          <b-form-input
            v-model="password"
            id="password"
            type="password"
            placeholder="Enter password"
            required
          ></b-form-input>
        </b-form-group>

        <b-button type="submit" variant="secondary">{{
          $t("nav.signin")
        }}</b-button>
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
.d-block {
  color: white;
}
</style>
