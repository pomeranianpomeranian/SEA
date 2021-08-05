<template>
  <div class="page-outline">
    <navbar />
    <b-container>
      <b-row>
        <b-col class="pl-0" cols="6">
          <b-carousel class="slide-show" :interval="4000" controls indicators>
            <b-carousel-slide
              v-for="(image, index) in postContents.imagesRef"
              :key="index"
              :caption="image.caption"
            >
              <template #img>
                <div
                  class="slide-img d-block img-fluid w-100"
                  :style="{
                    'background-image': 'url(' + image.url + ')',
                  }"
                ></div>
              </template>
            </b-carousel-slide>
          </b-carousel>
        </b-col>

        <b-col class="contents pr-2 pt-3" cols="6">
          <div>
            <h1 class="en-head">{{ postContents.title }}</h1>
            <div class="user-info">
              <div
                class="avatar"
                v-if="postContents.avatar"
                :style="{
                  'background-image': 'url(' + postContents.avatar + ')',
                }"
              ></div>
              <div class="avatar" v-else>
                <b-icon icon="person-fill"></b-icon>
              </div>
              <span>{{ postContents.username }}</span>
              <span>|</span>
              <span>{{ date }}</span>
            </div>
            <p class="mt-5">{{ postContents.description }}</p>
          </div>
          <div>
            <div
              class="icon-container"
              v-for="(category, index) in postContents.categories"
              :key="index"
            >
              <img :id="category" class="icon" :src="getIcon(category)" />
              <b-tooltip
                :target="category"
                triggers="hover"
                variant="warning"
                >{{ $t(`category.${category}`) }}</b-tooltip
              >
            </div>
          </div>
        </b-col>
        <div class="line"></div>
      </b-row>
    </b-container>
    <b-container>
      <b-row>
        <b-col class="pl-0" cols="6">
          <div class="map-container">
            <GmapMap
              :center="currentPosition"
              :zoom="10"
              map-type-id="terrain"
              style="width: 100%; height: 500px"
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
                @click="getPosition(m)"
              />
            </GmapMap>
          </div>
        </b-col>
        <b-col class="pr-0" cols="6">
          <comment :postId="postId" />
        </b-col>
      </b-row>
    </b-container>
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
    getIcon(category) {
      for (let item of this.categories) {
        if (item.value === category) return item.icon;
      }
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
      let day = timestamp.getDate();
      let month = timestamp.getMonth() + 1;
      const year = timestamp.getFullYear();
      if (day < 10) {
        day = `0${day}`;
      }
      if (month < 10) {
        month = `0${month}`;
      }
      return `${day}/${month}/${year}`;
    },
    categories() {
      return this.$store.state.category.categories;
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
.container {
  background-color: white;
}
.slide-show {
  border-radius: 2px;
  overflow: hidden;
  text-shadow: 1px 1px 2px #333;
}
.slide-img {
  height: 80vh;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}
.contents {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
span {
  margin: 0 10px;
}
.user-info {
  display: flex;
  align-items: center;
  color: rgba(0, 0, 0, 0.5);
}
.avatar {
  display: inline-block;
  background-color: darkgray;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  text-align: center;
  font-size: 24px;
  color: white;
}
.line {
  height: 1px;
  width: 70%;
  margin: 60px auto;
  background-color: rgba(0, 0, 0, 0.1);
}
.icon-container {
  display: inline-block;
  margin-right: 10px;
}
.icon {
  width: 50px;
  height: 50px;
}
.map-container {
  border-radius: 2px;
  overflow: hidden;
}
</style>
