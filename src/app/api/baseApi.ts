import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const baseApi = createApi({
  reducerPath: 'baseApi',
  tagTypes: ['playlist'],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    headers: {
      'API-KEY': import.meta.env.VITE_API_KEY,
    },
    // через api, который идёт вторым опциональным аргументом после headers, можем посмотреть через тот же дебагер что за эндпоинт выполнился
    prepareHeaders: (
      headers,
      // api
    ) => {
      headers.set('Authorization', `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`)
      return headers
    },
  }),
  endpoints: () => ({}),
})
