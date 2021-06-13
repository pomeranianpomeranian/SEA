<template>
  <div class="results-container">
    <div class="post-frame" v-for="(post, index) in results" :key="index">
      <div class="image-holder">
        <img :src="post.imagesRef[0].url" />
      </div>
      <div class="description">
        <div>
          <router-link
            class="title"
            :to="{ name: 'details', params: { postId: post.postId } }"
            >{{ post.title }}</router-link
          >
        </div>
        <p>{{ post.description }}</p>
        <div class="fav">
          <div class="numLike" v-if="post.numLike">
            Liked by {{ post.numLike }}people
          </div>
          <div
            class="like"
            :class="{ liked: post.isLiked }"
            @click="updateLike(index)"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  props: ["category"],
  data() {
    return {
      results: [],
    };
  },
  methods: {
    getPosts() {
      const postsRef = firebase.firestore().collection("posts");
      if (this.category === "all") {
        postsRef
          .get()
          .then((posts) => this.showResult(posts))
          .catch((err) => console.log(err));
      } else {
        postsRef
          .where("categories", "array-contains", this.category)
          .get()
          .then((posts) => this.showResult(posts))
          .catch((err) => console.log(err));
      }
    },
    showResult(posts) {
      const likedPosts = this.userDetails.likedPosts;
      posts.forEach((post) => {
        if (likedPosts.includes(post.id)) {
          this.results.push({
            postId: post.id,
            isLiked: true,
            ...post.data(),
          });
        } else {
          this.results.push({
            postId: post.id,
            isLiked: false,
            ...post.data(),
          });
        }
      });
    },
    updateLike(index) {
      const postRef = firebase
        .firestore()
        .collection("posts")
        .doc(this.results[index].postId);
      if (!this.results[index].isLiked) {
        postRef
          .update({
            numLike: firebase.firestore.FieldValue.increment(1),
          })
          .then(() => {
            this.addLike(index);
          })
          .catch((err) => console.log(err));
      } else {
        postRef
          .update({
            numLike: firebase.firestore.FieldValue.increment(-1),
          })
          .then(() => {
            this.removeLike(index);
          })
          .catch((err) => console.log(err));
      }
    },
    addLike(index) {
      const target = this.results[index];
      firebase
        .firestore()
        .collection("users")
        .doc(this.userId)
        .update({
          likedPosts: firebase.firestore.FieldValue.arrayUnion(target.postId),
        })
        .then(() => {
          target.isLiked = true;
        })
        .catch((err) => console.log(err));
    },
    removeLike(index) {
      const target = this.results[index];
      firebase
        .firestore()
        .collection("users")
        .doc(this.userId)
        .update({
          likedPosts: firebase.firestore.FieldValue.arrayRemove(target.postId),
        })
        .then(() => {
          target.isLiked = false;
        })
        .catch((err) => console.log(err));
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
  created() {
    if (this.userDetails) {
      this.getPosts();
    } else {
      setTimeout(this.getPosts, 500);
    }
  },
  destroyed() {
    this.$store.dispatch("fetchUserData", this.userId);
  },
};
</script>

<style scoped>
.results-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.post-frame {
  display: flex;
  padding: 5px;
  border: 1px solid lightslategrey;
  width: 90%;
  height: 200px;
}
.image-holder {
  width: 40%;
  margin-right: 5px;
}
img {
  width: 100%;
  height: 100%;
}
.description {
  width: 60%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.title {
  font-weight: bold;
  font-size: 20px;
}
.fav {
  display: flex;
  justify-content: flex-end;
}
.like {
  width: 20px;
  height: 20px;
  border: 1px solid gray;
  border-radius: 50%;
}
.liked {
  background-color: red;
}
</style>
