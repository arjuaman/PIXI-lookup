// A tileset (also known as spritesheets) is a single image file that contains sub-images. 
// The sub-images represent all the graphics you want to use in your game.

// Storing and accessing all your game graphics on a tileset is a very processor and memory efficient 
// way to work with graphics, and Pixi is optimized for this.

// You can capture a sub-image from a tileset by defining a rectangular area that's the same size and 
// position as the sub-image you want to extract.


let canvas = document.getElementById('canvas');
let _w = window.innerWidth;
let _h = window.innerHeight;

let Application = PIXI.Application,
    Sprite = PIXI.Sprite,
    Loader = PIXI.loader,
    Resources = PIXI.loader.resources;

let app = new Application({
    // view: canvas,
    height: _h,
    width: _w,
    antialias: true,
    transparent: false,
    resolution: 1
})

document.body.appendChild(app.view)
app.renderer.backgroundColor = 0x427462;
app.renderer.autoResize = true;

Loader
    .add("images/spritesheet.png")
   // .on("progress", loadProgressHandler)
    .load(setup);

// After loading, use a rectangular sub-section of the tileset to create the sprite’s image.
// Then extract the sub image, create the rocket sprite, and position and display it on the canvas.
let Rectangle = PIXI.Rectangle;
function setup(){
    //Create the `tileset` sprite from the texture
    let texture = PIXI.utils.TextureCache["images/spritesheet.png"];

    //Create a rectangle object that defines the position and
    //size of the sub-image you want to extract from the texture
    //(`Rectangle` is an alias for `PIXI.Rectangle`)
    //It takes four arguments. The first two arguments define the rectangle's x and y position.
    // The last two define its width and height.
    let rectangle = new Rectangle(96, 64, 32, 32);

    //Tell the texture to use that rectangular section
    //The frame crops the texture to the dimensions of the Rectangle
    texture.frame = rectangle;

    //Create the sprite from the texture
    let rocket = new Sprite(texture);

    rocket.position.set(32,32);

    app.stage.addChild(rocket);

    app.renderer.render(app.stage);

}