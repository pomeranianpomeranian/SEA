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
        <input type="file" accept=".jpg, .jpeg, .png" @change="storeImage" />
        <div class="images-holder" v-if="postContents.imagesRef.length">
          <div
            class="image-container"
            v-for="(image, index) in postContents.imagesRef"
            :key="index"
            @click="deleteImage(index)"
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
        <button @click="updatePost({ postId, postContents })">Update</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: ["postId"],
  data() {
    return {
      selected: "",
    };
  },
  methods: {
    ...mapActions(["deleteImage", "storeImage", "updatePost"]),
    addCategory() {
      if (!this.postContents.categories.includes(this.selected)) {
        this.postContents.categories.push(this.selected);
      }
    },
    deleteCategory(index) {
      this.postContents.categories.splice(index, 1);
    },
  },
  computed: {
    postContents() {
      return this.$store.state.post.postContents;
    },
  },
  created() {
    this.$store.dispatch("getDetails", this.postId);
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
