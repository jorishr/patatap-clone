# patatap-clone

Exercise based on the Patatap-Clone in The Web Developer Bootcamp, by Colt Steele.

Libraries used: Paper.js and howler.js

Customizations (not part of the original course example):

A. DEV SETUP

- project built with NPM
- GULP taskrunner for SASS and JS compilation with Webpack
- both libraries are imported in the vendor.js
- browserSync
- gulp task to generate a json file with the paths of all sound files in the 
assets dir
- the local json file is loaded and read with a XMLHttpRequest

B. FUNCTIONALITY

- each keypress triggers the drawing of an animated circle at a random point 
inside the viewport (responsive) 
- circles are generated with a random rgb color
- each keypress also triggers the playing of a sound randomly picked from an 
array of options.