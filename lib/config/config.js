const c = {
  server: {
    host: '127.0.0.1',
    port: 3030
  },
  mongo: {
    uri: 'mongodb://127.0.0.1/gazzzradio',
    options: {
      db: {
        safe: true
      }
    }
  },
  youtube: {
    apiKey: 'AIzaSyAbUJ72YIPJ69kAzgaLAiiAGt1SaVV6x-s',
    apiBase: 'https://www.googleapis.com/youtube/v3/',
    username: 'Gazzz696',
    channelId: 'UC2GK1jS6xrYTh4Xo9qsYSgQ',
    playlistId: 'UU2GK1jS6xrYTh4Xo9qsYSgQ'
  }
}

module.exports = c
