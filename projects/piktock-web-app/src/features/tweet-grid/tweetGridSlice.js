import { createSelector, createSlice } from '@reduxjs/toolkit'

const initialState = {
  selectedTweets: {},
}

const tweetGridSlice = createSlice({
  name: 'tweetGrid',
  initialState,
  reducers: {
    selectTweet(state, action) {
      state.selectedTweets[action.payload] = true
    },
    deselectTweet(state, action) {
      state.selectedTweets[action.payload] = false
    },
    toggleTweetSelected(state, action) {
      const isSelected = state.selectedTweets[action.payload] || false
      state.selectedTweets[action.payload] = !isSelected
    },
  },
})

export const selectSlice = (state) => state.tweetGrid
export const selectSelectedTweets = createSelector(
  selectSlice,
  (tweetGrid) => tweetGrid.selectedTweets
)
export const selectTweetIsSelected = createSelector(
  selectSelectedTweets,
  (state, id) => id,
  (selectedTweets, id) => selectedTweets[id] || false
)

export const { selectTweet, deselectTweet, toggleTweetSelected } =
  tweetGridSlice.actions
export default tweetGridSlice.reducer
