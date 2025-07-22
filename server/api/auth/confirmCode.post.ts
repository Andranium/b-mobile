export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  const baseApi = config.public.baseApi;

  try {
    const body = await readBody(event);

    const phone = body.phone.replace(/[()\s-]/g, '');

    return $fetch(`${baseApi}/auth/code/confirm`, {
      method: 'post',
      body: {
        phone,
        code: body.code,
      },
    });
  } catch (e) {
    console.error(e);
  }
});
