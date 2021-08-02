<template>
  <div class="comment-container">
    <div class="comments">
      <p v-if="!comments[0]">{{ $t("comment.nocomment") }}</p>
      <div
        class="comment-holder"
        v-for="(comment, index) in comments"
        :key="index"
      >
        <div class="user-info">
          <div
            class="avatar"
            v-if="comment.avatar"
            :style="{
              'background-image': 'url(' + comment.avatar + ')',
            }"
          ></div>
          <div class="avatar" v-else>
            <b-icon icon="person-fill"></b-icon>
          </div>
          <span>{{ comment.username }}</span>
          <span>|</span>
          <span>{{ comment.date }}</span>
        </div>
        <p class="comment">{{ comment.comment }}</p>
      </div>
    </div>
    <div>
      <b-input-group sixe="lg">
        <b-form-textarea
          class="comment-input"
          v-model="input"
          :state="loginState"
          :placeholder="$t('comment.placeholder')"
          aria-describedby="validation"
        ></b-form-textarea>
        <b-input-group-append>
          <b-button
            variant="info"
            @click="submit"
            style="border-bottom-right-radius: 3px"
            >{{ $t("comment.send") }}</b-button
          >
        </b-input-group-append>
        <b-form-invalid-feedback id="validation">
          {{ $t("comment.validation") }}
        </b-form-invalid-feedback>
      </b-input-group>
    </div>
  </div>
</template>

<script>
export default {
  props: ["postId"],
  data() {
    return {
      input: "",
      loginState: null,
    };
  },
  methods: {
    submit() {
      if (this.userId) {
        this.$store.dispatch("submitComments", {
          comment: this.input,
          postId: this.postId,
        });
        this.input = "";
      } else this.loginState = false;
    },
  },
  computed: {
    userId() {
      return this.$store.state.auth.userId;
    },
    username() {
      return this.$store.state.auth.userDetails.username;
    },
    comments() {
      return this.$store.state.post.comments;
    },
  },
  created() {
    this.$store.dispatch("getComments", this.postId);
  },
};
</script>

<style scoped>
.comment-container {
  width: 100%;
  height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid lightgray;
  border-radius: 4px;
}
.comments {
  height: 438px;
  overflow-y: scroll;
}
.comment-holder {
  min-height: 100px;
  box-shadow: 5px 2px 2px lightgray;
  border-radius: 5px;
  padding: 10px;
  margin: 0;
}
.comment {
  width: 100%;
  text-align: start;
  margin: 0;
  padding: 5px;
}
span {
  margin: 0 5px;
}
.user-info {
  display: flex;
  align-items: center;
  color: rgba(0, 0, 0, 0.5);
}
.avatar {
  display: inline-block;
  background-color: darkgray;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  text-align: center;
  font-size: 24px;
  color: white;
}
.comment-input {
  border-radius: 0;
  border-bottom-left-radius: 3px;
}
#validation {
  position: absolute;
  bottom: -20px;
}
</style>
