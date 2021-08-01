<template>
  <div class="page-outline">
    <div class="container">
      <navbar />
      <GmapMap
        :center="currentPosition"
        :zoom="10"
        map-type-id="terrain"
        style="width: 100%; height: 70vh"
        justifiy-content-center
      >
        <GmapInfoWindow
          :options="infoOptions"
          :position="infoWindowPos"
          :opened="infoWinOpen"
          @closeclick="infoWinOpen = false"
          ><span v-if="!selectedMarker.postId">{{ selectedMarker.title }}</span>
          <div v-else>
            <img
              v-for="(category, index) in selectedMarker.categories"
              :key="index"
              :src="getIcon(`${category}.png`)"
              width="30rem"
              height="30rem"
            />
            <router-link
              :to="{
                name: 'details',
                params: { postId: selectedMarker.postId },
              }"
              >{{ selectedMarker.title }}
            </router-link>
          </div></GmapInfoWindow
        >
        <GmapMarker
          :key="index"
          v-for="(marker, index) in selectedMarkers"
          :position="marker.position"
          :clickable="true"
          :draggable="false"
          @click="getPosition(marker)"
        />
      </GmapMap>

      <div class="categories">
        <b-button
          v-for="(category, index) in categories"
          :key="index"
          v-b-popover.hover.top="category.text"
          variant="outline-info"
          @click="selectedCategory = category.value"
        >
          <img
            :src="getIcon(`${category.value}.png`)"
            width="50rem"
            height="50rem"
          />
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>
import navbar from "../components/Navbar.vue";
import firebase from "firebase";
export default {
  components: {
    navbar,
  },
  data() {
    return {
      selectedCategory: "all",
      selectedMarker: {},
      categories: [
        {
          text: this.$t("category.all"),
          value: "all",
        },
        {
          text: this.$t("category.culture"),
          value: "culture",
        },
        {
          text: this.$t("category.nature"),
          value: "nature",
        },
        {
          text: this.$t("category.sports"),
          value: "sports",
        },
        {
          text: this.$t("category.food"),
          value: "food",
        },
        {
          text: this.$t("category.shopping"),
          value: "shopping",
        },
        {
          text: this.$t("category.history"),
          value: "history",
        },
        {
          text: this.$t("category.view"),
          value: "view",
        },
      ],
      currentPosition: {},
      markers: [],
      infoOptions: {
        pixelOffset: {
          width: 0,
          height: -35,
        },
      },
      infoWindowPos: null,
      infoWinOpen: false,
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
      },
    };
  },
  methods: {
    toggleInfoWindow(marker) {
      this.infoWindowPos = marker.position;
      this.infoWinOpen = true;
    },
    getPosition(marker) {
      this.selectedMarker = {
        ...marker,
      };
      this.toggleInfoWindow(marker);
    },
    getIcon(icon) {
      return require(`@/images/${icon}`);
    },
  },
  computed: {
    selectedMarkers() {
      if (this.selectedCategory === "all") return this.markers;
      else
        return this.markers.filter((marker) =>
          marker.categories.includes(this.selectedCategory)
        );
    },
  },
  created() {
    this.$getLocation().then((coordinates) => {
      this.currentPosition = coordinates;
      this.markers.push({
        title: this.$t("map.current"),
        position: this.currentPosition,
        categories: [],
      });
    });
    firebase
      .firestore()
      .collection("posts")
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          this.markers.push({
            id: this.markers.length,
            postId: doc.id,
            ...doc.data(),
          });
        });
      });
  },
  mounted() {
    let origin = "41.43206,-81.38992";
    let destination = "46.43206,-80.38992";
    let key = "AIzaSyBdqpd-ViC5zdoC3XS1lOjhSNfNBcaznkw";
    let url =
      "/maps/api/directions/json?origin=" +
      origin +
      "&destination=" +
      destination +
      "&key=" +
      key;

    fetch(url, {
      mode: "no-cors",
    })
      .then((res) => {
        return res.json();
      })
      .catch((err) => {
        console.log("err", err);
      });
  },
};
</script>

<style>
.categories {
  display: flex;
  justify-content: space-around;
  padding: 30px 150px;
  margin-top: 20px;
}
</style>
