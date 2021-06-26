<template>
  <b-container>
    <b-form-row>
      <b-form class="col">
        <b-form-group :label="`${$t('form.title')} :`" label-for="title">
          <b-form-input
            id="title"
            type="text"
            :placeholder="$t('placeholder.title')"
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
          <div class="categories-list my-2 p-1">
            <span>{{ $t("form.selected") }}</span>
            <span
              class="category p-1 mx-1"
              v-for="(category, index) in postContents.categories"
              :key="index"
              @click="deleteCategory(index)"
            >
              {{ $t(`category.${category}`) }}
            </span>
          </div>
        </b-form-group>

        <b-form-group
          :label="`${$t('form.description')} :`"
          label-for="description"
        >
          <b-form-textarea
            id="description"
            :placeholder="$t('placeholder.description')"
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
            :placeholder="$t('placeholder.image')"
            @change.self="storeImage"
            required
          ></b-form-file>
        </b-form-group>

        <p class="mb-2">{{ $t("form.preview") }}</p>
        <b-container class="img-container">
          <p v-if="postContents.imagesRef.length">
            {{ $t("placeholder.delete") }}
          </p>
          <b-container class="d-flex" v-if="postContents.imagesRef.length">
            <b-row
              cols="7"
              v-for="(image, index) in postContents.imagesRef"
              :key="index"
              @click="deleteImage(index)"
            >
              <b-img :src="image.url" fluid thumbnail />
            </b-row>
          </b-container>
        </b-container>
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
        { value: "", text: this.$t("placeholder.category"), disabled: true },
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
};
</script>

<style scoped>
.img-container {
  border: 1px solid lightgray;
  border-radius: 0.3rem;
  min-height: 15rem;
}
img {
  cursor: pointer;
}
.categories-list {
  border: 1px solid lightgray;
  border-radius: 0.2rem;
}
.category {
  font-weight: bold;
  cursor: pointer;
}
</style>
