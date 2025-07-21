export default defineNuxtRouteMiddleware(async (to) => {
  const { loggedIn } = useUserSession();

  if (
    (!loggedIn.value && to.path !== '/signin') ||
    (loggedIn.value && to.path === '/signin')
  ) {
    return navigateTo('/');
  }
});
