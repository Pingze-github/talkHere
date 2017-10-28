$(function () {
  // cache
  var $input = $('#inputbox');
  var $sbtn = $('#sendbtn');
  var $msgs = $('#messages');

  // socket
  var socket = io();
  $sbtn.click(function () {
    socket.emit('say', $input.val());
    $input.val('');
    return false;
  });
  socket.on('say', function(msg){
    $msgs.append($('<li>').text(msg));
  });

  // hotkey
  $input.keyup(function (e) {
    if (e.which === 13) $sbtn.click();
  });
});