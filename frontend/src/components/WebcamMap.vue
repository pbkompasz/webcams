<template>
  <div id="container">
    <div id="mapContainer"></div>
  </div>
</template>

<script setup lang="ts">
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { onMounted } from 'vue';

// Map things
const setupLeafletMap = () => {
  const map = L.map('mapContainer', {
    center: [51.505, -0.09],
    zoom: 13,
  });
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);
  console.log('added1');
};

onMounted(() => {
  setupLeafletMap();
});

</script>
<style>
#mapContainer {
 width: 40vw;
 height: 50vh;
}
</style>
