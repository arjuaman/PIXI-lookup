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

//forceCanvas = true;

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
    woody.position.set(196,196)

    //You can change a sprite's size by setting its width and height properties. 
    woody.height = 100;
    woody.width = 100;

    //Sprites also have scale.x and scale.y properties that change the sprite's width and height proportionately. 
    woody.scale.x = 1.5;
    woody.scale.y = 1.5;

    //Pixi has an alternative, concise way for you set sprite's scale in one line of code using the scale.set method.
    woody.scale.set(1, 1);

    //ROTATION: 
    // a sprite's top left corner represents its x and y position. That point is called the anchor point. 
    // If you set the sprite’s rotation property to 
    // something like 0.5, the rotation will happen around the sprite’s anchor point.

    woody.rotate = 1.5;

    // What if you want the sprite to rotate around its center?
    // Change the sprite’s anchor point so that it’s centered inside the sprite

    woody.anchor.x = 0.5;
    woody.anchor.y = 0.5;
    
    // Just like with position and scale, you can set the anchor’s x and y values with one line of code like this:
    woody.anchor.set(0.5,0.5);

    // Sprites also have a pivot property which works in a similar way to anchor. pivot sets the position of the sprite's x/y origin point.
    // If you change the pivot point and then rotate the sprite, it will rotate around that origin point. 
    // For example, the following code will set the sprite's pivot.x point to 32, and its pivot.y point to 32

    woody.pivot.set(32,32);

    app.stage.addChild(woody);
}

