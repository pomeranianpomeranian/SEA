<template>
  <b-container>
    <b-alert class="text-center" :show="alert" fade variant="danger">{{
      $t("form.validation.submit")
    }}</b-alert>
    <b-form @submit.prevent="submitPost">
      <b-form-row>
        <b-col cols="6">
          <b-form-group
            :label="`${$t('form.title')} :`"
            label-for="title"
            :description="$t('form.instruction.title')"
          >
            <b-form-input
              id="title"
              type="text"
              v-model="postContents.title"
              :state="titleValidation"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group
            :label="`${$t('form.category')} :`"
            label-for="category"
            :description="$t('form.instruction.category')"
          >
            <b-form-checkbox
              v-for="(category, index) in categories"
              :key="index"
              button
              button-variant="outline-info"
              v-b-popover.hover.top="$t(`category.${category.value}`)"
              v-model="category.selected"
              style="background-color: white"
            >
              <img :src="category.icon" width="30rem" height="30rem" />
            </b-form-checkbox>
          </b-form-group>

          <b-form-group
            :label="`${$t('form.description')} :`"
            label-for="description"
          >
            <b-form-textarea
              id="description"
              v-model="postContents.description"
              rows="8"
              :state="descriptionValidation"
              required
            ></b-form-textarea>
          </b-form-group>

          <b-form-group
            :label="`${$t('form.image')} :`"
            label-for="images"
            label-class="pointer"
            :description="$t('form.instruction.image')"
          >
            <b-form-file
              id="images"
              accept=".jpg, .jpeg, .png"
              multiple
              style="display: none"
              @change="storeImage"
            />
            <div class="round" v-if="postContents.imagesRef.length">
              <b-carousel controls>
                <b-carousel-slide
                  v-for="(image, index) in postContents.imagesRef"
                  :key="index"
                >
                  <template #img>
                    <div
                      class="slide-img zoom img-fluid"
                      :style="{
                        'background-image': 'url(' + image.url + ')',
                      }"
                      @click="openModal(index)"
                    ></div>
                  </template>
                </b-carousel-slide>
              </b-carousel>
            </div>

            <div class="img-placeholder" v-else>
              <b-button type="button" variant="faded" @click="openFile">
                <b-icon icon="cloud-arrow-up" width="3rem" height="3rem" />
              </b-button>
            </div>

            <b-modal
              v-if="postContents.imagesRef.length"
              ref="img-modal"
              hide-footer
              centered
              size="lg"
            >
              <div
                class="slide-img img-modal img-fluid"
                :style="{
                  'background-image': 'url(' + selectedImage.url + ')',
                }"
              >
                <p>{{ selectedImage.caption }}</p>
              </div>
              <b-form-group
                :label="`${$t('form.modal.caption')} :`"
                label-for="caption"
                :description="$t('form.instruction.caption')"
              >
                <b-form-input
                  id="caption"
                  type="text"
                  v-model="selectedImage.caption"
                  :state="captionValidation"
                ></b-form-input>
              </b-form-group>
              <div class="modal-button">
                <b-button
                  class="button"
                  type="button"
                  variant="outline-info"
                  :disabled="!captionValidation"
                  @click="saveCaption"
                  >{{ $t("form.modal.save") }}</b-button
                >
                <b-button
                  class="button"
                  type="button"
                  variant="outline-dark"
                  @click="deleteImage(selectedImage.path)"
                  >{{ $t("form.modal.delete") }}</b-button
                >
              </div>
            </b-modal>
          </b-form-group>
        </b-col>
        <b-col cols="6">
          <p class="mb-2">{{ $t("form.location") }}</p>
          <div class="round">
            <GmapMap
              :center="currentPosition"
              :zoom="15"
              map-type-id="terrain"
              style="width: 100%; height: 550px"
              @click="getPosition($event)"
            >
              <GmapMarker :position="markerPosition" />
            </GmapMap>
          </div>
          <b-form-checkbox
            class="mt-4"
            v-model="postContents.pending"
            :value="true"
            :unchecked-value="false"
            size="lg"
          >
            {{ $t("form.translate") }}
          </b-form-checkbox>
          <div class="mt-4">
            <b-button
              v-if="$route.name === 'newpost'"
              class="col"
              variant="outline-info"
              type="submit"
              size="lg"
              >{{ $t("form.submit") }}</b-button
            >
            <b-button
              v-if="$route.name === 'edit'"
              class="col"
              variant="outline-info"
              type="submit"
              size="lg"
              >{{ $t("form.update") }}</b-button
            >
          </div>
        </b-col>
      </b-form-row>
    </b-form>
  </b-container>
