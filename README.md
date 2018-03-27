# rtsp2osc

Convert a video stream to base64-encoded jpeg frames and send them to Open Stage Control.

This is an implementation to example for https://github.com/jean-emmanuel/open-stage-control/issues/259.

```bash
git clone https://github.com/jean-emmanuel/rtsp2osc
cd rtsp2osc
npm install
npm start -- --help
```
```
Options:
  --stream       rtsp:// video stream url                               [requis]
  --send         osc target (ip:port)                                   [requis]
  --address      osc address                                            [requis]
  --pre-args     osc args before the image data                     [défaut: []]
  --framerate    frames per second
  --resolution   <width>x<height>
  --quality      jpeg quality
  --debug        print osc messages (data stripped out)
  -h, --help     Affiche de l'aide                                     [booléen]
  -v, --version  Affiche le numéro de version                          [booléen]

```
