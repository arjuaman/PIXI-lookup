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

let imgs = ["images/i2.png", "images/i4.png", "images/i1.jpg", "images/i3.jpg", "images/i5.jpg",
    "images/i6.jpg", "images/i7.jpg", "images/i8.jpg", "images/i9.jpg", "images/i10.jpg",];

loader
    .add("images/i2.png")
    .on("progress", loadProgressHandler)
    .load(setup);

function loadProgressHandler(loader, resource) {
    console.log("loading: " + resource.url);
    console.log("progress: " + loader.progress + "%");
}

// You can change the position of the cat by changing the values of its x and y properties. 
//Here's how you can center the cat in the stage by setting its x and y property values to 96.

function setup() {
    console.log("All files loaded");
    let woody = new Sprite(resources["images/i2.png"].texture);
    woody.x = 196;
    woody.y = 196;

    // can be also set in a single line of code:
    // woody.position.set(196,196)

    //You can change a sprite's size by setting its width and height properties. 
    woody.height = 100;
    woody.width = 100;

    //Sprites also have scale.x and scale.y properties that change the sprite's width and height proportionately. 
    woody.scale.x = 2;
    woody.scale.y = 2;

    //Pixi has an alternative, concise way for you set sprite's scale in one line of code using the scale.set method.
    
    app.stage.addChild(woody);
}

