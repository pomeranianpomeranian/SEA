<template>
  <div>
    <div v-if="$i18n.locale === 'en'">
      <h1 class="en-head">Welcome to <span class="japan">NIPPON</span></h1>
      <div class="comment-container">
        <p>Where do you visit when you come to Japan?</p>
        <p>
          If you've never been to Japan before, just go wherever you feel most
          exciting.
        </p>
        <p>
          But if you are a little sick of those very tourist-ish areas like
          Tokyo, Osaka or Kyoto, and feel like exploring somewhere you can dive
          deeper into real Japanese culture, you are in the right place!
        </p>
        <p>
          We provide a free community where locals can post and advertise their
          local secret spot which is hidden in your guide map.
        </p>
        <p>Sounds great! Doesn't it?</p>
        <p>Why don't we just jump into the whole new exciting world?</p>
        <p>You're gonna love it.</p>
      </div>
    </div>

    <div v-else>
      <h1 class="ja-head"><span class="japan">自慢の地元</span>を世界へ</h1>
      <div class="comment-container">
        <p>
          外国人向けに実施されたある調査によると、コロナ収束後、訪れたい国No.1に日本が選ばれたそうです。
        </p>
        <p>さすが我らがニッポン、と鼻が高くなるのも致し方ないでしょう。</p>
        <p>
          ただ、やはり多くの外国人観光客は、広島の原爆ドームや京都の伏見稲荷神社など、いわゆる観光名所に訪れて、
          日本を満喫した気分になってしまいます。
        </p>
        <p>
          いやいやそれで日本を知った気になっちゃあ困るぜGuys、そんな風に言っている皆さんの顔が浮かびます。
        </p>
        <p>
          日本には47もの都道府県があり、それぞれに違った文化や魅力があります。
        </p>
        <p>
          問題は、彼らの持つガイドマップに載ってない情報があまりにも多いということです。
        </p>
        <p>
          ならば自分でガイドマップを作ってしまえばいいのではないか？そんな思いつきからこのサービスを始めました。
        </p>
        <p>英語に自信がなくても大丈夫。きっと誰かが翻訳してくれます。</p>
        <p>あなたの自慢の地元を世界にアピールしませんか？</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.comment-container {
  max-height: 60vh;
  overflow-y: scroll;
}
.japan {
  color: rgb(226, 124, 57);
}
h1 {
  margin-bottom: 60px;
  color: white;
}
p {
  color: white;
  font-size: 20px;
  line-height: 28px;
  letter-spacing: 0.05em;
  margin-bottom: 20px;
}
</style>
