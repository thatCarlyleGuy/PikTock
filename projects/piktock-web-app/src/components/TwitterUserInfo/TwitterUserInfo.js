/* eslint camelcase: 0 */
import PropTypes from 'prop-types'

const TwitterUserInfo = ({ user }) => {
  if (!user) return ''
  const { public_metrics, profile_image_url, name, username, description } =
    user

  // eslint-disable-next-line react/prop-types
  const MetricCount = ({ id, label }) => (
    <div>
      <span className="font-bold">{public_metrics[id]}</span>
      {label}
    </div>
  )

  return (
    <div className="flex flex-col">
      <div className="flex">
        <div className="w-28 h-28 rounded-full">
          <img
            className="w-full h-full rounded-full"
            src={profile_image_url}
            alt="profile"
          />
        </div>
        <div className="flex flex-col ml-5 justify-center">
          <h1 className="font-family-h1 font-semibold text-lg tracking-wide text-3xl">
            {name}
          </h1>
          <div className="font-medium text-xl">{username}</div>
        </div>
      </div>
      <div className="flex space-x-4 mt-6">
        <MetricCount id="followers_count" label=" Followers" />
        <MetricCount id="following_count" label=" Following" />
        <MetricCount id="tweet_count" label=" Tweets" />
      </div>
      <div className="mt-2.5">{description || 'No bio yet.'}</div>
    </div>
  )
}

TwitterUserInfo.propTypes = {
  user: PropTypes.shape({
    public_metrics: PropTypes.shape({
      followers_count: PropTypes.number,
      following_count: PropTypes.number,
      tweet_count: PropTypes.number,
    }),
    profile_image_url: PropTypes.string,
    name: PropTypes.string,
    username: PropTypes.string,
    description: PropTypes.string,
  }),
}

TwitterUserInfo.defaultProps = {
  user: {},
}

export default TwitterUserInfo
