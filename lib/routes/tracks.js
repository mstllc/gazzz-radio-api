const express = require('express')
const tracks = require('../controllers/tracks.js')
const router = express.Router()

router.route('/')
  .get(tracks.findAll)

router.route('/random')
  .get(tracks.randomTrack)

module.exports = router
