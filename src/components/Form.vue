<template>
<<<<<<< HEAD
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
=======
  <div class="form-contents">
    <input
      type="text"
      v-model="postContents.title"
      :placeholder="$t('form.title')"
    />
    <select v-model="selected" @change="addCategory">
      <option value="culture">{{ $t("category.culture") }}</option>
      <option value="nature">{{ $t("category.nature") }}</option>
      <option value="amusement">{{ $t("category.amusement") }}</option>
      <option value="food">{{ $t("category.food") }}</option>
      <option value="shopping">{{ $t("category.shopping") }}</option>
      <option value="history">{{ $t("category.history") }}</option>
      <option value="sports">{{ $t("category.sports") }}</option>
      <option value="view">{{ $t("category.view") }}</option>
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
      :placeholder="$t('form.description')"
    ></textarea>
    <GmapMap
      :center="currentPotion"
      :zoom="10"
      map-type-id="terrain"
      style="width: 100%; height: 600px"
      @click="getPosition($event)"
    >
      <GmapInfoWindow
        :options="infoOptions"
        :position="postContents.position"
        :opened="infoWinOpen"
        @closeclick="infoWinOpen = false"
      >
        {{ windowTitle }}</GmapInfoWindow
      >
      <GmapMarker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :clickable="true"
        :draggable="true"
        @click="toggleInfoWindow(m.position)"
      />
    </GmapMap>
  </div>
>>>>>>> 1c91ebb5c8886caa9c4bfdd584724ec95f1b41e0
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      windowTitle: "hoge",
      selected: "",
<<<<<<< HEAD
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
=======
      currentPotion: {},
      markers: [],
      infoOptions: {
        pixelOffset: {
          width: 0,
          height: -35,
        },
      },
      infoWindowPos: null,
      infoWinOpen: false,
>>>>>>> 1c91ebb5c8886caa9c4bfdd584724ec95f1b41e0
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
<<<<<<< HEAD
    send() {
      if (this.$_POST["action"] === "submit") this.submitPost(false);
      else if (this.$_POST["action"] === "save") this.submitPost(true);
      else if (this.$_POST["action"] === "update") this.updatePost;
    },
=======
    toggleInfoWindow(position) {
      this.postContents.position = position;
      this.infoWinOpen = true;
    },
    getPosition: function (event) {
      if (this.markers.length >= 1) {
        this.markers.splice(1);
      }
      console.log(event.latLng.lat());
      if (event) {
        this.markers.push({
          id: this.markers.length,
          title: this.postContents.title,
          infowWindow: true,
          position: { lat: event.latLng.lat(), lng: event.latLng.lng() },
        });
      }
      this.windowTitle = this.postContents.title;
      this.toggleInfoWindow({
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      });
    },
  },
  created() {
    this.$getLocation().then((coordinates) => {
      console.log(coordinates);
      this.currentPotion = coordinates;
      this.markers.push({
        position: this.currentPotion,
      });
    });
    this.$store.commit("clearContents");
>>>>>>> 1c91ebb5c8886caa9c4bfdd584724ec95f1b41e0
  },
  computed: {
    postContents() {
      return this.$store.state.post.postContents;
    },
  },
};
</script>
