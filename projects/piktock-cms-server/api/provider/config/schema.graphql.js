module.exports = {
  definition: `
    type PublicMetrics {
      followers_count: Int
      following_count: Int
      tweet_count: Int
      listed_count: Int
    }

    type TwitterUser {
      description: String
      entities: String
      id: ID
      name: String
      profile_image_url: String
      public_metrics: PublicMetrics
      url: String
      username: String
    }

    type TwitterLike {
      id: String
      text: String
    }

    type TwitterLikeMeta {
      result_count: Int
      next_token: String
    }

    type TwitterLikes {
      likes: [TwitterLike]
      meta: TwitterLikeMeta
    }
  `,
  query: `
    userTwitterProfile: TwitterUser
    userTwitterLikes: TwitterLikes
  `,
  resolver: {
    Query: {
      userTwitterProfile: {
        description: "Return a user's Twitter Profile",
        resolver: "application::provider.twitter.userProfile",
      },
      userTwitterLikes: {
        description: "Return a user's Twitter Likes",
        resolver: "application::provider.twitter.userLikedTweets",
      },
    },
  },
};
