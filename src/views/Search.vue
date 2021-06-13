<template>
  <div>
    <h1>This is Search Page!</h1>

    <p>
      ここにgoogle
      mapと検索バーとか置く（ユーザーがホームの次に訪れるページのイメージ）
    </p>
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
    };
  },
  methods: {
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
};
</script>
