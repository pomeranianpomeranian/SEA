<template>
  <div>
    <navbar />
    <div class="container top">
      <b-card no-body class="overflow-hidden">
        <b-row no-gutters>
          <b-col cols="4">
            <div class="images-container d-flex p-3">
              <b-card-img
                class="img-thumbnail"
                v-for="(image, index) in postContents.imagesRef"
                :key="index"
                :src="image.url"
              ></b-card-img>
            </div>
          </b-col>
          <b-col cols="8">
            <b-card-body
              class="card-body container"
              :title="postContents.title"
            >
              <div>
                <b-card-text>
                  {{ postContents.description }}
                </b-card-text>
              </div>
              <div>
                <span
                  class="badge bg-info text-light"
                  v-for="(category, index) in postContents.categories"
                  :key="index"
                  >#{{ category }}</span
                >
              </div>
              <div>
                <comment :postId="postId"></comment>
              </div>
            </b-card-body>
          </b-col>
        </b-row>
        <div class="container p-5">
          <GmapMap
            :center="currentPosition"
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
              ><span>
                {{ selectedMarker.title }}
              </span>
            </GmapInfoWindow>
            <GmapMarker
              :key="index"
              v-for="(m, index) in markers"
              :position="m.position"
              :clickable="true"
              :draggable="true"
              @click="getPosition(m)"
            />
          </GmapMap>
        </div>
        <template #footer>
          <p class="footer mb-0 text-muted">Last updated : {{ date }}</p>
        </template>
      </b-card>
    </div>
  </div>
</template>

<script>
import comment from "../components/Comment";
import navbar from "../components/Navbar.vue";
export default {
  props: ["postId"],
  components: {
    comment,
    navbar,
  },
  data() {
    return {
      selectedMarker: {},
      markers: [],
      currentPosition: {},
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
      this.selectedMarker = marker;
      this.toggleInfoWindow(marker);
    },
  },
  computed: {
    userId() {
      return this.$store.state.auth.userId;
    },
    postContents() {
      return this.$store.state.post.postContents;
    },
    date() {
      const timestamp = this.postContents.createdAt.toDate();
      return `${timestamp.getFullYear()}/${
        timestamp.getMonth() + 1
      }/${timestamp.getDate()}`;
    },
  },
  created() {
    this.$getLocation()
      .then((coordinates) => {
        this.currentPosition = coordinates;
        this.markers.push({
          title: this.$t("map.current"),
          position: this.currentPosition,
        });
      })
      .then(() => this.$store.dispatch("getDetails", this.postId));
    this.markers.push(this.postContents);
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

<style scoped>
.images-container {
  width: 100%;
  overflow-x: scroll;
}
.badge {
  font-size: 1rem;
  margin-right: 0.5rem;
}
.card-body {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.footer {
  text-align: end;
}
</style>
