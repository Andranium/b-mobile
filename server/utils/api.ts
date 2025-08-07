export const apiFetch = async <T>(
  event: any,
  url: string,
  options: Parameters<typeof $fetch>[1] = {},
): Promise<T> => {
  // Retrieve the session
  const session = await getUserSession(event);
  const accessToken = session?.access_token;
  const config = useRuntimeConfig(event);
  const baseApi = config.public.baseApi;

  // Check if access token exists
  if (!accessToken) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized: No access token available',
    });
  }

  try {
    // Attempt the request with the current access token
    return await $fetch<T>(`${baseApi}${url}`, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${accessToken}`,
      },
    });
  } catch (err: any) {
    // Handle 401 Unauthorized by attempting to refresh the token
    if (err.response?.status === 401) {
      try {
        // Send refresh_token to backend's /api/refresh endpoint
        const refreshResponse = await $fetch<{
          access_token: string;
          refresh_token: string;
        }>(`${baseApi}/auth/refresh`, {
          method: 'POST',
          body: {
            refresh_token: session?.refresh_token,
          },
        });

        // Validate response
        if (!refreshResponse.access_token || !refreshResponse.refresh_token) {
          throw new Error('Invalid refresh response');
        }

        // Update session with new tokens
        await setUserSession(event, {
          user: session?.user,
          access_token: refreshResponse.access_token,
          refresh_token: refreshResponse.refresh_token,
        });

        // Retry the original request with the new access token
        return await $fetch<T>(`${baseApi}${url}`, {
          ...options,
          headers: {
            ...options.headers,
            Authorization: `Bearer ${refreshResponse.access_token}`,
          },
        });
      } catch (refreshErr) {
        // If refresh fails, clear the session and throw an error
        console.error(refreshErr);

        await setUserSession(event, {});
        throw createError({
          statusCode: 401,
          statusMessage: 'Session expired: Please log in again',
        });
      }
    }
    throw err; // Rethrow other errors (e.g., 403, 500)
  }
};
