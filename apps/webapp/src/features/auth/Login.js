import { useCookies } from 'react-cookie'
import { useDispatch } from 'react-redux'
import { GOOGLE_AUTH_URL, TWITTER_AUTH_URL } from '../../services/auth'
import logo from '../../logo.svg'
import { clearAuthUser } from './authSlice'

const Login = () => {
  const dispatch = useDispatch()
  const [cookies, setCookie, removeCookie] = useCookies([])

  removeCookie('our_jwt')
  removeCookie('access_token')
  removeCookie('access_secret')
  dispatch(clearAuthUser())

  return (
    <div className="App">
      <header className="App-header">
        <p>
          <a href={GOOGLE_AUTH_URL}>
            <button style={{ width: '150px' }} type="button">
              Connect to Google
            </button>
          </a>
        </p>
        <p>
          <a href={TWITTER_AUTH_URL}>
            <button style={{ width: '150px' }} type="button">
              Connect to Twitter
            </button>
          </a>
        </p>

        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  )
}

export default Login
