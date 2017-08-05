/**
 * 简单聊天室
 * author: wang719695@henhaoji.com
 * create: 2017.8.1
 */

const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const session = require('express-session');

require('./globals');
const router = require('./router');
const login = require('./middlewares/login');

mongoose.Promise = Promise;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static('public'));

app.use(session({
  secret: 'talkHere',
  maxAge: 7 * 24 * 3600 * 1000,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
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

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('a user disconnected');
  });

  socket.on('say', function(msg){
    console.log('message: ' + msg);
    io.emit('say', msg);
  });
});

http.listen(config.port, () => {
  console.log(`server running at ${config.port} ...`)
});