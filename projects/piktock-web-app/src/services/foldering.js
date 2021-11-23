import { createApi } from '@reduxjs/toolkit/dist/query/react'
import { gql } from 'graphql-request'
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query'
import { getAuthHeader, GRAPHQL_URL } from './helpers'

export const folderingServiceSlice = createApi({
  reducerPath: 'folderingService',
  baseQuery: graphqlRequestBaseQuery({
    url: GRAPHQL_URL,
    requestHeaders: {
      ...getAuthHeader(),
    },
  }),
  endpoints: (builder) => ({
    getFolders: builder.query({
      query: () => ({
        document: gql`
          query GetFolderingData {
            folders {
              id
              Title
              Description
              created_at
            }
          }
        `,
      }),
    }),
  }),
})

export const { useGetFoldersQuery } = folderingServiceSlice
