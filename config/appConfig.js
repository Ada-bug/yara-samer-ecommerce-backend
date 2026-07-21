// config/appConfig.js
// I didn't use this- I used the .env file
// This is just so I don't leave the folder empty
const appConfig = {
  env: process.env.NODE_ENV || "development",

  server: {
    port: process.env.PORT || 3000,
  },

  database: {
    uri: process.env.MONGODB_URI,
  },

  api: {
    prefix: "/api",
  },

  security: {
    jwtSecret: process.env.JWT_SECRET,
  },

  cors: {
    origin: process.env.CORS_ORIGIN,
  },
};

module.exports = appConfig;