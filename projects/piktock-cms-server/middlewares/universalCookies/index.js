const cookiesMiddleware = require("universal-cookie-koa");

module.exports = (strapi) => {
  return {
    initialize() {
      strapi.app.use(cookiesMiddleware());
    },
  };
};
