# Patatap Clone

## About the app
- each keypress triggers the drawing of an animated circle at a random point inside the viewport (responsive) 
- circles are generated with a random rgb color
- each keypress also triggers the playing of a sound randomly picked from an array of options.

## Development tools
- GULP taskrunner for SASS
- Javscript compilation with Webpack
- libraries Paper.js and Howler.js are bundled in the vendor.js
- BrowserSync dev server
- A Gulp task generates a json file with the paths of all sound files in the assets dir
- The local json file is loaded and read with a XMLHttpRequest

## NPM scripts
```
npm run dev
npm run build
npm run production
```

## Credits
Exercise based on the Patatap-Clone in The Web Developer Bootcamp, by Colt Steele.