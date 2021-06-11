<template>
  <div>
    <h1>This is {{ userId }}'s New Post Form!</h1>
    <p>ここで新たに投稿を追加できる。</p>
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
        <input type="file" @change="storeImage" />
        <textarea
          v-model="postContents.description"
          cols="30"
          rows="10"
          placeholder="Description"
        ></textarea>
        <button @click="submit">Submit</button>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  data() {
    return {
      tag: "",
      postContents: {
        title: "",
        address: "",
        tags: [],
        imagesRef: [],
        description: "",
      },
    };
  },
  methods: {
    addTag() {
      this.postContents.tags.push(this.tag);
      this.tag = "";
    },
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
    submit() {
      firebase
        .firestore()
        .collection("posts")
        .add({
          ...this.postContents,
          userId: this.userId,
          createdAt: firebase.firestore.Timestamp.now().toDate(),
        })
        .then((res) => {
          console.log(res.id);
        })
        .catch((err) => console.log(err));
    },
  },
  computed: {
    userId() {
      return this.$store.state.auth.userId;
    },
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
</style>
