import type { LoginResponse } from '~/server/types';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  const baseApi = config.public.baseApi;

  try {
    const body = await readBody(event);

    const phone = body.phone.replace(/[()\s-]/g, '');

    const response = await $fetch<LoginResponse>(`${baseApi}/auth/login`, {
      method: 'post',
      headers: {
        origin: '45.12.236.212:8000',
      },
      body: {
        phone,
        password: body.password,
      },
    });

    const user = await $fetch(`${baseApi}/users/me`, {
      headers: {
        origin: '45.12.236.212:8000',
        Authorization: `Bearer ${response.access_token}`,
      },
    });

    await setUserSession(event, {
      user,
      access_token: response.access_token,
      refresh_token: response.refresh_token,
    });

    return { success: true };
  } catch (e) {
    return e;
  }
});
