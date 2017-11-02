$(function () {
  // cache
  var $input = $('#inputbox');
  var $sbtn = $('#sendbtn');
  var $msgs = $('#messages');

  // user
  var user;
  $.get('/user', function (res) {
    if (!res.code) user = res.data;
  });

  // history msgs
  $.get('/msgs', function (res) {
    if (res.code) return;
    var msgs = res.data;
    for (var k in msgs) {
      appendMessage(msgs[k]);
    }
  });

  // socket
  var socket = io();
  var ioid = createID();
  $sbtn.click(function () {
    if ($input.val() === '') return;
    var message = {
      msg: $input.val(),
      ioid: ioid,
      user: user
    };
    socket.emit('say', message);
    $input.val('');
    return false;
  });
  socket.on('hear', function(message){
    appendMessage(message);
  });

  // hotkey
  $input.keyup(function (e) {
    if (e.which === 13) $sbtn.click();
  });

  //methods
  function dateFormat(date, fmt) { //author: meizz
    var o = {
      "M+": date.getMonth() + 1, //月份
      "d+": date.getDate(), //日
      "h+": date.getHours(), //小时
      "m+": date.getMinutes(), //分
      "s+": date.getSeconds(), //秒
      "q+": Math.floor((date.getMonth() + 3) / 3), //季度
      "S": date.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
  }

  // core funcs
  function appendMessage(message) {
    var isMe = message.ioid === ioid;
    var $newMsg = $('<li>').addClass('row');
    var $newMsgInner = $('<div>');
    var $info = $('<div>').addClass('info');
    var user = isMe ? '我' : message.user.name;
    $info.append($('<span>').addClass('time').text(dateFormat(new Date(message.time), 'hh:mm:ss')));
    $info.append($('<span>').addClass('user').text(user));
    if (isMe) $info.css('text-align', 'right');
    $newMsgInner.append($info);
    $newMsgInner.append($('<div>').addClass('bubble').text(message.msg));
    if (isMe) {
      $newMsg.append($('<div>').addClass('col-md-5').addClass('col-xs-5'));
      $newMsg.append($newMsgInner.addClass('col-md-7').addClass('col-xs-7').addClass('right'));
    } else {
      $newMsg.append($newMsgInner.addClass('col-md-7').addClass('col-xs-7').addClass('left'));
      $newMsg.append($('<div>').addClass('col-md-5').addClass('col-xs-5'));
    }
    $msgs.append($newMsg);
    scrollToBottom();
  }

  // tool funcs
  function createID() {
    var matches = document.cookie.match('connect.sid=(.+)');
    return matches[1];
  }

  function scrollToBottom() {
    var h = $(document).height() - $(window).height();
    $(document).scrollTop(h);
  }


});