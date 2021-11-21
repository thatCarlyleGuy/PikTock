import { Cookies } from 'react-cookie'

const cookies = new Cookies()

export const prepareJwtHeader = (headers) => {
  const token = cookies.get('our_jwt')

  if (token) headers.set('authorization', `Bearer ${token}`)
  else console.warn('Missing jwt token in twitterService call')

  return headers
}

export const hello = {}
