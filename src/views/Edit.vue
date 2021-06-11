<template>
  <div>
    <h1>Edit Form</h1>
    <div class="submit-form">
      <div class="form-contents">
        <input type="text" v-model="postContents.title" placeholder="Title" />
        <input
          type="text"
          v-model="postContents.address"
          placeholder="Address"
        />
        <input
          type="text"
          v-model="tag"
          @keydown.enter="addTag"
          placeholder="tags"
        />
        <div class="tags-holder">
          <span
            v-for="(tag, index) in postContents.tags"
            :key="index"
            @click="deleteTag(index)"
            >#{{ tag }} /
          </span>
        </div>
        <div class="images-holder">
          <div
            class="image-container"
            v-for="(image, index) in postContents.imagesRef"
            :key="index"
            @click="deleteImg(index)"
          >
            <img :src="image.url" />
          </div>
        </div>
        <input type="file" @change="storeImage" />
        <textarea
          v-model="postContents.description"
          cols="30"
          rows="10"
          placeholder="Description"
        ></textarea>
        <button @click="update">Update</button>
      </div>
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
      tag: "",
    };
  },
  methods: {
    storeImage(event) {
      const file = event.target.files[0];
      const path = `${this.userId}/${file.name}`;
      firebase
        .storage()
        .ref(path)
        .put(file)
        .then(() => {
          console.log("File successfully saved!");
          this.getImageURL(path);
        })
        .catch((err) => console.log(err));
    },
    getImageURL(path) {
      firebase
        .storage()
        .ref(path)
        .getDownloadURL()
        .then((url) => {
          this.postContents.imagesRef.push({ url, path });
        })
        .catch((err) => console.log(err));
    },
    deleteImg(index) {
      const files = this.postContents.imagesRef;
      if (confirm("Are you sure?")) {
        firebase
          .storage()
          .ref(files[index].path)
          .delete()
          .then(() => {
            console.log("Deleted the file");
            files.splice(index, 1);
          })
          .catch((err) => console.log(err));
      }
    },
    deleteTag(index) {
      this.postContents.tags.splice(index, 1);
    },
    addTag() {
      this.postContents.tags.push(this.tag);
      this.tag = "";
    },
    update() {
      firebase
        .firestore()
        .collection("posts")
        .doc(this.postId)
        .set({
          ...this.postContents,
          userId: this.userId,
          createdAt: firebase.firestore.Timestamp.now().toDate(),
        })
        .then(() => {
          console.log("Post Updated!");
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
.submit-form {
  display: flex;
  justify-content: center;
}
.form-contents {
  display: flex;
  flex-direction: column;
  width: 50%;
}
.tags-holder {
  border: 1px solid black;
}
.images-holder {
  display: flex;
  border: 1px solid black;
}
.image-container {
  width: 20%;
  height: 100px;
  margin: 5px;
}
img {
  width: 100%;
  height: 100%;
}
</style>
