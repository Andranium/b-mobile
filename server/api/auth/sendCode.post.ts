export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  const baseApi = config.public.baseApi;

  try {
    const body = await readBody(event);

    const phone = body.phone.replace(/[()\s-]/g, '');

    return $fetch(`${baseApi}/auth/code/send`, {
      method: 'post',
      body: {
        phone,
      },
      headers: {
        origin: '45.12.236.212:8000',
      },
    });
  } catch (e) {
    console.error(e);
  }
});
