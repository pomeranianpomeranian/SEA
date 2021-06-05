<template>
  <div>
    <h1>HOME PAGE!</h1>
    <router-link :to="{ name: 'search' }">Search</router-link> |
    <router-link :to="{ name: 'signup' }">Sign Up</router-link>
    <p>Welcome to Japan! 的な。多分ここにサインインするフォームも組み込む。</p>
  </div>
</template>
