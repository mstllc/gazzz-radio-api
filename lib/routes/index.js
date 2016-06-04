const tracks = require('./tracks.js')
const channel = require('./channel.js')

module.exports = function (app) {
  app.route('/')
    .get((req, res, next) => (res.send('GazzzRadio API')))

  app.use('/tracks', tracks)
  app.use('/channel', channel)
}
