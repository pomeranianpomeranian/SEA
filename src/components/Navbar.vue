<template>
  <div>
    <div>
      <b-navbar toggleable="md" type="light" variant="light" fixed="top">
        <b-navbar-brand @click="transfer('home')"
          ><img
            src="../images/suSEAnaSEA.png"
            class="logo"
            alt=""
            width="80px"
            height="30px"
        /></b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item @click="transfer('search')">{{
              $t("nav.search")
            }}</b-nav-item>
            <b-nav-item v-if="userId" @click="transfer('pend')">{{
              $t("nav.pend")
            }}</b-nav-item>
          </b-navbar-nav>

          <b-navbar-nav class="ml-auto">
            <b-nav-item-dropdown :text="$t('form.language')" right>
              <b-dropdown-item @click="$i18n.locale = 'en'"
                >English</b-dropdown-item
              >
              <b-dropdown-item @click="$i18n.locale = 'ja'"
                >日本語</b-dropdown-item
              >
            </b-nav-item-dropdown>

            <b-nav-item-dropdown
              v-if="userDetails"
              :text="userDetails.username"
              right
            >
              <b-dropdown-item @click="transfer('user', userId)">{{
                $t("nav.mypage")
              }}</b-dropdown-item>
              <b-dropdown-item @click="transfer('newpost', userId)">{{
                $t("nav.newpost")
              }}</b-dropdown-item>
              <b-dropdown-item @click="signOut">{{
                $t("nav.signout")
              }}</b-dropdown-item>
            </b-nav-item-dropdown>

            <b-nav-item-dropdown
              v-if="!userDetails"
              :text="$t('nav.signin')"
              right
            >
              <b-nav-form>
                <b-form-input
                  size="sm"
                  type="email"
                  v-model="email"
                  :placeholder="$t('form.email')"
                ></b-form-input>
                <b-form-input
                  size="sm"
                  type="password"
                  v-model="password"
                  :placeholder="$t('form.password')"
                ></b-form-input>
                <b-button size="sm" @click="signIn({ email, password })">{{
                  $t("nav.signin")
                }}</b-button>
              </b-nav-form>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    ...mapActions(["signOut", "signIn"]),
    transfer(name, params) {
      this.$router.push({ name, params: { params } });
    },
  },
  computed: {
    userId() {
      return this.$store.state.auth.userId;
    },
    userDetails() {
      return this.$store.state.auth.userDetails;
    },
  },
};
</script>

<style scoped>
.logo:hover {
  cursor: pointer;
}
</style>
