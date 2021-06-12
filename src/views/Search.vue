<template>
  <div>
    <h1>This is Search Page!</h1>
    <router-link :to="{ name: 'result' }">Result</router-link>
    <p>
      ここにgoogle
      mapと検索バーとか置く（ユーザーがホームの次に訪れるページのイメージ）
    </p>
    <GmapMap
      :center="{ lat: 35.645974459469834, lng: 139.70496042046145 }"
      :zoom="12"
      map-type-id="terrain"
      style="width: 500px; height: 300px"
      justifiy-content-center
    >
      <!-- <GmapMarker
          :key="index"
          v-for="(m, index) in markers"
          :position="m.position"
          :clickable="true"
          :draggable="true"
          @click="center = m.position"
        /> -->
    </GmapMap>
  </div>
</template>
