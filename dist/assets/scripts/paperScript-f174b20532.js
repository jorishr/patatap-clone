let circleArray=[];function onKeyDown(e){pickSound(),new Howl({src:[randomSound]}).play(),createRenderPoint(),createRandomRgb();let n=new Path.Circle(renderPoint,300);n.fillColor=randomRgb,circleArray.push(n)}function createRenderPoint(){let e=new Point(window.innerWidth,window.innerHeight),n=new Point(Math.random(),Math.random());return renderPoint=n*e}function createRandomRgb(){let e=Math.floor(255*Math.random()),n=Math.floor(255*Math.random()),r=Math.floor(255*Math.random());return randomRgb=`rgb(${e}, ${n}, ${r})`}function pickSound(){let e=Math.round(Math.random()*(soundFiles.length-1));return randomSound=soundFiles[e]}function loadJson(e,n){let r=new XMLHttpRequest;r.overrideMimeType("application/json"),r.open("GET",e,!0),r.onreadystatechange=function(){4===this.readyState&&200==this.status&&setTimeout(()=>{n(this.responseText)},0)},r.send(null)}function onFrame(e){for(let e=0;e<circleArray.length;e++)circleArray[e].fillColor.hue+=1,circleArray[e].scale(.925),circleArray[e].area<1&&(circleArray[e].remove(),circleArray.splice(e,1))}loadJson("assets/scripts/mp3list.json",function(e){return soundFiles=JSON.parse(e)});