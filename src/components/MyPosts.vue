<template>
  <div>
    <div class="my-posts">
      <h2>My Posts!</h2>
      <div class="card-container">
        <div
          class="card"
          v-for="(post, index) in myposts"
          :key="index"
          @click="transfer(index)"
        >
          <div class="image">
            <img :src="post.imagesRef[0].url" />
          </div>
          <h3>{{ post.title }}</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  data() {
    return {
      myposts: [],
    };
  },
  methods: {
    transfer(index) {
      const postId = this.myposts[index].postId;
      this.$router.push({
        name: "mypost",
        params: { userId: this.userId, postId },
      });
    },
  },
  computed: {
    userId() {
      return this.$store.state.auth.userId;
    },
  },
  created() {
    firebase
      .firestore()
      .collection("posts")
      .where("userId", "==", this.userId)
      .orderBy("createdAt", "desc")
      .get()
      .then((posts) => {
        posts.forEach((doc) => {
          this.myposts.push({
            postId: doc.id,
            ...doc.data(),
          });
        });
      });
  },
};
</script>

<style scoped>
.my-posts {
  border: 3px solid lightblue;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.card-container {
  display: flex;
  flex-wrap: wrap;
  width: 80%;
}
.card {
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  width: 30%;
}
.image {
  height: 250px;
}
img {
  width: 100%;
  height: 100%;
}
</style>
