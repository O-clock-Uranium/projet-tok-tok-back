const expressSession = require("express-session");
const { Client } = require("pg");
const pgSession = require('connect-pg-simple')(expressSession);

const pgConnexion = new Client(process.env.PG_URL);
pgConnexion.connect();

const pgStore = new pgSession({
  pool : pgConnexion,
  tableName : 'user_sessions',
  createTableIfMissing: true
});
const sessionMiddleware = expressSession({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 1000 * 60 * 60, secure: false },
  store: pgStore
});

module.exports = sessionMiddleware;
