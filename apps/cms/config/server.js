module.exports = ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 1337),
  url: env("SERVER_URL", "http://562c-105-186-57-6.ngrok.io"),
  // url: env("", "http://localhost:1337"),
  admin: {
    auth: {
      secret: env("ADMIN_JWT_SECRET", "d083f0dadbc12c92a25af4496e07a38c"),
    },
  },
});
