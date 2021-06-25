<template>
  <b-container>
    <b-form-row>
      <b-form @submit.prevent="send">
        <b-form-group :label="`${$t('form.title')} :`" label-for="title">
          <b-form-input
            id="title"
            type="text"
            placeholder="Put a fancy title"
            v-model="postContents.title"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group :label="`${$t('form.category')} :`" label-for="category">
          <b-input-group>
            <b-form-select
              id="category"
              :options="categories"
              v-model="selected"
              required
            ></b-form-select>
            <b-input-group-append>
              <b-button variant="outline-success" @click="addCategory">{{
                $t("form.add")
              }}</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>

        <b-form-group
          :label="`${$t('form.description')} :`"
          label-for="description"
        >
          <b-form-textarea
            id="description"
            placeholder="Describe the place"
            v-model="postContents.description"
            rows="3"
            max-rows="6"
            required
          ></b-form-textarea>
        </b-form-group>

        <b-form-group :label="`${$t('form.image')} :`" label-for="images">
          <b-form-file
            id="images"
            accept=".jpg, .jpeg, .png"
            placeholder="Choose a file or drop it here..."
            @change.self="storeImage"
            required
          ></b-form-file>
        </b-form-group>
        <div v-if="postContents.imagesRef.length">
          <div
            v-for="(image, index) in postContents.imagesRef"
            :key="index"
            @click="deleteImage(index)"
          >
            <img :src="image.url" />
          </div>
        </div>

        <div v-if="$route.name === 'newpost'">
          <b-button type="submit">{{ $t("form.submit") }}</b-button>
          <b-button type="submit">{{ $t("form.save") }}</b-button>
        </div>
        <div v-if="$route.name === 'edit'">
          <b-button type="submit" name="action" value="update">{{
            $t("form.update")
          }}</b-button>
        </div>
      </b-form>
    </b-form-row>
  </b-container>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      selected: "",
      categories: [
        { value: "", text: "Please select categories", disabled: true },
        { value: "culture", text: this.$t("category.culture") },
        { value: "nature", text: this.$t("category.nature") },
        { value: "amusement", text: this.$t("category.amusement") },
        { value: "food", text: this.$t("category.food") },
        { value: "shopping", text: this.$t("category.shopping") },
        { value: "history", text: this.$t("category.history") },
        { value: "sports", text: this.$t("category.sports") },
        { value: "view", text: this.$t("category.view") },
      ],
    };
  },
  methods: {
    ...mapActions(["deleteImage", "storeImage", "submitPost", "updatePost"]),
    addCategory() {
      if (!this.postContents.categories.includes(this.selected)) {
        this.postContents.categories.push(this.selected);
      }
    },
    deleteCategory(index) {
      this.postContents.categories.splice(index, 1);
    },
    send() {
      if (this.$_POST["action"] === "submit") this.submitPost(false);
      else if (this.$_POST["action"] === "save") this.submitPost(true);
      else if (this.$_POST["action"] === "update") this.updatePost;
    },
  },
  computed: {
    postContents() {
      return this.$store.state.post.postContents;
    },
  },
};
</script>
