
function getIp(req) {
  return req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;
}

module.exports = function () {
  return function (req, res ,next) {
    console.log()
    console.log(req.url)
    console.log(req.session.id);
/*    if (req.url === '/login') {
      if (req.method === 'POST') {
        if (config.psts.includes(req.body.pst)) {
          let ip = getIp(req);
          req.session.user = {
            name: ip,
            ip
          };
          console.log(req.session.user);
          return res.redirect('/');
        } else {
          return res.json({code: 1, msg: 'invalid passport', data: {}})
        }
      } else {
        return res.sendFile(ROOTPATH + '/views/login.html');
      }
      if (req.session.user) {
        res.redirect('/');
      }
    } else if (!req.session.user || (req.session.user && req.session.user.ip !== getIp(req))) {
      console.log('redirect');
      res.redirect('/login');
    }*/
    next();
  }
};