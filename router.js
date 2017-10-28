
const router = require('express').Router();

module.exports = router;

router.get('/', (req, res) => {
  res.sendFile(ROOTPATH + '/views/index.html');
});

router.get('/m', (req, res) => {
  res.sendFile(ROOTPATH + '/views/mindex.html');
});
