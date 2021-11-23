import { useDispatch } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { useLoginTwitterUserQuery } from '../../services/auth'
import { setAuthUser } from './authSlice'

/**
 * TODO: secure cookies
 * COOKIE OPTIONS:
 * options (object): Support all the cookie options from RFC 6265
 *   path (string): cookie path, use / as the path if you want your cookie to be accessible on all pages
 *   expires (Date): absolute expiration date for the cookie
 *   maxAge (number): relative max age of the cookie from when the client receives it in seconds
 *   domain (string): domain for the cookie (sub.domain.com or .allsubdomains.com)
 *   secure (boolean): Is only accessible through HTTPS?
 *   httpOnly (boolean): Can only the server access the cookie? Note: You cannot get or set httpOnly cookies from the browser, only the server.
 *   sameSite (boolean|none|lax|strict): Strict or Lax enforcement
 */

const TwitterLoginRedirect = ({ redirectTo }) => {
  const dispatch = useDispatch()
  const location = useLocation()
  const history = useHistory()
  const [cookies, setCookie] = useCookies([
    'access_token',
    'access_secret',
    'our_jwt',
  ])

  const paramsAsString = location.search
  const query = new URLSearchParams(paramsAsString)
  const { data, error, isLoading } = useLoginTwitterUserQuery(paramsAsString)

  useEffect(() => {
    if (cookies.our_jwt) {
      history.push(redirectTo)
    }

    if (!isLoading && !error) {
      setCookie('our_jwt', data.jwt, { path: '/' })
      setCookie('access_token', query.get('access_token'), { path: '/' })
      setCookie('access_secret', query.get('access_secret'), { path: '/' })
      dispatch(setAuthUser(data.user))
    }
  }, [isLoading, error, data, cookies])

  return ''
}

export default TwitterLoginRedirect
