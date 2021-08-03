<template>
  <div>
    <navbar />
    <b-container class="top">
      <b-row class="submit-form">
        <b-col cols="6 mt-3">
          <postForm />
        </b-col>
        <b-col cols="6">
          <p class="mt-3 mb-2">{{ $t("form.location") }}</p>
          <GmapMap
            class=""
            :center="currentPosition"
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
          <div class="mt-4">
            <b-button
              class="col-6"
              variant="outline-info"
              type="button"
              size="lg"
              @click="submitPost(false)"
              v-bind="{ disabled: !completed }"
              >{{ $t("form.submit") }}</b-button
            >
            <b-button
              class="col-6"
              variant="outline-dark"
              type="button"
              size="lg"
              @click="submitPost(true)"
              v-bind="{ disabled: !completed }"
              >{{ $t("form.translate") }}</b-button
            >
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import navbar from "../components/Navbar";
import postForm from "../components/Form";
import { mapActions } from "vuex";
export default {
  components: {
    navbar,
    postForm,
  },
  data() {
    return {
      selected: "all",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
      },
      windowTitle: "hoge",
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
    };
  },
  methods: {
    ...mapActions(["submitPost"]),
    toggleInfoWindow(position) {
      this.postContents.position = position;
      this.infoWinOpen = true;
    },
    getPosition: function (event) {
      if (this.markers.length >= 1) {
        this.markers.splice(1);
      }
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
      this.currentPosition = coordinates;
      this.markers.push({
        position: this.currentPosition,
      });
    });
    this.$store.commit("clearContents");
  },
  computed: {
    postContents() {
      return this.$store.state.post.postContents;
    },
    completed() {
      if (
        this.postContents.title &&
        this.postContents.description &&
        this.postContents.categories.length &&
        this.postContents.imagesRef.length &&
        this.postContents.position
      )
        return true;
      else return false;
    },
  },
};
</script>
