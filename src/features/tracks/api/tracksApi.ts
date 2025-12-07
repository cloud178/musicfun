import { baseApi } from '@/app/api/baseApi.ts'
import type { FetchTracksResponse } from '@/features/tracks/api/tracksApi.types.ts'

export const tracksApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    fetchTracks: build.infiniteQuery<FetchTracksResponse, void, string | null>({
      infiniteQueryOptions: {
        initialPageParam: null,
        getNextPageParam: (lastPage) => {
          return lastPage.meta.nextCursor || null
        },
      },
      query: ({ pageParam }) => ({
        url: 'playlists/tracks',
        params: { paginationType: 'cursor', cursor: pageParam, pageSize: 5 },
      }),
    }),
  }),
})
export const { useFetchTracksInfiniteQuery } = tracksApi
