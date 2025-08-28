/**
 * The `corsOptions` object is a configuration object that tells the server which origins are
allowed to make requests to this server. 
 * 
 * The `origin` property is an array of allowed origins. 
 * 
 * The `optionsSuccessStatus` property is a number that tells the browser how to respond to a CORS
OPTIONS request. 
 * 
 * The `credentials` property is a boolean that tells the browser whether to send credentials
(cookies, for example) with the request. 
 * 
 * The `exposedHeaders` property is an array of headers
 */
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    const allowedOrigins = [
      "http://localhost:3000",
      "http://localhost:3001",
      "https://social-hq-backend.vercel.app",
      "https://socialhq-api.up.railway.app",
    ];

    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
  credentials: true,
  exposedHeaders: ["set-cookie"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Requested-With",
    "Accept",
    "Origin",
    "Access-Control-Request-Method",
    "Access-Control-Request-Headers",
  ],
  preflightContinue: false,
};

module.exports = corsOptions;
