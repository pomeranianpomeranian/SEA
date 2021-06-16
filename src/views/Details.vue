<template>
  <div class="post">
    <h1>{{ postContents.title }}</h1>
    <div class="images-holder">
      <div
        class="images-container"
        v-for="(image, index) in postContents.imagesRef"
        :key="index"
      >
        <img :src="image.url" alt="" />
      </div>
    </div>
    <p>{{ postContents.address }}</p>
    <p>{{ postContents.description }}</p>
    <p>
      <span
        class="category"
        v-for="(category, index) in postContents.categories"
        :key="index"
        >{{ category }}
      </span>
    </p>
    <comment :postId="postId"></comment>
  </div>
</template>

<script>
import firebase from "firebase";
import comment from "../components/Comment";
export default {
  props: ["postId"],
  components: {
    comment,
  },
  data() {
    return {
      postContents: "",
    };
  },
  methods: {
    getPost() {
      firebase
        .firestore()
        .collection("posts")
        .doc(this.postId)
        .get()
        .then((doc) => {
          this.postContents = {
            ...doc.data(),
          };
        })
        .catch((err) => console.log(err));
    },
  },
  computed: {
    userId() {
      return this.$store.state.auth.userId;
    },
  },
  created() {
    this.getPost();
  },
};
</script>

<style scoped>
.post {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.images-holder {
  display: flex;
  justify-content: space-around;
  height: 250px;
  border: 1px solid lightblue;
  border-radius: 10px;
  padding: 15px;
}
.images-container {
  width: 25%;
  height: 100%;
}
img {
  width: 100%;
  height: 100%;
}
.category {
  margin: 0 5px;
}
</style>
