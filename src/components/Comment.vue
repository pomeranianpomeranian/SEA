<template>
  <div class="comment-box">
    <div class="comment-container">
      <p v-if="!comments[0]">There's no comment yet</p>
      <div
        class="comment-holder"
        v-for="(comment, index) in comments"
        :key="index"
      >
        <p class="comment">{{ comment.comment }}</p>
        <div class="info">
          <p class="username">{{ comment.username }}</p>
          <p class="date">{{ comment.date }}</p>
        </div>
      </div>
    </div>
    <div class="input">
      <textarea
        v-model="input"
        cols="30"
        rows="2"
        placeholder="comment"
      ></textarea>
      <div><button @click="submit">Send</button></div>
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
  width: 80%;
}
.comment-container {
  border: 1px solid black;
  border-radius: 10px;
  width: 100%;
  height: 150px;
  overflow-y: scroll;
  padding: 10px;
}
.comment-holder {
  box-shadow: 5px 2px 2px lightgray;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  padding: 5px;
  margin: 3px 0;
}
.comment {
  width: 100%;
  text-align: start;
  margin: 0;
  padding: 5px;
}
.info {
  display: flex;
  justify-content: flex-end;
}
.username {
  font-weight: bold;
  margin: 0;
  padding: 0 3px;
}
.date {
  font-weight: lighter;
  color: darkgrey;
  margin: 0;
}
.input {
  display: flex;
  flex-direction: column;
}
button {
  width: 100%;
}
</style>
