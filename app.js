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
const mongoose = require('mongoose');

require('./globals');
const router = require('./router');

mongoose.Promise = Promise;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('public'));

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