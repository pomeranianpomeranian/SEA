<template>
  <div>
    <h1>This is {{ username }}'s New Post Form!</h1>
    <p>ここで新たに投稿を追加できる。</p>
  </div>
</template>

<script>
export default {
  props: ["username"],
};
</script>