</template>

<script>
export default {
  props: ["postId"],
  data() {
    return {
      selectedImage: {},
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
      },
      currentPosition: {},
      markerPosition: {},
      alert: false,
    };
  },
  methods: {
    storeImage(event) {
      this.$store.dispatch("storeImage", event);
    },
    deleteImage(path) {
      this.$refs["img-modal"].hide();
      this.$store.dispatch("deleteImage", path);
    },
    openFile() {
      document.getElementById("images").click();
    },
    openModal(index) {
      this.selectedImage = {
        ...this.postContents.imagesRef[index],
        index,
      };
      this.$refs["img-modal"].show();
    },
    saveCaption() {
      this.postContents.imagesRef[this.selectedImage.index].caption =
        this.selectedImage.caption;
      this.$refs["img-modal"].hide();
    },
    getPosition(event) {
      this.postContents.position = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      };
      this.markerPosition = this.postContents.position;
    },
    submitPost() {
      this.categories.forEach((category) => {
        if (category.selected) {
          if (this.postContents.categories.includes(category.value)) return;
          else this.postContents.categories.push(category.value);
        }
      });
      if (this.completed) {
        if (this.$route.name === "newpost") this.$store.dispatch("submitPost");
        else if (this.$route.name === "edit")
          this.$store.dispatch("updatePost", this.postId);
      } else this.alert = true;
    },
  },
  computed: {
    postContents() {
      return this.$store.state.post.submitContents;
    },
    categories() {
      const categories = [];
      this.$store.state.category.categories.forEach((category) => {
        if (category.value !== "all") {
          category.text = this.$t(`category.${category.value}`);
          if (this.postContents.categories.includes(category.value))
            category.selected = true;
          else category.selected = false;
          categories.push(category);
        }
      });
      return categories;
    },
    titleValidation() {
      if (this.postContents.title == null) return null;
      else
        return (
          this.postContents.title.length > 0 &&
          this.postContents.title.length <= 30
        );
    },
    descriptionValidation() {
      if (this.postContents.description == null) return null;
      else return this.postContents.description.length > 0;
    },
    captionValidation() {
      if (!this.selectedImage.caption) return null;
      else return this.selectedImage.caption.length <= 50;
    },
    imageValidation() {
      return (
        this.postContents.imagesRef.length &&
        this.postContents.imagesRef.length <= 5
      );
    },
    completed() {
      const post = this.postContents;
      if (
        this.titleValidation &&
        post.categories.length &&
        this.descriptionValidation &&
        this.imageValidation &&
        post.position
      )
        return true;
      else return false;
    },
  },
  created() {
    this.$getLocation()
      .then((coordinates) => {
        this.currentPosition = coordinates;
        if (this.postContents.position)
          this.markerPosition = this.postContents.position;
      })
      .catch(() => {
        this.currentPosition = {
          lat: 35.6812,
          lng: 139.7671,
        };
      });
  },
};
</script>

<style scoped>
.category-img {
  width: calc(100% / 7);
}
.slide-img {
  height: 25vh;
  width: 100%;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}
.img-modal {
  height: 60vh;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 0.05em;
  color: white;
}
.img-placeholder {
  height: 25vh;
  background-color: white;
  border-radius: 0.25rem;
  border: 1px solid #ced4da;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.modal-button {
  display: flex;
  margin: 15px 0 0 0;
}
.button {
  width: 50%;
}

.round {
  border-radius: 0.25rem;
  overflow: hidden;
}
</style>
