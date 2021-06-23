<template>
  <div>
    <div class="submit-form">
      <postForm />
      <div>
        <button @click="submitPost(false)">{{ $t("form.submit") }}</button>
        <button @click="submitPost(true)">{{ $t("form.save") }}</button>
      </div>
    </div>
    <GmapMap
      :center="currentPotion"
      :zoom="10"
      map-type-id="terrain"
      style="width: 100%; height: 600px"
      @click="getPosition($event)"
    >
      <GmapInfoWindow
        :options="infoOptions"
        :position="infoWindowPos"
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
import postForm from "../components/Form";
export default {
  data() {
    return {
      windowTitle: "hoge",
      selected: "all",
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

  components: {
    postForm,
  },
  methods: {
    submitPost(pending) {
      this.$store.dispatch("submitPost", pending);
    },

    onDragEnd() {
      console.log("hoge");
    },
    toggleInfoWindow(position) {
      this.infoWindowPos = position;
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
          title: "新規登録",
          infowWindow: true,
          position: { lat: event.latLng.lat(), lng: event.latLng.lng() },
        });
      }
      this.windowTitle = "新規登録";
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
};
</script>

<style scoped>
.submit-form {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
