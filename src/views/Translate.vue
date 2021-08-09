<template>
  <div class="page-outline">
    <navbar />
    <b-container>
      <b-row>
        <b-col cols="6">
          <div class="client">
            <b-carousel class="slide-show" :interval="4000" controls indicators>
              <b-carousel-slide
                v-for="(image, index) in postContents.imagesRef"
                :key="index"
              >
                <template #img>
                  <div
                    class="slide-img d-block img-fluid w-100"
                    :style="{
                      'background-image': 'url(' + image.url + ')',
                    }"
                    @click="openModal(index)"
                  ></div>
                </template>
              </b-carousel-slide>
            </b-carousel>
            <div class="p-3">
              <h2 class="en-head text-center">{{ postContents.title }}</h2>
              <p class="description">{{ postContents.description }}</p>
            </div>
          </div>
        </b-col>
        <b-col cols="6">
          <div class="translation p-3">
            <b-alert class="text-center" :show="alert" fade variant="danger">{{
              $t("form.validation.submit")
            }}</b-alert>
            <b-form class="form" @submit.prevent="sendSuggestion">
              <div>
                <b-form-group
                  :label="`${$t('form.title')} :`"
                  label-for="title"
                  :description="$t('form.instruction.title')"
                >
                  <b-form-input
                    id="title"
                    type="text"
                    size="lg"
                    v-model="submitContents.title"
                    :state="titleValidation"
                    required
                  ></b-form-input>
                </b-form-group>

                <b-form-group
                  :label="`${$t('form.description')} :`"
                  label-for="description"
                >
                  <b-form-textarea
                    id="description"
                    v-model="submitContents.description"
                    rows="12"
                    :state="descriptionValidation"
                    required
                  ></b-form-textarea>
                </b-form-group>
              </div>
              <div>
                <b-button
                  class="w-100"
                  variant="outline-info"
                  type="submit"
                  size="lg"
                  >{{ $t("form.send") }}</b-button
                >
              </div>
            </b-form>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import navbar from "../components/Navbar";
export default {
  props: ["postId"],
  components: {
    navbar,
  },
  data() {
    return {
      submitContents: {
        title: null,
        description: null,
      },
      alert: false,
    };
  },
  methods: {
    sendSuggestion() {
      if (this.titleValidation && this.descriptionValidation) {
        this.$store.dispatch("sendSuggestion", {
          ...this.submitContents,
          postId: this.postId,
        });
      } else this.alert = true;
    },
  },
  computed: {
    postContents() {
      return this.$store.state.post.postContents;
    },
    titleValidation() {
      if (this.submitContents.title == null) return null;
      else
        return (
          this.submitContents.title.length > 0 &&
          this.submitContents.title.length <= 30
        );
    },
    descriptionValidation() {
      if (this.submitContents.description == null) return null;
      else return this.submitContents.description.length > 0;
    },
  },
  created() {
    this.$store.dispatch("getDetails", this.postId);
  },
  destroyed() {
    this.$store.commit("clearContents");
  },
};
</script>

<style scoped>
.client {
  background-color: white;
  border-radius: 2px;
  overflow: hidden;
}
.slide-show {
  text-shadow: 1px 1px 2px #333;
}
.slide-img {
  height: 45vh;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}
.description {
  margin-top: 15px;
  max-height: 25vh;
  overflow-y: scroll;
}
.translation {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: white;
  border-radius: 2px;
}
.form {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
