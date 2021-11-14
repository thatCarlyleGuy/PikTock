import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { Cookies } from 'react-cookie'

const cookies = new Cookies()

export const twitterServiceSlice = createApi({
  reducerPath: 'twitterService',
  baseQuery: fetchBaseQuery({
    credentials: 'same-origin',
    baseUrl: '/provider/twitter/',
    prepareHeaders: (headers) => {
      const token = cookies.get('our_jwt')

      if (token) headers.set('authorization', `Bearer ${token}`)
      else console.warn('Missing jwt token in twitterService call')

      return headers
    },
  }),
  endpoints: (builder) => ({
    getTwitterUser: builder.query({
      query: () => 'user-profile',
    }),
    getUserLikedTweets: builder.query({
      query: (userId) => 'user-liked-tweets',
    }),
  }),
})

export const { useGetTwitterUserQuery, useGetUserLikedTweetsQuery } =
  twitterServiceSlice
