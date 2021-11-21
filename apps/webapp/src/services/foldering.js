import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { prepareJwtHeader } from './helpers'

export const folderingServiceSlice = createApi({
  reducerPath: 'folderingService',
  baseQuery: fetchBaseQuery({
    credentials: 'same-origin',
    baseUrl: '',
    prepareHeaders: (headers) => prepareJwtHeader(headers),
  }),
  endpoints: (builder) => ({
    getFolders: builder.query({
      query: () => 'folders',
    }),
  }),
})

export const { useGetFoldersQuery } = folderingServiceSlice
