
module.exports = (io) => {
  io.on('connection', function(socket){
    socket.on('connect', function(){
      console.log(`User ${socket.conn.remoteAddress} connected`);
    });
    socket.on('disconnect', function(){
      console.log(`User ${socket.conn.remoteAddress} disconnected`);
    });

    socket.on('say', function(data){
      console.log(`User ${socket.conn.remoteAddress} say ${data.msg}`);
      const message = {
        ioid: data.ioid,
        msg: data.msg,
        user: data.user,
        time: new Date()
      };
      $mdb.message.add(message);
      io.emit('hear', message);
    });
  });
};

