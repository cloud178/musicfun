import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { baseApi } from '@/app/api/baseApi.ts'

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
})

// export type RootState = ReturnType<typeof store.getState>
// строка ниже нужна для таких фич как например refetchOnFocus, refetchOnReconnect и тд
setupListeners(store.dispatch)
