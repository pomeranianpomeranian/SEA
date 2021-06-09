<template>
  <div>
    <h1>This is {{ userId }}'s Posts Page!</h1>
    <router-link :to="{ name: 'edit' }">Edit</router-link>
    <p>ここが過去の自分の投稿の詳細で、このページから編集画面に進める。</p>
  </div>
</template>
<script>
export default {
  props: ["userId"],
};
</script>
