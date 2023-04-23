<template>
  <div id="container">
    <div id="mapContainer"></div>
  </div>
</template>

<script setup lang="ts">
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { onMounted, ref } from 'vue';
import type { Ref } from 'vue';

const props = defineProps({
  webcams: [],
});
const emit = defineEmits(['clicked']);

// Map things
let map: L.Map;
const webcamMarkers: Ref<L.Marker[]> = ref([]);
const setupLeafletMap = () => {
  map = L.map('mapContainer', {
    center: [47.501449887484796, 19.039618179496333],
    zoom: 13,
  });
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);
  console.log('added1');
};

const onClick = (val: any) => {
  console.log(val);
  emit('clicked');
};

onMounted(() => {
  setupLeafletMap();
  if (!map) return;
  props.webcams.forEach((webcam) => {
    console.log(webcam);
    if (webcam.location && webcam.location.lat && webcam.location.lon) {
      webcamMarkers.value.push(
        L.marker([webcam.location.lat, webcam.location.lon]).addTo(map)
          .on('mousedown', onClick),
      );
    }
  });
});

</script>
<style>
#mapContainer {
  width: 40vw;
  height: 50vh;
}
</style>
