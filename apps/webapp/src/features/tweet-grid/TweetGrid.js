import React, { useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { Tweet } from 'react-twitter-widgets'
import { chunk } from 'lodash'
import { useInView } from 'react-intersection-observer'
import { DotsVerticalIcon, ViewGridIcon } from '@heroicons/react/outline'
import { useDispatch, useSelector } from 'react-redux'
import classNames from 'classnames'
import { useLazyTweets } from './LazyTweetsContext'
import {
  selectSelectedTweets,
  selectSlice,
  selectTweetIsSelected,
  toggleTweetSelected,
} from './tweetGridSlice'

const iconsSpacing = 'w-5 h-5'
const boxRounding = 'rounded-xl '
const EmptyBox = () => (
  <div className={`bg-gray-200 rounded-xl w-full h-[450px] ${boxRounding}`} />
)

const TweetRow = React.forwardRef(({ tweets }, parentRef) => {
  const [showRow, setShowRow] = useState(false)
  const [isHovering, setIsHovering] = useState({})
  const { getIsTweetLoaded, setTweetLoaded } = useLazyTweets()
  const { ref: intersectionRef, inView } = useInView({
    threshold: 0,
    triggerOnce: true,
  })

  const dispatch = useDispatch()
  const selectedTweets = useSelector(selectSelectedTweets)
  // console.log('selected', selectedTweets, selectedTweets['1451000292573655048'])

  useEffect(() => {
    if (showRow || !inView) return
    setShowRow(true)
  }, [inView, showRow, setShowRow])

  const getRef = (index) => {
    if (index === 0) return intersectionRef
    if (index === 1 && parentRef) return parentRef
    return null
  }
  return (
    <>
      {tweets.map(({ id }, index) => (
        <div
          key={id}
          ref={getRef(index)}
          className="w-full after:bg-pink-300 after:z-1 z-100 after:w-full after:h-full"
        >
          {!showRow ? (
            <EmptyBox />
          ) : (
            <>
              {!getIsTweetLoaded(id) && <EmptyBox />}
              <span
                className={`${!getIsTweetLoaded(id) ? 'invisible' : ''} `}
                onMouseEnter={() =>
                  setIsHovering({ ...isHovering, [id]: true })
                }
                onMouseLeave={() =>
                  setIsHovering({ ...isHovering, [id]: false })
                }
              >
                <div className="flex justify-between">
                  {isHovering[id] ? (
                    <>
                      <span>
                        <ViewGridIcon
                          className={classNames(iconsSpacing, 'cursor-pointer')}
                          onClick={() => dispatch(toggleTweetSelected(id))}
                        />
                      </span>
                      <span className="self-end">
                        <DotsVerticalIcon className={iconsSpacing} />
                      </span>
                    </>
                  ) : (
                    <div className={iconsSpacing} />
                  )}
                </div>
                <div className="relative">
                  <div
                    className={classNames(
                      'w-full h-full absolute pointer-events-none',
                      boxRounding,
                      selectedTweets[id] ? 'bg-blue-600 opacity-20' : ''
                    )}
                  />
                  <Tweet tweetId={id} onLoad={() => setTweetLoaded(id)} />
                </div>
              </span>
            </>
          )}
        </div>
      ))}
    </>
  )
})

const TweetGrid = ({ tweetsPaginator }) => {
  const tweetsData = tweetsPaginator.data
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

TweetRow.propTypes = {
  tweets: tweetPropType.isRequired,
}

TweetGrid.propTypes = {
  tweetsPaginator: PropTypes.shape({
    data: tweetPropType,
    meta: PropTypes.shape({
      meta: PropTypes.string,
      next_token: PropTypes.string,
    }),
  }).isRequired,
}

export default TweetGrid
