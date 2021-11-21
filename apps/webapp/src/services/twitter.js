import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { prepareJwtHeader } from './helpers'

export const twitterServiceSlice = createApi({
  reducerPath: 'twitterService',
  baseQuery: fetchBaseQuery({
    credentials: 'same-origin',
    baseUrl: '/provider/twitter/',
    prepareHeaders: (headers) => prepareJwtHeader(headers),
  }),
  endpoints: (builder) => ({
    getTwitterUser: builder.query({
      query: () => 'home',
    }),
    getUserLikedTweets: builder.query({
      query: (userId) => 'user-liked-tweets',
    }),
  }),
})

export const { useGetTwitterUserQuery, useGetUserLikedTweetsQuery } =
  twitterServiceSlice
