const userFields = [
  "description",
  "entities",
  "id",
  "name",
  "profile_image_url",
  "public_metrics",
  "url",
  "username",
];

module.exports = {
  userProfile: async (ctx) => {
    const { state, twitterClient } = ctx;
    const { username } = state.user;

    try {
      const userResp = await twitterClient.v2.userByUsername(username, {
        "user.fields": userFields,
      });
      strapi.log.info(`Twitter user data retrieved [username="${username}"]`);
      return userResp.data;
    } catch (e) {
      strapi.log.error(
        `Twitter client error [error="${e.message}", username="${username}"`
      );
      return ctx.unauthorized("Unable to retrieve Twitter user data");
    }
  },

  userLikedTweets: async (ctx) => {
    const { state, twitterClient } = ctx;
    const { id } = ctx.params;
    const { username } = state.user;

    try {
      const user = await twitterClient.v2.userByUsername(username);
      const likedTweets = await twitterClient.v2.userLikedTweets(user.data.id);
      strapi.log.info(
        `Twitter liked tweets retrieved [username="${username}"]`
      );

      return likedTweets.data;
    } catch (e) {
      strapi.log.error(
        `Twitter client error [error="${e.message}", username="${username}"`
      );

      return ctx.unauthorized("Unable to retrieve Twitter user data");
    }
  },
};
