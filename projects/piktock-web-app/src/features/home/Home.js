import { useSelector } from 'react-redux'
import { useGetTwitterDataQuery } from '../../services/twitter'
import { selectAuthUsername } from '../auth/authSlice'
import TwitterUserInfo from '../../components/TwitterUserInfo/TwitterUserInfo'
import TabsPanel from '../../components/TabsPanel'
import TweetGrid from '../tweet-grid/TweetGrid'
import { LazyTweetsProvider } from '../tweet-grid/LazyTweetsContext'
import Sidebar from '../../components/Sidebar'
import Header from '../../components/Header'
import { useGetFoldersQuery } from '../../services/foldering'

const Home = () => {
  const username = useSelector(selectAuthUsername)
  const {
    data: twitterUserData,
    error: twitterDataError,
    isLoading: twitterDataIsLoading,
    // isFetching: userIsFetching,
  } = useGetTwitterDataQuery(username, {
    refetchOnMountOrArgChange: true,
  })

  const {
    data: folderingData,
    error: folderingError,
    isLoading: folderingIsLoading,
    // isFetching: folderingIsFetching,
  } = useGetFoldersQuery(null, {
    refetchOnMountOrArgChange: true,
  })

  if (twitterDataIsLoading || folderingIsLoading) {
    return ''
  }

  if (twitterDataError || folderingError) {
    return (
      <div>
        <pre>twitterDataError: {twitterDataError}</pre>
        <pre>folderingError: {folderingError}</pre>
      </div>
    )
  }

  const { userTwitterProfile, userTwitterLikes } = twitterUserData

  console.log(folderingData)

  return (
    <div className="flex flex-col h-screen max-w-screen-lg mx-auto">
      <Header />

      <div className="flex h-full mt-20">
        <div className="w-80 ">
          <Sidebar />
        </div>

        <div className="py-8 pl-32 pr-5 flex flex-col w-full">
          <div className="mb-5 pr-14">
            <TwitterUserInfo user={userTwitterProfile} />
          </div>

          <div>
            {userTwitterLikes && (
              <LazyTweetsProvider>
                <TabsPanel
                  panels={{
                    Likes: {
                      id: '1',
                      children: (
                        <TweetGrid tweetsPaginator={userTwitterLikes} />
                      ),
                    },
                  }}
                />
              </LazyTweetsProvider>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
