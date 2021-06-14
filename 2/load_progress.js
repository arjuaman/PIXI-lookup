let canvas = document.getElementById('canvas');
let _w = window.innerWidth;
let _h = window.innerHeight;

//Aliases
let Application = PIXI.Application,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    Sprite = PIXI.Sprite;

let app = new Application({
    // view: canvas,
    height: _h,
    width: _w,
    antialias: true,
    transparent: false,
    resolution: 1
})

document.body.appendChild(app.view)

forceCanvas = true;

app.renderer.backgroundColor = 0x427462;
app.renderer.autoResize = true;


// Pixi's loader has a special progress event that will call a customizable function that will run each time 
//a file loads. progress events are called by the loader's on method, like this:

// PIXI.loader.on("progress", loadProgressHandler);
// function loadProgressHandler() {
//   console.log("loading"); 
// }

let imgs = ["images/i2.png", "images/i4.png","images/i1.jpg","images/i3.jpg","images/i5.jpg",  
            "images/i6.jpg","images/i7.jpg","images/i8.jpg","images/i9.jpg","images/i10.jpg",];

var addby = 100 / imgs.length;
var element = document.getElementById("my-bar");
var i = 0;


loader
    .add(imgs)
    //   .add("lf2","woody.png")
    .on("progress", loadProgressHandler)
    .load(setup);

// function loadProgressHandler() {
//     console.log("loading");
// }

// function setup() {
//     console.log("setup");
// }

// You can also find out exactly which file has loaded and what percentage of overall files are have currently loaded. 
//You can do this by adding optional loader and resource parameters to the loadProgressHandler
//var temp = setInterval(loadProgressHandler,1000);
function loadProgressHandler(loader, resource) {

    //Display the file `url` currently being loaded
    console.log("loading: " + resource.url);

    //Display the percentage of files currently loaded
    console.log("progress: " + loader.progress + "%");

    //If you gave your files names as the first argument 
    //of the `add` method, you can access them like this
    //console.log("loading: " + resource.name);


    i += addby;
    element.style.width = i + '%';

}

function setup() {
    console.log("All files loaded");
}