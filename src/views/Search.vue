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
      <option disabled>Pick up a category</option>
      <option>Culture</option>
      <option>Nature</option>
      <option>Amusement</option>
      <option>Food</option>
      <option>Shopping</option>
      <option>History</option>
      <option>Sports</option>
      <option>View</option>
    </select>
    <button @click="search">Search</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selected: "",
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
      if (!this.selected) {
        this.$router.push({ name: "result", params: { category: "all" } });
      } else {
        this.$router.push({
          name: "result",
          params: { category: this.selected },
        });
      }
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
