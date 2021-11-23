import React, { useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { chunk } from 'lodash'
import { useInView } from 'react-intersection-observer'
import TweetRow from './TeetRow'

const TweetGrid = ({ tweetsPaginator }) => {
  const tweetsData = tweetsPaginator.likes
  const [nChunksLoaded, setNChunksLoaded] = useState(1)
  const { ref, inView } = useInView({ threshold: 0 })

  const loadNextChunkOfTweets = () => setNChunksLoaded(nChunksLoaded + 1)
  // How many tweets are displayed in a row
  const rowSize = 2
  // Ho many lazy rows load at a time
  const loadNRowsAtATime = 3
  // How many lazy tweets are added to the page to increase scroll area
  const tweetsPerChunk = rowSize * 8
  // Total number of lazy tweet boxes currently on the page
  const nTweetsLoaded = nChunksLoaded * tweetsPerChunk
  // How many lazy tweet rows are on the page
  const loadedRows = useMemo(
    () => chunk(tweetsData.slice(0, nTweetsLoaded), rowSize * loadNRowsAtATime),
    [nChunksLoaded]
  )
  // When the row with this index is scrolled into view, load the next chunk of lazy tweets
  const intersectionNum = Math.ceil(loadedRows.length * 0.425)

  useEffect(() => {
    if (!inView) return
    loadNextChunkOfTweets()
  }, [inView])

  return (
    <div className="h-full w-full">
      <div className="grid grid-cols-2 gap-4">
        {loadedRows.map((tweetRow, index) => (
          <TweetRow
            key={tweetRow[0].id}
            ref={intersectionNum === index + 1 ? ref : null}
            tweets={tweetRow}
          />
        ))}
      </div>
    </div>
  )
}

const tweetPropType = PropTypes.arrayOf(
  PropTypes.shape({
    id: PropTypes.string,
    text: PropTypes.string,
  })
)

TweetGrid.propTypes = {
  tweetsPaginator: PropTypes.shape({
    likes: tweetPropType,
    meta: PropTypes.shape({
      meta: PropTypes.string,
      next_token: PropTypes.string,
    }),
  }).isRequired,
}

export default TweetGrid
