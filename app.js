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

  socket.on('connect', function(){
    console.log(`User ${socket.conn.remoteAddress} connected`);
  });
  socket.on('disconnect', function(){
    console.log(`User ${socket.conn.remoteAddress} disconnected`);
  });

  socket.on('say', function(data){
    console.log(`User ${socket.conn.remoteAddress} say ${data.msg}`);
    dataHear = {
      ioid: data.ioid,
      msg: data.msg,
      user: socket.conn.remoteAddress.match(/::(.+)/)[1].replace('ffff:',''),
      time: new Date()
    };
    io.emit('hear', dataHear);
  });
});

http.listen(config.port, () => {
  console.log(`server running at ${config.port} ...`)
});

