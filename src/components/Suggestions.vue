<template>
  <div class="container">
    <h5 class="text-center">{{ $t("form.suggestion") }}</h5>
    <div class="suggestion-holder my-3">
      <p>{{ $t("form.username") }} :</p>
      <p class="body">{{ suggestions[index].name }}</p>
      <hr />
      <p>{{ $t("form.title") }} :</p>
      <p class="body">{{ suggestions[index].title }}</p>
      <hr />
      <p>{{ $t("form.description") }} :</p>
      <p class="body">{{ suggestions[index].description }}</p>
    </div>
    <div class="overflow-auto">
      <b-pagination
        align="center"
        v-model="selected"
        :total-rows="numSuggestions"
        per-page="1"
      ></b-pagination>
    </div>
  </div>
</template>

<script>
export default {
  props: ["suggestions"],
  data() {
    return {
      selected: 1,
    };
  },
  computed: {
    numSuggestions() {
      return this.suggestions.length;
    },
    index() {
      return this.selected - 1;
    },
  },
};
</script>

<style scoped>
.suggestion-holder {
  border: 1px solid lightgray;
  border-radius: 0.5rem;
  width: 100%;
  padding: 10px;
}
p {
  text-align: start;
}
.body {
  font-weight: bold;
}
</style>
