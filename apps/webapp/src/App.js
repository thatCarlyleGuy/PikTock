import { Route, Switch } from 'react-router-dom'
import GoogleLoginRedirect from './features/auth/GoogleLoginRedirect'
import TwitterLoginRedirect from './features/auth/TwitterLoginRedirect'
import './App.css'
import Home from './features/home/Home'
import Login from './features/auth/Login'

function App() {
  return (
    <Switch>
      <Route exact path="/login">
        <Login />
      </Route>

      <Route exact path="/home">
        <Home />
      </Route>

      <Route path="/connect/google/redirect">
        <GoogleLoginRedirect redirectTo="/home" />
      </Route>
      <Route path="/connect/twitter/redirect">
        <TwitterLoginRedirect redirectTo="/home" />
      </Route>
    </Switch>
  )
}

export default App
