const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TrackSchema = new Schema({
  videoId: {type: String, required: true, unique: true},
  title: {type: String, required: true},
  description: {type: String, default: 'Not provided.'},
  publishedAt: {type: Date, required: true},
  thumbnailDefault: String,
  thumbnailMed: String,
  thumbnailHigh: String,
  thumbnailStandard: String,
  thumbnailMaxRes: String
})

TrackSchema.statics.random = function (callback) {
  this.count(function (err, count) {
    if (err) {
      return callback(err)
    }
    const rand = Math.floor(Math.random() * count)
    this.findOne().skip(rand).exec(callback)
  }.bind(this))
}

module.exports = mongoose.model('Track', TrackSchema)
