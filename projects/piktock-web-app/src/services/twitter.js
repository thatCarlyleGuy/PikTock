import { createApi } from '@reduxjs/toolkit/dist/query/react'
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query'
import { gql } from 'graphql-request'
import { getAuthHeader, GRAPHQL_URL } from './helpers'

export const twitterServiceSlice = createApi({
  reducerPath: 'twitterService',
  baseQuery: graphqlRequestBaseQuery({
    url: GRAPHQL_URL,
    requestHeaders: {
      ...getAuthHeader(),
    },
  }),
  endpoints: (builder) => ({
    getTwitterData: builder.query({
      query: () => ({
        document: gql`
          query GetTwitterData {
            userTwitterProfile {
              id
              name
              description
              profile_image_url
              public_metrics {
                followers_count
                following_count
                listed_count
                tweet_count
              }
              url
              username
            }

            userTwitterLikes {
              likes {
                id
              }
              meta {
                next_token
                result_count
              }
            }
          }
        `,
      }),
    }),
  }),
})

export const { useGetTwitterDataQuery } = twitterServiceSlice
