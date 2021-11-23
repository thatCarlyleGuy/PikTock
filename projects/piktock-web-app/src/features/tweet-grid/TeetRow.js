import React, { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { useDispatch, useSelector } from 'react-redux'
import { DotsVerticalIcon, ViewGridIcon } from '@heroicons/react/outline'
import classNames from 'classnames'
import { Tweet } from 'react-twitter-widgets'
import PropTypes from 'prop-types'
import { MinusIcon, PlusIcon } from '@heroicons/react/solid'
import { selectSelectedTweets, toggleTweetSelected } from './tweetGridSlice'
import { useLazyTweets } from './LazyTweetsContext'

const iconsSpacing = 'w-5 h-5'
const boxRounding = 'rounded-xl '
const EmptyBox = () => (
  <div className={`bg-gray-200 rounded-xl w-full h-[450px] ${boxRounding}`} />
)

const useTweetRow = ({ parentRef }) => {
  const [showRow, setShowRow] = useState(false)
  const [isHovering, setIsHovering] = useState({})
  const { ref: intersectionRef, inView } = useInView({
    threshold: 0,
    triggerOnce: true,
  })

  useEffect(() => {
    if (showRow || !inView) return
    setShowRow(true)
  }, [inView, showRow, setShowRow])

  return {
    showRow,
    isHovering(id) {
      return isHovering[id] || false
    },
    setIsHovering(id) {
      setIsHovering({ ...isHovering, [id]: true })
    },
    setIsNotHovering(id) {
      setIsHovering({ ...isHovering, [id]: false })
    },
    getRef(index) {
      if (index === 0) return intersectionRef
      if (index === 1 && parentRef) return parentRef
      return null
    },
  }
}

const TweetRow = React.forwardRef(({ tweets }, parentRef) => {
  const { getIsTweetLoaded, setTweetLoaded } = useLazyTweets()
  const { showRow, setIsHovering, setIsNotHovering, getRef, isHovering } =
    useTweetRow({
      parentRef,
    })
  const dispatch = useDispatch()
  const selectedTweets = useSelector(selectSelectedTweets)

  // eslint-disable-next-line react/prop-types
  const TweetButtons = ({ id }) => (
    <div className="flex justify-between">
      <span className="flex justify-between space-x-3">
        <ViewGridIcon className={classNames(iconsSpacing, 'cursor-pointer')} />
        {selectedTweets[id] ? (
          <MinusIcon
            className={classNames(iconsSpacing, 'cursor-pointer')}
            onClick={() => dispatch(toggleTweetSelected(id))}
          />
        ) : (
          <PlusIcon
            className={classNames(iconsSpacing, 'cursor-pointer')}
            onClick={() => dispatch(toggleTweetSelected(id))}
          />
        )}
      </span>
      <span className="self-end">
        <DotsVerticalIcon className={iconsSpacing} />
      </span>
    </div>
  )

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
                className={classNames(!getIsTweetLoaded(id) ? 'invisible' : '')}
                onMouseEnter={() => setIsHovering(id)}
                onMouseLeave={() => setIsNotHovering(id)}
              >
                <>
                  {isHovering(id) ? (
                    <TweetButtons id={id} />
                  ) : (
                    <div className={iconsSpacing} />
                  )}
                </>
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

TweetRow.propTypes = {
  tweets: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
    })
  ).isRequired,
}

export default TweetRow
