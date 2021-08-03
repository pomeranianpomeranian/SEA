<template>
  <div>
    <b-form>
      <div class="user">
        <div class="user-avatar">
          <div
            class="avatar-img"
            v-if="userDetails.avatar"
            :style="{
              'background-image': 'url(' + userDetails.avatar + ')',
            }"
          ></div>
          <div class="avatar-img" v-else>
            <b-icon icon="person-fill"></b-icon>
          </div>
          <div class="overlay" @click="openFile">
            <p class="overlay-text">{{ $t("user.avatar") }}</p>
            <input
              type="file"
              id="avatar"
              accept=".jpg, .jpeg, .png"
              style="display: none"
              @change="changeAvatar"
            />
          </div>
        </div>
        <div>
          <h2>{{ updatedProfile.username }}</h2>
          <p>{{ updatedProfile.bio }}</p>
        </div>
      </div>

      <b-form-group :label="`${$t('form.username')} :`" label-for="username">
        <b-form-input
          id="username"
          type="text"
          v-model="updatedProfile.username"
          required
        />
      </b-form-group>

      <b-form-group :label="`${$t('form.bio')} :`" label-for="bio">
        <b-form-textarea id="bio" v-model="updatedProfile.bio" rows="6" />
      </b-form-group>

      <b-form-group :label="`${$t('form.language')} :`" label-for="lang">
        <b-form-select
          id="lang"
          v-model="updatedProfile.language"
          :options="langOptions"
          required
        />
      </b-form-group>
    </b-form>
    <b-button class="button" variant="outline-info" @click="updateBio">{{
      $t("form.save")
    }}</b-button>
    <b-button class="button" variant="outline-secondary" @click="reset">{{
      $t("form.reset")
    }}</b-button>
  </div>
</template>

<script>
export default {
  props: ["userId", "userDetails"],
  data() {
    return {
      updatedProfile: {
        username: this.$store.state.auth.userDetails.username,
        bio: this.$store.state.auth.userDetails.bio,
        language: this.$store.state.auth.userDetails.language,
      },
      langOptions: [
        { value: "ja", text: "日本語" },
        { value: "en", text: "English" },
      ],
    };
  },
  methods: {
    openFile() {
      document.getElementById("avatar").click();
    },
    changeAvatar(event) {
      this.$store.dispatch("changeAvatar", event);
    },
    reset() {
      this.updatedProfile.username = this.userDetails.username;
      this.updatedProfile.bio = this.userDetails.bio;
      this.updatedProfile.language = this.userDetails.language;
    },
    updateBio() {
      this.$store.dispatch("updateBio", this.updatedProfile);
    },
  },
};
</script>

<style scoped>
.user {
  display: flex;
  margin-bottom: 60px;
}
.user-avatar {
  position: relative;
  margin-right: 40px;
}
.avatar-img {
  background-color: darkgray;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  text-align: center;
  font-size: 90px;
  color: white;
  transition-duration: 0.2s;
}
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  opacity: 0;
  transition: all 0.2s;
}
.overlay-text {
  margin: 0 auto;
}
.overlay:hover {
  opacity: 1;
  cursor: pointer;
}
.button {
  margin-top: 30px;
  width: 250px;
}
</style>
