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
    <div>
      <button @click="edit">Edit</button>
      <button @click="deleteFiles">Delete</button>
    </div>
  </div>
</template>
<script>
export default {
  props: ["postId"],
  methods: {
    edit() {
      this.$router.push({
        name: "edit",
        params: { userId: this.userId, postId: this.postId },
      });
    },
    deleteFiles() {
      if (confirm("Are you sure?")) {
        this.$store.dispatch("deleteFiles", this.postId);
      }
    },
  },
  computed: {
    userId() {
      return this.$store.state.auth.userId;
    },
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
