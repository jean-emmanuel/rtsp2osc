#!/usr/bin/env node

var rtsp = require('rtsp-ffmpeg'),
    osc = require('osc')

var opts = require('yargs')
    .usage('Usage: $0 [options]')
    .option('stream', {describe:'rtsp:// video stream url', required:true})
    .option('send', {describe:'osc target (ip:port)', required:true})
    .option('address', {describe:'osc address', required:true})
    .option('pre-args', {describe:'osc args before the image data', type: 'list', default:[]})
    .option('framerate', {describe:'frames per second', default: 10})
    .option('resolution', {describe:'<width>x<height>'})
    .option('quality', {describe:'jpeg quality', default: 3})
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

var packet = {
    address: opts.address,
    args: opts['pre-args'].concat('')
}


stream = new rtsp.FFMpeg({
    input: opts.stream,
    rate: opts.framerate,
    resolution: opts.resolution,
    quality: opts.quality
})

server.on('error', (err)=>{

    if (err.code === 'EMSGSIZE') {
        console.error('Error: packet is too big to be sent, try lowering the quality / resolution')
    } else {
        console.error(err.Error)
    }

})

server.open()

stream.on('data', (data)=>{

    packet.args[packet.args.length - 1] = 'data:image/jpeg;base64,' + data.toString('base64')

    server.send(packet, host, port)

    if (opts.debug) console.log('OSC Sent: ' + opts.send + ' ' + opts.address + ' ' + String(opts['pre-args']) + ' ' + 'data:image/jpeg;base64,... (' + (Buffer.byteLength(String(packet.args), 'utf8') / 1000).toFixed(1) + 'Kb)')

})
