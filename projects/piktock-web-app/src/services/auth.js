import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'

export const AUTH_BACKEND = process.env.REACT_APP_AUTH_BACKEND
export const GOOGLE_AUTH_URL = `${AUTH_BACKEND}/connect/google`
export const TWITTER_AUTH_URL = `${AUTH_BACKEND}/connect/twitter`

export const authServiceSlice = createApi({
  reducerPath: 'authService',
  baseQuery: fetchBaseQuery({
    baseUrl: `${AUTH_BACKEND}/auth`,
    credentials: 'same-origin',
  }),
  endpoints: (builder) => ({
    loginGoogleUser: builder.query({
      query: (accessToken) => `/google/callback?access_token=${accessToken}`,
    }),
    loginTwitterUser: builder.query({
      query: (params) => `/twitter/callback${params}`,
    }),
  }),
})

export const { useLoginGoogleUserQuery, useLoginTwitterUserQuery } =
  authServiceSlice
