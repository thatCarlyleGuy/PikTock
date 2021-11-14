module.exports = ({ env }) => ({
  load: {
    order: ["universalCookies", "twitterClient"],
  },

  settings: {
    twitterClient: {
      enabled: true,
      consumerKey: env("TWITTER_CONSUMER_KEY"),
      consumerSecret: env("TWITTER_CONSUMER_SECRET"),
      bearerToken: env("TWITTER_BEARER_TOKEN"),
    },
    universalCookies: {
      enabled: true,
    },
  },
});
