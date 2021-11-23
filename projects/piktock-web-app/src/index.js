import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { CookiesProvider } from 'react-cookie'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { store, persistor } from './features/store'
import './index.css'

ReactDOM.render(
  <React.StrictMode>
    <CookiesProvider>
      <Router>
        <PersistGate loading={null} persistor={persistor}>
          <Provider store={store}>
            <App />
          </Provider>
        </PersistGate>
      </Router>
    </CookiesProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
