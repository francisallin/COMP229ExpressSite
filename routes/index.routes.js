const express = require('express');
const router = express.Router();//built in function, create router obj

module.exports = router;
router.use('/api/v1/posts', require('./post.routes')); //mount a middleware onto that route