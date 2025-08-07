export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  const baseApi = config.public.baseApi;

  try {
    const body = await readBody(event);

    const phone = body.phone.replace(/[()\s-]/g, '');

    return $fetch(`${baseApi}/auth/registration`, {
      method: 'post',
      body: {
        phone,
        password: body.password,
        name: body.name,
        first_name: body.first_name,
        last_name: body.last_name,
      },
    });
  } catch (e) {
    console.error(e);
  }
});
