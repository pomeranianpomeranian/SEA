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
                  class="slide-img zoom img-fluid w-100"
                  :style="{
                    'background-image': 'url(' + image.url + ')',
                  }"
                  @click="openModal(index)"
                ></div>
              </template>
            </b-carousel-slide>
          </b-carousel>
        </b-col>

        <b-col class="contents pr-4 pt-3" cols="6">
          <div>
            <div class="header">
              <h1 class="en-head">{{ postContents.title }}</h1>
              <b-button class="p-0" variant="faded" @click="updateLike">
                <b-icon
                  class="icon"
                  v-if="!postContents.isLiked"
                  icon="bookmark"
                  variant="secondary"
                ></b-icon>
                <b-icon
                  v-else
                  class="icon"
                  icon="bookmark-check-fill"
                  variant="secondary"
                ></b-icon>
              </b-button>
            </div>
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
            <p class="description">{{ postContents.description }}</p>
          </div>
          <div>
            <div
              class="icon-container"
              v-for="(category, index) in postContents.categories"
              :key="index"
            >
              <img
                :id="category"
                class="category-icon"
                :src="getIcon(category)"
              />
              <b-tooltip :target="category" triggers="hover" variant="light">{{
                $t(`category.${category}`)
              }}</b-tooltip>
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
    <b-modal ref="img-modal" hide-footer centered size="xl">
      <div
        class="slide-img img-modal img-fluid"
        :style="{
          'background-image': 'url(' + selectedImage.url + ')',
        }"
      >
        <p>{{ selectedImage.caption }}</p>
      </div>
    </b-modal>
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
      selectedImage: {},
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
    updateLike() {
      this.$store.dispatch("updateLike", this.postId);
    },
    openModal(index) {
      this.selectedImage = {
        ...this.postContents.imagesRef[index],
      };
      this.$refs["img-modal"].show();
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
    this.$store.dispatch("getDetails", this.postId);
    this.$getLocation().then((coordinates) => {
      this.currentPosition = coordinates;
      this.markers.push({
        title: this.$t("map.current"),
        position: this.currentPosition,
      });
      this.markers.push(this.postContents);
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
  destroyed() {
    this.$store.commit("clearContents");
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
.img-modal {
  background-size: contain;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 0.05em;
  color: white;
}
.contents {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.header {
  display: flex;
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
.description {
  margin-top: 30px;
  max-height: 50vh;
  overflow-y: scroll;
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
.category-icon {
  width: 50px;
  height: 50px;
}
.icon {
  width: 30px;
  height: 30px;
}
.map-container {
  border-radius: 2px;
  overflow: hidden;
}
</style>
