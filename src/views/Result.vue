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
    showAll() {
      firebase
        .firestore()
        .collection("posts")
        .get()
        .then((posts) => {
          posts.forEach((doc) => {
            this.results.push({
              postId: doc.id,
              ...doc.data(),
            });
          });
        });
    },
    showOne() {
      firebase
        .firestore()
        .collection("posts")
        .where("categories", "array-contains", this.category)
        .get()
        .then((posts) => {
          posts.forEach((doc) => {
            this.results.push({
              postId: doc.id,
              ...doc.data(),
            });
          });
        });
    },
  },
  created() {
    if (this.category === "all") {
      this.showAll();
    } else this.showOne();
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
