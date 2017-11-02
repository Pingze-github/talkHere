/**
 * TalkHere
 * author: wang719695@henhaoji.com
 * create: 2017.8.1
 */

const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

process.on('unhandledRejection', (rej) => {
  console.error(rej);
});

require('./io')(io);

require('./globals');
const router = require('./router');
const login = require('./middlewares/login');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static('public'));

app.use(session({
  secret: 'talkHere',
  maxAge: 30 * 24 * 3600 * 1000,
  resave: false,
  saveUninitialized: true,
  cookie: {secure: false, httpOnly: false, maxAge: 7 * 24 * 60 * 1000},
  store: new MongoStore({url: $config.mongo.url})
}));

app.use(login());

app.use(router);

app.get((req, res) => {
  res.status(404);
  res.end('404');
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500);
  res.end('internal error');
});


http.listen($config.port, () => {
  console.log(`server running at ${$config.port} ...`)
});

