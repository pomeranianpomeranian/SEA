<template>
  <div class="container">
    <div class="next">
      <button @click="back" v-bind="{ disabled: selected === 0 }">back</button>
    </div>
    <div class="suggestion-holder">
      <p class="header">{{ $t("form.username") }}</p>
      <p>{{ suggestions[selected].name }}</p>
      <hr />
      <p class="header">{{ $t("form.title") }}</p>
      <p>{{ suggestions[selected].title }}</p>
      <hr />
      <p class="header">{{ $t("form.description") }}</p>
      <p>{{ suggestions[selected].description }}</p>
    </div>
    <div class="next">
      <button
        @click="next"
        v-bind="{ disabled: selected === suggestions.length - 1 }"
      >
        next
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["suggestions"],
  data() {
    return {
      selected: 0,
    };
  },
  methods: {
    next() {
      this.selected += 1;
    },
    back() {
      this.selected -= 1;
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  width: 45%;
  border: 1px solid darkgray;
}
button {
  height: 100%;
}
.next {
  width: 10%;
}
.back {
  width: 10%;
}
.suggestion-holder {
  width: 80%;
  padding: 10px;
}
p {
  text-align: start;
}
.header {
  font-weight: bold;
}
</style>
