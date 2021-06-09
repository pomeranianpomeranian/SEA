<template>
  <div>
    <h1>This is Result Page!</h1>
    <router-link
      :to="{ name: 'details', params: { postId: 'something_unique' } }"
      >Details</router-link
    >
    <p>
      ここに検索結果の一覧を表示する（ここはマップじゃなくて、横向きのカードみたいなイメージ）
    </p>
    <p>それぞれのカードをクリックしたら詳細のページに飛ぶ</p>
  </div>
</template>
