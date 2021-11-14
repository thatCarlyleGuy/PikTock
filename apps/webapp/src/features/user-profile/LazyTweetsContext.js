import React, { createContext, useContext, useState } from 'react'
import PropTypes from 'prop-types'

const LazyTweetsContext = createContext({})

export const useLazyTweets = () => useContext(LazyTweetsContext)

export const LazyTweetsProvider = ({ children }) => {
  const [isTweetLoaded, setIsTweetLoaded] = useState({})

  const providerValue = {
    setTweetLoaded: (id) => {
      setIsTweetLoaded((state) => ({ ...state, [id]: true }))
    },
    getIsTweetLoaded: (id) => isTweetLoaded[id],
  }

  return (
    <LazyTweetsContext.Provider value={providerValue}>
      {children}
    </LazyTweetsContext.Provider>
  )
}

LazyTweetsProvider.propTypes = {
  children: PropTypes.element.isRequired,
}
