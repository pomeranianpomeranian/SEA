<template>
  <div>
    <div>
      <b-modal
        ref="login-modal"
        hide-footer
        hide-header-close
        :title="$t('form.reauthenticate')"
      >
        <b-form @submit.prevent="reauthenticate">
          <b-input
            type="email"
            v-model="email.current"
            :placeholder="$t('form.email')"
            required
          />
          <b-input
            class="mt-1"
            type="password"
            v-model="password.current"
            :placeholder="$t('form.password')"
            required
          />
          <b-button class="mt-1" type="submit" variant="primary" block>{{
            $t("nav.signin")
          }}</b-button>
        </b-form>
      </b-modal>
    </div>
    <div class="section">
      <b-form @submit.prevent="updateEmail">
        <b-alert :show="email.warnings.success" fade variant="success">{{
          $t("form.alert.emailSuccess")
        }}</b-alert>
        <b-alert :show="email.warnings.fail" fade variant="danger">{{
          $t("form.alert.emailFail")
        }}</b-alert>
        <b-form-group :label="`${$t('form.email')} :`" label-for="email">
          <b-form-input id="email" type="email" v-model="email.new" required />
        </b-form-group>
        <b-button type="submit" class="button" variant="outline-info">{{
          $t("form.changeEmail")
        }}</b-button>
      </b-form>
    </div>
    <div class="section">
      <b-form @submit.prevent="changePassword">
        <b-alert :show="password.warnings.success" fade variant="success">{{
          $t("form.alert.passwordSuccess")
        }}</b-alert>
        <b-alert :show="password.warnings.fail" fade variant="danger">{{
          $t("form.alert.passwordFail")
        }}</b-alert>
        <b-form-group
          :label="`${$t('form.newPassword')} :`"
          label-for="password-1"
        >
          <b-form-input
            id="password-1"
            type="password"
            v-model="password.new"
            :state="passwordLength"
            aria-describedby="length-feedback"
            required
          />
          <b-form-invalid-feedback id="length-feedback">
            {{ $t("form.validation.length") }}
          </b-form-invalid-feedback>
        </b-form-group>
        <b-form-group
          :label="`${$t('form.confirmPassword')} :`"
          label-for="password-2"
        >
          <b-form-input
            id="password-2"
            type="password"
            v-model="password.confirm"
            :state="passwordConfirm"
            aria-describedby="confirm-feedback"
            required
          />
          <b-form-invalid-feedback id="confirm-feedback">
            {{ $t("form.validation.match") }}
          </b-form-invalid-feedback>
        </b-form-group>
        <b-button type="submit" class="button" variant="outline-info">{{
          $t("form.changePassword")
        }}</b-button>
      </b-form>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  props: ["userId"],
  data() {
    return {
      email: {
        current: null,
        new: this.$store.state.auth.userEmail,
        warnings: {
          success: false,
          fail: false,
        },
      },
      password: {
        current: null,
        new: null,
        confirm: null,
        warnings: {
          success: false,
          fail: false,
        },
      },
      target: null,
    };
  },
  methods: {
    updateEmail() {
      firebase
        .auth()
        .currentUser.updateEmail(this.email.new)
        .then(() => {
          this.email.warnings.success = true;
          this.$store.dispatch("getAuthData");
        })
        .catch(() => {
          this.$refs["login-modal"].show();
          this.target = "email";
        });
    },
    changePassword() {
      firebase
        .auth()
        .currentUser.updatePassword(this.password.new)
        .then(() => {
          this.password.warnings.success = true;
        })
        .catch(() => {
          this.$refs["login-modal"].show();
          this.target = "password";
        });
    },
    reauthenticate() {
      const credential = firebase.auth.EmailAuthProvider.credential(
        this.email.current,
        this.password.current
      );

      firebase
        .auth()
        .currentUser.reauthenticateWithCredential(credential)
        .then(() => {
          this.$refs["login-modal"].hide();
          if (this.target === "email") this.updateEmail();
          else if (this.target === "password") this.changePassword();
        })
        .catch(() => {
          if (this.target === "email") this.email.warnings.fail = true;
          else if (this.target === "password")
            this.password.warnings.fail = true;
          this.email.new = this.$store.state.auth.userEmail;
        });
    },
  },
  created() {
    this.$store.dispatch("getAuthData");
  },
  computed: {
    passwordLength() {
      if (this.password.new === null) return null;
      else if (this.password.new.length >= 8) return true;
      else return false;
    },
    passwordConfirm() {
      if (this.password.confirm === null) return null;
      else if (
        this.password.new === this.password.confirm &&
        this.password.new.length >= 8
      )
        return true;
      else return false;
    },
  },
};
</script>

<style scoped>
.section {
  margin-bottom: 40px;
  padding: 30px;
  background-color: white;
  border-radius: 4px;
}
.button {
  width: 250px;
  margin-top: 20px;
}
</style>
