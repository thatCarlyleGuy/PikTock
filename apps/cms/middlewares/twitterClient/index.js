const { TwitterApi } = require("twitter-api-v2");

module.exports = (strapi) => {
  return {
    initialize() {
      strapi.app.use(async (ctx, next) => {
        const { consumerKey, consumerSecret } = strapi.config.get(
          "middleware.settings.twitterClient"
        );
        const { access_token, access_secret } =
          ctx.request.universalCookies.getAll();

        const client = new TwitterApi({
          appKey: consumerKey,
          appSecret: consumerSecret,
          accessToken: access_token,
          accessSecret: access_secret,
        });

        strapi.app.context.twitterClient = client;

        await next();
      });
    },
  };
};
