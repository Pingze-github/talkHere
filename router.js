
const router = require('express').Router();

module.exports = router;

router.get('/', (req, res) => {
  res.sendFile(ROOTPATH + '/views/index.html');
});

