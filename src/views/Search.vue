<template>
  <div>
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
        <router-link
          v-else
          :to="{ name: 'details', params: { postId: selectedMarker.postId } }"
          >{{ selectedMarker.title }}</router-link
        ></GmapInfoWindow
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

    <div class="selected">
      <h1>{{ $t("form.category") }}</h1>
      <h2>{{ selected }}</h2>

      <div class="selectCategory">
        <b-button variant="outline-primary" @click="selectCulture"
          ><img src="../images/H_SHODO.png" alt="" width="50rem" height="50rem"
        /></b-button>
        <b-button variant="outline-secondary" @click="selectNature"
          ><img src="../images/H_KODO.png" alt="" width="50rem" height="50rem"
        /></b-button>
        <b-button variant="outline-success" @click="selectSports"
          ><img src="../images/H_SUMO.png" alt="" width="50rem" height="50rem"
        /></b-button>
        <b-button variant="outline-danger" @click="selectFood"
          ><img
            src="../images/F_WASHOKU.png"
            alt=""
            width="50rem"
            height="50rem"
        /></b-button>
        <b-button variant="outline-warning" @click="selectShopping"
          ><img
            src="../images/B_BAITEN.png"
            alt=""
            width="50rem"
            height="50rem"
        /></b-button>
        <b-button variant="outline-info" @click="selectHistory"
          ><img
            src="../images/H_SHIRO-ATO.png"
            alt=""
            width="50rem"
            height="50rem"
        /></b-button>
        <b-button variant="outline-dark" @click="selectView"
          ><img
            src="../images/N_HINODE.png"
            alt=""
            width="50rem"
            height="50rem"
        /></b-button>
        <b-button variant="outline-light" @click="selectAmusement"
          ><img src="../images/H_NINJA.png" alt="" width="50rem" height="50rem"
        /></b-button>
      </div>

      <!--<select v-model="selected">
      <option value="all">{{ $t("category.all") }}</option>
      <option value="culture">{{ $t("category.culture") }}</option>
      <option value="nature">{{ $t("category.nature") }}</option>
      <option value="amusement">{{ $t("category.amusement") }}</option>
      <option value="food">{{ $t("category.food") }}</option>
      <option value="shopping">{{ $t("category.shopping") }}</option>
      <option value="history">{{ $t("category.history") }}</option>
      <option value="sports">{{ $t("category.sports") }}</option>
      <option value="view">{{ $t("category.view") }}</option>
    </select-->
      <button @click="search">{{ $t("search.search") }}</button>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  data() {
    return {
      selected: "all",
      selectedMarker: {},
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

  methods: {
    toggleInfoWindow(marker) {
      this.infoWindowPos = marker.position;
      this.infoWinOpen = true;
    },
    selectCulture() {
      this.selected = "culture";
    },
    selectNature() {
      this.selected = "nature";
    },
    selectSports() {
      this.selected = "sports";
    },
    selectFood() {
      this.selected = "food";
    },
    selectShopping() {
      this.selected = "shopping";
    },
    selectHistory() {
      this.selected = "history";
    },
    selectView() {
      this.selected = "view";
    },
    selectAmusement() {
      this.selected = "amusement";
    },
    search() {
      this.$router.push({
        name: "result",
        params: { category: this.selected },
      });
    },
    getPosition(marker) {
      this.selectedMarker = marker;
      this.toggleInfoWindow(marker);
    },
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
