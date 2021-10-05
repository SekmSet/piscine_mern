const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    api: 'v1',
    description: 'Page home de mon api',
  });
});

module.exports = router;
