const mongoose = require('mongoose')
const request = require('request-promise')
const bluebird = require('bluebird')
const async = bluebird.promisifyAll(require('async'))
const config = require('../lib/config/config.js')
const Track = require('../lib/models/track.js')

mongoose.Promise = global.Promise
mongoose.connect(config.mongo.uri, config.mongo.options)

function getPlaylistPage (pageToken) {
  const params = {
    key: config.youtube.apiKey,
    part: 'snippet',
    playlistId: config.youtube.playlistId,
    maxResults: 50
  }
  if (typeof pageToken === 'string') params.pageToken = pageToken

  return request({uri: config.youtube.apiBase + 'playlistItems', qs: params, json: true})
    .then(response => {
      return handlePageResponse(response)
    })
}

function handlePageResponse (response) {
  if (response.items) {
    return async.mapAsync(response.items, (item, callback) => {
      const snippet = item.snippet
      return callback(null, Track.findOneAndUpdate({videoId: snippet.resourceId.videoId}, {
        videoId: snippet.resourceId.videoId,
        title: snippet.title,
        description: snippet.description,
        publishedAt: snippet.publishedAt,
        thumbnailDefault: (snippet.thumbnails && snippet.thumbnails.default) ? snippet.thumbnails.default.url : undefined,
        thumbnailMed: (snippet.thumbnails && snippet.thumbnails.medium) ? snippet.thumbnails.medium.url : undefined,
        thumbnailHigh: (snippet.thumbnails && snippet.thumbnails.high) ? snippet.thumbnails.high.url : undefined,
        thumbnailStandard: (snippet.thumbnails && snippet.thumbnails.standard) ? snippet.thumbnails.standard.url : undefined,
        thumbnailMaxRes: (snippet.thumbnails && snippet.thumbnails.maxres) ? snippet.thumbnails.maxres.url : undefined
      }, {upsert: true}).exec())
    })
    .then(updatePromises => {
      return Promise.all(updatePromises)
        .then(() => {
          if (typeof response.nextPageToken === 'string') {
            return getPlaylistPage(response.nextPageToken)
          } else {
            return Promise.resolve()
          }
        })
    })
  } else {
    if (typeof response.nextPageToken === 'string') {
      return getPlaylistPage(response.nextPageToken)
    } else {
      return Promise.resolve()
    }
  }
}

console.log('---------- Begin Track Sync ' + new Date() + ' ----------')
getPlaylistPage()
  .then(() => {
    console.log('Track sync success')
    mongoose.disconnect()
  })
  .catch(error => {
    console.log('Error syncing videos: ', error)
    mongoose.disconnect()
  })
