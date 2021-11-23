import { Cookies } from 'react-cookie'

export const GRAPHQL_URL = '/graphql'
const cookies = new Cookies()

export const prepareJwtHeader = (headers) => {
  const token = cookies.get('our_jwt')

  if (token) headers.set('authorization', `Bearer ${token}`)
  else console.warn('Missing jwt token in twitterService call')

  return headers
}

export const getAuthHeader = () => {
  const token = cookies.get('our_jwt')

  return {
    authorization: `Bearer ${token}`,
  }
}

export const hello = {}
