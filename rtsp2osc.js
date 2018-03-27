#!/usr/bin/env node

var rtsp = require('rtsp-ffmpeg'),
    osc = require('osc')

var opts = require('yargs')
    .usage('Usage: $0 [options]')
    .option('stream', {describe:'rtsp:// video stream url', required:true})
    .option('send', {describe:'osc target (ip:port)', required:true})
    .option('address', {describe:'osc address', required:true})
    .option('pre-args', {describe:'osc args before the image data', type: 'list', default:[]})
    .option('framerate', {describe:'frames per second'})
    .option('resolution', {describe:'<width>x<height>'})
    .option('quality', {describe:'jpeg quality'})
    .option('debug', {describe:'print osc messages (data stripped out)'})
    .help('h').alias('h', 'help')
    .version('v').alias('v', 'version')
    .argv

var server = new osc.UDPPort({
    localAddress: "0.0.0.0",
    localPort: opts.port,
    metadata: false
})

var [host, port] = opts.send.split(':')

stream = new rtsp.FFMpeg({
    input: opts.stream,
    rate: opts.framerate,
    resolution: opts.resolution,
    quality: opts.quality
})

server.open()

stream.on('data', (data)=>{

    server.send({
        address: opts.address,
        args: opts['pre-args'].concat('data:image/jpeg;base64,' + data.toString('base64'))
    }, host, port)

    if (opts.debug) {

        console.log('OSC Sent: ' + opts.send + ' ' + opts.address + ' ' + String(opts['pre-args']) + ' ' + 'data:image/jpeg;base64,...(' + Buffer.byteLength('data:image/jpeg;base64,' + data.toString('base64'), 'utf8') / 1000 + 'kb)')

    }

})
