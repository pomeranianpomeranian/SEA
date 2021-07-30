<template>
  <div class="comment-box">
    <div class="comment-container">
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
              'backgorund-image': 'url(' + comment.avatar + ')',
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
      <div class="comment-input" v-if="userId">
        <b-input-group class="mt-3" sixe="lg">
          <b-form-textarea
            v-model="input"
            :placeholder="$t('comment.placeholder')"
          ></b-form-textarea>
          <b-input-group-append>
            <b-button variant="info" @click="submit">{{
              $t("comment.send")
            }}</b-button>
          </b-input-group-append>
        </b-input-group>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["postId"],
  data() {
    return {
      input: "",
    };
  },
  methods: {
    submit() {
      this.$store.dispatch("submitComments", {
        comment: this.input,
        postId: this.postId,
      });
      this.input = "";
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
.comment-box {
  width: 100%;
}
.comment-container {
  position: relative;
  border: 1px solid lightgray;
  border-radius: 4px;
  height: 500px;
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
  position: sticky;
  bottom: 0;
}
</style>
