/* 	
	NOTES
	- both libaries howler.js and paper.js are imported in the vendor.js file
	- consult the paper.js docs for methods and functions that are used
 	
	- when key is pressed, a circle is genereated along random x/y coordinates
	- a random sound is picked and played from an array of file(path)s 
	- the coordinates of the render cirles have to be inside the viewport
	- the circle radius is fixed at 300
	- each new circle is pushed to an array that is used for animations
*/
let circleArray= [];
let soundFiles = [
	"assets/audio/bubbles.mp3",
	"assets/audio/clay.mp3",
	"assets/audio/confetti.mp3",
	"assets/audio/corona.mp3",
	"assets/audio/dotted-spiral.mp3",
	"assets/audio/flash-1.mp3",
	"assets/audio/flash-2.mp3",
	"assets/audio/flash-3.mp3",
	"assets/audio/glimmer.mp3",
	"assets/audio/moon.mp3",
	"assets/audio/pinwheel.mp3",
	"assets/audio/piston-1.mp3",
	"assets/audio/piston-2.mp3",
	"assets/audio/piston-3.mp3",
	"assets/audio/prism-1.mp3",
	"assets/audio/prism-2.mp3",
	"assets/audio/prism-3.mp3",
	"assets/audio/splits.mp3",
	"assets/audio/squiggle.mp3",
	"assets/audio/strike.mp3",
	"assets/audio/suspension.mp3",
	"assets/audio/timer.mp3",
	"assets/audio/ufo.mp3",
	"assets/audio/veil.mp3",
	"assets/audio/wipe.mp3",
	"assets/audio/zig-zag.mp3",
];

function onKeyDown(event) {
	//	pick and play random sound with howler.js
	pickSound();
	let sound = new Howl({
		src: [randomSound]
	});
	sound.play();
	//	create a random renderpoint for the circle
	createRenderPoint();
	//	generate random rgb color code
	createRandomRgb()
	//	draw circle, colorfill and add to array
	let newCircle = new Path.Circle(renderPoint, 300);
	newCircle.fillColor = randomRgb;
	circleArray.push(newCircle);
};

function createRenderPoint(){
	let maxPoint 	= new Point(window.innerWidth, window.innerHeight);
	let randomPoint = new Point(Math.random(), Math.random());
	return renderPoint = randomPoint*maxPoint;
};

function createRandomRgb(){
	let maxNum 	= 255;
	let red 	= Math.floor(Math.random() * maxNum);
	let green 	= Math.floor(Math.random() * maxNum);
	let blue 	= Math.floor(Math.random() * maxNum);
	return randomRgb = `rgb(${red}, ${green}, ${blue})`;
};

//	pick random soundfile from array
function pickSound(){
	let num = Math.round(Math.random() * (soundFiles.length - 1));
	return randomSound = soundFiles[num];
};
/* 
	ANIMATIONS
	- onFrame handler function is called up to 60 times a second by Paper.js
	- on each new frame the hue changes with 1 unit
	- on each new frame the scale reduces to 95% of the frame before
	- once the circle area is less than one, remove from the array AND remove 
	from the canvas	
*/
function onFrame(event){
	for(let i = 0; i < circleArray.length; i++){
		circleArray[i].fillColor.hue += 1;
		circleArray[i].scale(.925);
		if(circleArray[i].area < 1){
			circleArray[i].remove();
			circleArray.splice(i, 1);
		};
	};
};


/* 
// fill the x and y axis with 10 circles every 100px
for(let x = 0; x < 1000; x+=100){
	for(let y = 0; y < 1000; y+=100){
		new Path.Circle(new Point(x + 20, y + 20), 20).fillColor = 'red';
	}
} 
*/