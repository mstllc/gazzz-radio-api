const express = require('express')
const youtube = require('../controllers/youtube.js')
const router = express.Router()

router.route('/')
  .get(youtube.getChannelDetails)

module.exports = router
