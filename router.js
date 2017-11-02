
const router = require('express').Router();

module.exports = router;

router.get('/', (req, res) => {
  res.sendFile(ROOTPATH + '/views/index.html');
});

router.get('/user', (req, res) => {
  res.json({code:0, data: req.session.user});
});
