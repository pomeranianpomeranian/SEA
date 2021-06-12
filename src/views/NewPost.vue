<template>
  <div>
    <h1>New Post!</h1>
    <div class="submit-form">
      <div class="form-contents">
        <input type="text" v-model="postContents.title" placeholder="Title" />
        <input
          type="text"
          v-model="postContents.address"
          placeholder="Address"
        />
        <select v-model="selected" @change="addCategory">
          <option disabled>Please pick up categories</option>
          <option>Culture</option>
          <option>Nature</option>
          <option>Amusement</option>
          <option>Food</option>
          <option>Shopping</option>
          <option>History</option>
          <option>Sports</option>
          <option>View</option>
        </select>
        <div class="categories-holder" v-if="postContents.categories.length">
          <span
            v-for="(category, index) in postContents.categories"
            :key="index"
            @click="deleteCategory(index)"
            >{{ category }}
          </span>
        </div>
        <input type="file" @change="storeImage" />
        <div class="images-holder" v-if="postContents.imagesRef.length">
          <div
            class="image-container"
            v-for="(image, index) in postContents.imagesRef"
            :key="index"
            @click="deleteImg(index)"
          >
            <img :src="image.url" />
          </div>
        </div>
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
      selected: "",
      postContents: {
        title: "",
        address: "",
        categories: [],
        imagesRef: [],
        description: "",
      },
    };
  },
  methods: {
    addCategory() {
      if (!this.postContents.categories.includes(this.selected)) {
        this.postContents.categories.push(this.selected);
      }
    },
    deleteCategory(index) {
      this.postContents.categories.splice(index, 1);
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
    deleteImg(index) {
      const files = this.postContents.imagesRef;
      firebase
        .storage()
        .ref(files[index].path)
        .delete()
        .then(() => {
          console.log("Deleted the file");
          files.splice(index, 1);
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
          this.$router.push({
            name: "mypost",
            params: { userId: this.userId, postId: res.id },
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
.categories-holder {
  border: 1px solid black;
  padding: 5px;
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
span {
  border: 1px solid lightgray;
  padding: 2px;
  margin: 0 2px;
}
</style>
