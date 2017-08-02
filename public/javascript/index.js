$(function () {
  let socket = io();
  $('form').submit(() => {
    let $m = $('#m');
    socket.emit('say', $m.val());
    $m.val('');
    return false;
  });
  socket.on('say', function(msg){
    $('#messages').append($('<li>').text(msg));
  });
});