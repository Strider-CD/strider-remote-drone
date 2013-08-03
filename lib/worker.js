
var core = require('strider-worker-core')
  , _ = require('lodash')
  , async = require('async')
  , SockEmitter = require('sockemitter')

module.exports = Worker

function Worker(socket, config) {
  this.socket = socket
  this.config = _.extend({
    speed: 1, // how should we determine the speed of the machine?
    capacity: 1
  }, config)
  this.io = new SockEmitter(socket)
  this.attachListeners(this.io)
  this.queue = async.queue(
    this.processJob.bind(this),
    this.config.capacity
  )
}

Worker.prototype = {
  attachListeners: function (io) {
    var self = this
    io.on('drone:query-info', function () {
      io.emit('drone:info', {
        speed: this.config.speed,
        capacity: this.config.capacity
      })
    })
    io.on('queue:new', function (data) {
      io.emit('job:queued', data.job_id, new Date().getTime())
      self.queue.push(data)
    })
  },
  processJob: function (data, next) {
    // TODO: use parrallel.js here if capacity > 1
    core.processJob(this.io, data, next)
  }
}
