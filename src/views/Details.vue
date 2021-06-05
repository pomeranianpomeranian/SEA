<template>
  <div>
    <h1>This is {{ postId }}'s Page!</h1>
    <p>ここに詳細な情報を表示する</p>
  </div>
</template>

<script>
export default {
  props: ["postId"],
};
</script>
