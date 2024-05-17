export default {
  port: process.env.PORT,
  mysql: {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  },
  tokenSecret: process.env.SECRET_KEY,
  sendGridApiKey: process.env.SENDGRID_API_KEY,
  sendGridSender: process.env.SENDGRID_VERIFIED_SENDER,
  frontendUrl: process.env.FRONTEND_URL
};
