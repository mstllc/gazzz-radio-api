const mongoose = require('mongoose')
const Track = mongoose.model('Track')

// Find all tracks
exports.findAll = function (req, res, next) {
  Track.find({}).sort({publishedAt: 'desc'}).lean().exec((err, tracks) => {
    if (err) return next(err)

    return res.json(tracks)
  })
}

// Get 1 random track
exports.randomTrack = function (req, res, next) {
  Track.random((err, track) => {
    if (err) return next(err)

    return res.json(track)
  })
}
