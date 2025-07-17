<template>
  <div class="map shadow">
    <client-only>
      <LMap
          ref="map"
          :zoom="zoom"
          :min-zoom="4"
          :center="officeCoords"
          :use-global-leaflet="false"
          :max-bounds="[
            [41.1851, 19.6389],
            [82.0586, 180.0]
          ]"
      >
        <LTileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            layer-type="base"
            name="OpenStreetMap"
        />

        <LMarker
            :lat-lng="officeCoords"
        />

        <LMarker
          v-if="destinationCoords"
          :lat-lng="destinationCoords"
        />

        <LPolyline
            v-if="route"
            :lat-lngs="route"
            color="orange"
        />
      </LMap>
    </client-only>
  </div>
</template>

<script setup lang="ts">
import type {CalculatorMapProps, RoutingNavigation} from "~/components/Calculator/types";

const zoom = ref(13);
const map = ref();

const route = ref();
const distance = ref(0);

const emits = defineEmits(['update:distance']);

const { officeCoords, destinationCoords } = defineProps<CalculatorMapProps>();

const fetchRoute = async () => {
  if (!destinationCoords) {
    return;
  }

  const coordsA = [...officeCoords].reverse().join(',');
  const coordsB = [...destinationCoords].reverse().join(',');

  const url = `https://router.project-osrm.org/route/v1/driving/${coordsA};${coordsB}?overview=full&geometries=geojson`;

  const response = await $fetch<RoutingNavigation>(url, {
    method: 'GET',
  });

  const routeItem = response.routes[0];

  route.value = routeItem.geometry.coordinates.map(([lat, lng]) => [lng, lat]);
  distance.value = routeItem.distance / 1000;

  emits('update:distance', Math.ceil(distance.value));
}

const focus = async () => {
  if (!destinationCoords) {
    map.value?.leafletObject.setView(officeCoords, zoom.value);

    return;
  }

  await fetchRoute();

  map.value?.leafletObject.fitBounds([officeCoords, destinationCoords],  { zoom: 2, padding: [56, 56] });
}

watch(() => officeCoords, focus);

watch(() => destinationCoords, focus);
</script>

<style scoped lang="scss">
.map {
  height: 300px;
  width: 100%;
  border-radius: 16px;
  overflow: hidden;
}

:deep(.leaflet-bottom.leaflet-right) {
  display: none !important;
}

:deep(.leaflet-routing-alt) {
  display: none;
}

:deep(.leaflet-tile) {
  filter: grayscale(0.5);
}

:deep(.leaflet-interactive) {
  pointer-events: none !important;
}
</style>
