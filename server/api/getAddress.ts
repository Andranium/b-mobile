export default defineEventHandler(async (event) => {
    const query = getQuery<{ address: string }>(event);

    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query.address)}&addressdetails=1&countrycodes=RU`;

    return $fetch(url);
});
