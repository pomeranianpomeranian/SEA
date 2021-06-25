<template>
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
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      windowTitle: "hoge",
      selected: "",
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
    };
  },
  methods: {
    ...mapActions(["deleteImage", "storeImage"]),
    addCategory() {
      if (!this.postContents.categories.includes(this.selected)) {
        this.postContents.categories.push(this.selected);
      }
    },
    deleteCategory(index) {
      this.postContents.categories.splice(index, 1);
    },
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
  },
  computed: {
    postContents() {
      return this.$store.state.post.postContents;
    },
  },
};
</script>

<style scoped>
.form-contents {
  display: flex;
  flex-direction: column;
  width: 45%;
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
