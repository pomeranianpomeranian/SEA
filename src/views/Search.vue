<template>
  <div>
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
      selected: "",
    };
  },
  methods: {
    search() {
      this.$router.push({
        name: "result",
        params: { category: this.selected },
      });
    },
  },
};
</script>
