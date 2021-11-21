import { useSelector } from 'react-redux'
import {
  useGetTwitterUserQuery,
  useGetUserLikedTweetsQuery,
} from '../../services/twitter'
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
    data: userData,
    error: userError,
    isLoading: userIsLoading,
    isFetching: userIsFetching,
  } = useGetTwitterUserQuery(username, {
    refetchOnMountOrArgChange: true,
  })

  const {
    data: tweetData,
    error: tweetError,
    isLoading: tweetIsLoading,
    isFetching: tweetIsFetching,
  } = useGetUserLikedTweetsQuery(null, {
    refetchOnMountOrArgChange: true,
  })
  const {
    data: folderingData,
    error: folderingError,
    isLoading: folderingIsLoading,
    isFetching: folderingIsFetching,
  } = useGetFoldersQuery(null, {
    refetchOnMountOrArgChange: true,
  })

  console.log({ folderingData })

  return (
    <div className="flex flex-col h-screen max-w-screen-lg mx-auto">
      <Header />

      <div className="flex h-full mt-20">
        <div className="w-80 ">
          <Sidebar />
        </div>

        <div className="py-8 pl-32 pr-5 flex flex-col w-full">
          <div className="mb-5 pr-14">
            <TwitterUserInfo user={userData} />
          </div>

          <div>
            {tweetData?.data && (
              <LazyTweetsProvider>
                <TabsPanel
                  panels={{
                    Likes: {
                      id: '1',
                      children: <TweetGrid tweetsPaginator={tweetData} />,
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
