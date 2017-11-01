$(function () {
  // cache
  var $input = $('#inputbox');
  var $sbtn = $('#sendbtn');
  var $msgs = $('#messages');

  // socket
  var socket = io();
  var ioid = createID();
  $sbtn.click(function () {
    if ($input.val() === '') return;
    var data = {
      msg: $input.val(),
      ioid: ioid
    };
    socket.emit('say', data);
    $input.val('');
    return false;
  });
  socket.on('hear', function(data){
    console.log(data);
    var isMe = data.ioid === ioid;
    var $newMsg = $('<li>').addClass('row');
    var $newMsgInner = $('<div>');
    var $info = $('<div>').addClass('info');
    var user = isMe ? '我' : data.user;
    $info.append($('<span>').addClass('time').text(dateFormat(new Date(data.time), 'hh:mm:ss')));
    $info.append($('<span>').addClass('user').text(user));
    if (isMe) $info.css('text-align', 'right');
    $newMsgInner.append($info);
    $newMsgInner.append($('<div>').addClass('bubble').text(data.msg));
    if (isMe) {
      $newMsg.append($('<div>').addClass('col-md-5').addClass('col-xs-5'));
      $newMsg.append($newMsgInner.addClass('col-md-7').addClass('col-xs-7').addClass('right'));
    } else {
      $newMsg.append($newMsgInner.addClass('col-md-7').addClass('col-xs-7').addClass('left'));
      $newMsg.append($('<div>').addClass('col-md-5').addClass('col-xs-5'));
    }
    $msgs.append($newMsg);
    scrollToBottom();
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

  function createID() {
    var matches = document.cookie.match('connect.sid=(.+)');
    return matches[1];
  }

  function scrollToBottom() {
    console.log('scroll')
    var h = $(document).height() - $(window).height();
    $(document).scrollTop(h);
  }
});