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
      <span v-for="(tag, index) in postContents.tags" :key="index"
        >#{{ tag }} /
      </span>
    </p>
    <div>
      <button @click="edit">Edit</button>
      <button @click="deleteFiles">Delete</button>
    </div>
  </div>
</template>
<script>
import firebase from "firebase";
export default {
  props: ["postId"],
  data() {
    return {
      postContents: "",
    };
  },
  methods: {
    edit() {
      this.$router.push({
        name: "edit",
        params: { userId: this.userId, postId: this.postId },
      });
    },
    deleteFiles() {
      const files = this.postContents.imagesRef;
      if (confirm("Are you sure?")) {
        for (let i = 0; i <= files.length - 1; i++) {
          firebase
            .storage()
            .ref(files[i].path)
            .delete()
            .then(() => {
              console.log("Deleted the file");
              if (i === files.length - 1) {
                this.deleteDoc();
              }
            })
            .catch((err) => console.log(err));
        }
      }
    },
    deleteDoc() {
      firebase
        .firestore()
        .collection("posts")
        .doc(this.postId)
        .delete()
        .then(() => {
          console.log("Deleted the document!");
          this.$router.push({
            name: "user",
            params: { userId: this.userId },
          });
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
</style>
