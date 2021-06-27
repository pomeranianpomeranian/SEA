<template>
  <div class="container mt-3">
    <GmapMap
      :center="currentPotion"
      :zoom="10"
      map-type-id="terrain"
      style="width: 100%; height: 600px"
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
            :src="getIcon(selectedMarker.icon)"
            width="30rem"
            height="30rem"
          />
          <router-link
            :to="{ name: 'details', params: { postId: selectedMarker.postId } }"
            >{{ selectedMarker.title }}
          </router-link>
        </div></GmapInfoWindow
      >
      <GmapMarker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :clickable="true"
        :draggable="true"
        @click="getPosition(m)"
      />
    </GmapMap>

    <div class="selectCategory">
      <b-button
        v-for="(category, index) in categories"
        :key="index"
        v-b-popover.hover.top="category.text"
        variant="outline-info"
        @click="search(category.value)"
      >
        <img :src="getIcon(category.icon)" width="50rem" height="50rem" />
      </b-button>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  data() {
    return {
      selectedMarker: {},
      categories: [
        {
          text: this.$t("category.all"),
          icon: "H_SHODO.png",
          value: "all",
        },
        {
          text: this.$t("category.culture"),
          icon: "H_SHODO.png",
          value: "culture",
        },
        {
          text: this.$t("category.nature"),
          icon: "H_KODO.png",
          value: "nature",
        },
        {
          text: this.$t("category.sports"),
          icon: "H_SUMO.png",
          value: "sports",
        },
        {
          text: this.$t("category.food"),
          icon: "F_WASHOKU.png",
          value: "food",
        },
        {
          text: this.$t("category.shopping"),
          icon: "B_BAITEN.png",
          value: "shopping",
        },
        {
          text: this.$t("category.history"),
          icon: "H_SHIRO-ATO.png",
          value: "history",
        },
        {
          text: this.$t("category.view"),
          icon: "N_HINODE.png",
          value: "view",
        },
      ],
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
    search(category) {
      this.$router.push({
        name: "result",
        params: { category },
      });
    },
    getPosition(marker) {
      this.selectedMarker = {
        ...marker,
        icon: this.selectIcon(marker),
      };
      this.toggleInfoWindow(marker);
    },
    getIcon(icon) {
      return require(`@/images/${icon}`);
    },
    selectIcon(marker) {
      if (marker.categories) {
        for (let category of this.categories) {
          if (category.value === marker.categories[0]) {
            return category.icon;
          }
        }
      }
    },
  },
  created() {
    this.$getLocation().then((coordinates) => {
      this.currentPotion = coordinates;
      this.markers.push({
        title: this.$t("map.current"),
        position: this.currentPotion,
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
.selected {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.selected h2 {
  color: rgba(0, 0, 0, 0.5);
}
.selectCategory {
  display: flex;
  justify-content: space-around;
  padding: 30px 150px;
}
</style>
