<template>
  <div>
    <h1>This is Search Page!</h1>

    <p>
      ここにgoogle
      mapと検索バーとか置く（ユーザーがホームの次に訪れるページのイメージ）
    </p>

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
      >
        hoge</GmapInfoWindow
      >
      <GmapMarker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :clickable="true"
        :draggable="true"
        @click="center = m.position"
      />
    </GmapMap>

    <select v-model="selected">
      <option value="all">{{ $t("category.all") }}</option>
      <option value="culture">{{ $t("category.culture") }}</option>
      <option value="nature">{{ $t("category.nature") }}</option>
      <option value="amusement">{{ $t("category.amusement") }}</option>
      <option value="food">{{ $t("category.food") }}</option>
      <option value="shopping">{{ $t("category.shopping") }}</option>
      <option value="history">{{ $t("category.history") }}</option>
      <option value="sports">{{ $t("category.sports") }}</option>
      <option value="view">{{ $t("category.view") }}</option>
    </select>
    <button @click="search">{{ $t("search.search") }}</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selected: "all",
      currentPotion: {},
      markers: [
        { position: { lat: 10, lng: 10 } },
        { position: { lat: 11, lng: 11 } },
      ],
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
  created: function () {
    this.$getLocation().then((coordinates) => {
      console.log(coordinates);
      this.currentPotion = coordinates;
      this.markers.push({
        position: this.currentPotion,
      });
    });
  },

  methods: {
    onDragEnd() {
      console.log("hoge");
    },
    toggleInfoWindow(marker) {
      this.infoWindowPos = marker.position;
      this.infoWinOpen = true;
    },
    search() {
      this.$router.push({
        name: "result",
        params: { category: this.selected },
      });
    },
  },
  mounted: function () {
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
    console.log(url);

    fetch(url, {
      mode: "no-cors",
    })
      .then((res) => {
        console.log("status", res.status);
        console.log("body", res.data);
        return res.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  },
};
</script>
