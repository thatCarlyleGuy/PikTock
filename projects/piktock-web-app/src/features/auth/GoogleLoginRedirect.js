import { useDispatch } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { useLoginGoogleUserQuery } from '../../services/auth'

const GoogleLoginRedirect = ({ redirectTo }) => {
  const dispatch = useDispatch()
  const location = useLocation()
  const history = useHistory()
  const query = new URLSearchParams(location.search)
  const accessToken = query.get('access_token')

  const { data, error, isLoading } = useLoginGoogleUserQuery(accessToken)

  useEffect(() => {
    if (!isLoading && !error) {
      console.log('TODO: google logins with cookies')
      // dispatch(setGoogleAccessToken(data))
      // history.push(redirectTo)
    }
  })

  return ''
}

export default GoogleLoginRedirect
