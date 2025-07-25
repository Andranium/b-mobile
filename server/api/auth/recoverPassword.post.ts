export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  const baseApi = config.public.baseApi;

  try {
    const body = await readBody(event);

    const phone = body.phone.replace(/[()\s-]/g, '');

    return $fetch(`${baseApi}/auth/recovery-password`, {
      method: 'post',
      body: {
        phone,
        password: body.password,
      },
    });
  } catch (e) {
    console.error(e);
  }
});
