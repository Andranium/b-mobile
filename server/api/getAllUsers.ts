export default defineEventHandler((event) => {
    return apiFetch(event, '/users');
});
