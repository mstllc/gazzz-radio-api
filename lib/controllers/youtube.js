const request = require('request-promise')
const config = require('../config/config.js')

// Get Gazz696 channel details
exports.getChannelDetails = function (req, res, next) {
  return ytAPIRequest('channels', {part: 'snippet', forUsername: config.youtube.username})
    .then(data => (res.json(data)))
    .catch(err => (next(err)))
}

// Generic YouTube API request function
function ytAPIRequest (path, params) {
  params.key = config.youtube.apiKey
  return request({
    uri: config.youtube.apiBase + path,
    qs: params,
    json: true
  })
}
