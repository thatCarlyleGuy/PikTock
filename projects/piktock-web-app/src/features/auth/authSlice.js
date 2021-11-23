import { createSelector, createSlice } from '@reduxjs/toolkit'

const AUTH_PROVIDER_GOOGLE = 'GOOGLE'
const AUTH_PROVIDER_TWITTER = 'TWITTER'

const initialState = {
  currentAuthProvider: null,
  authUser: {
    email: null,
    provider: null,
    role: null,
    username: null,
    id: null,
  },
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthUser(state, action) {
      const { username, email, provider, role, id } = action.payload
      state.authUser = { username, email, provider, role, id }

      state.currentAuthProvider = (() => {
        switch (provider) {
          case 'twitter':
            return AUTH_PROVIDER_TWITTER
          case 'google':
            return AUTH_PROVIDER_GOOGLE
          default:
            return null
        }
      })()
    },
    clearAuthUser(state) {
      state.currentAuthProvider = null
      state.authUser = initialState.authUser
    },
  },
})

export const selectSlice = (state) => state.auth
export const selectAuthUser = createSelector(
  selectSlice,
  (slice) => slice.authUser
)
export const selectAuthUsername = createSelector(
  selectAuthUser,
  (authUser) => authUser?.username
)
export const selectAuthProvider = createSelector(
  selectSlice,
  (slice) => slice.authProvider
)

export const { setAuthUser, clearAuthUser } = authSlice.actions
export default authSlice.reducer
