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
  --framerate    frames per second                                  [défaut: 10]
  --resolution   <width>x<height>
  --quality      jpeg quality                                        [défaut: 3]
  --debug        print osc messages (data stripped out)
  -h, --help     Affiche de l'aide                                     [booléen]
  -v, --version  Affiche le numéro de version                          [booléen]
```


**Example**

Assuming Open Stage Control is running on default port and there's an Image widget with `address` set to `/image_1`

```
npm start -- --stream  rtsp://184.72.239.149/vod/mp4:BigBuckBunny_175k.mov --address /image_1 --send 127.0.0.1:8080 --resolution 320x240
```
