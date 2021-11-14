import { useSelector } from 'react-redux'
import {
  useGetTwitterUserQuery,
  useGetUserLikedTweetsQuery,
} from '../../services/twitter'
import { selectAuthUsername } from '../auth/authSlice'
import TwitterUserInfo from './TwitterUserInfo'
import TabsPanel from '../../components/TabsPanel'
import TweetGrid from './TweetGrid'
import { LazyTweetsProvider } from './LazyTweetsContext'

const UserProfile = () => {
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

  return (
    <div className="flex flex-col h-screen max-w-screen-lg mx-auto">
      <header className="bg-gradient-to-r from-purple-700 to-[#a65fec] px-4 sm:px-6 lg:px-16 fixed top-0 left-0 w-full">
        <div className="max-w-10xl mx-auto divide-y divide-black divide-opacity-10">
          <div className="py-6 flex items-center text-sm leading-5">
            <div className="text-white">Jello</div>
          </div>
        </div>
      </header>

      <div className="flex h-full mt-20">
        <div className="w-80 ">
          <div className="flex fixed py-2 pt-5 h-full">Sidebar</div>
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

export default UserProfile
