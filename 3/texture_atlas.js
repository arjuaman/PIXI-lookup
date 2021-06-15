// If you’re working on a big, complex game, you’ll want a fast and efficient way to create sprites from tilesets. 
// This is where a texture atlas becomes really useful. 
// A texture atlas is a JSON data file that contains the positions and sizes of sub-images on a matching tileset PNG image. 
// If you use a texture atlas, all you need to know about the sub-image you want to display is its name. 
// You can arrange your tileset images in any order and the JSON file will keep track of their sizes and positions for you. 
// This is really convenient because it means the sizes and positions of tileset images aren’t hard-coded into your game program. 
// If you make changes to the tileset, like adding images, resizing them, or removing them, just re-publish the JSON file and your game will use that data to display the correct imag
// You won’t have to make any changes to your game code.

// Among the many advantages to using a texture atlas is that you can easily add 2 pixels of padding around 
// each image (Texture Packer does this by default.) This is important to prevent the possibility of texture bleed. 
// Texture bleed is an effect that happens when the edge of an adjacent image on the tileset appears next to a sprite.
// This happens because of the way your computer's GPU (Graphics Processing Unit) decides how to round fractional 
// pixels values. Should it round them up or down? This will be different for each GPU. Leaving 1 or 2 pixels 
// spacing around images on a tilseset makes all images display consistently.

// (Note: If you have two pixels of padding around a graphic, and you still notice a strange "off by one pixel" glitch 
// the way Pixi is displaying it, try changing the texture's scale mode algorithm. 
// Here's how: 
// >> texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
// These glitches can sometimes happen because of GPU floating point rounding errors.)

let Application = PIXI.Application,
    Sprite = PIXI.Sprite,
    Rectangle = PIXI.Rectangle,
    loader = PIXI.loader,
    resources = PIXI.loader.resources;

let _w = window.innerWidth;
let _h = window.innerHeight;

let app = new Application({
    height: _h,
    width: _w,
    antialias: true,
    transparent: false,
    resolution: 1
})

document.body.appendChild(app.view)
app.renderer.backgroundColor = 0x427462;
app.renderer.autoResize = true;

// To get the texture atlas into Pixi, load it using Pixi’s loader. If the JSON file was made with Texture Packer, 
// the loader will interpret the data and create a texture from each frame on the tileset automatically. 

loader
  .add("images/tileset.json")
  .load(setup);

//   Each image on the tileset is now an individual texture in Pixi’s cache. You can access each texture in the 
//   cache with the same name it had in Texture Packer (“blob.png”, “dungeon.png”, “explorer.png”, etc.).

// Pixi gives you three general ways to create a sprite from a texture atlas:

// 1. Using TextureCache:

// let texture = TextureCache["frameId.png"],
//     sprite = new Sprite(texture);

// 2. If you’ve used Pixi’s loader to load the texture atlas, use the loader’s resources:

// let sprite = new Sprite(
//   resources["images/treasureHunter.json"].textures["frameId.png"]
// );

// 3. Create an alias called id that points to texture’s altas’s textures object, like this:

// let id = PIXI.loader.resources["images/treasureHunter.json"].textures; 
// Then you can just create each new sprite like this:
// let sprite = new Sprite(id["frameId.png"]);

let id, monkey, dungeon, door, banana;
function setup(){
    id = resources["images/tileset.json"].textures;

    dungeon = new Sprite(id["dungeon.png"]);
    app.stage.addChild(dungeon);

    banana = new Sprite(id["monke.png"]);
    banana.width = 50;
    banana.height = 50;
    //banana.position.set(400,400);
    banana.x = app.stage.width - banana.width - 48;
    banana.y = app.stage.height/2 - banana.height/2;
    app.stage.addChild(banana);

    monkey = new Sprite(id["banana.jpg"]);
    monkey.height = 50;
    monkey.width = 50;
    //monkey.position.set(300,300);
    monkey.x = 68;
    monkey.y = app.stage.height/2 - monkey.height/2;
    app.stage.addChild(monkey);

    door = new Sprite(id["door.jpg"]);
    door.height = 50;
    door.width = 50;
    door.position.set(32,0);
    app.stage.addChild(door);

    let numBlobs = 6,
        spacing =  48,
        xOffset = 150;

    //Space each blob horizontally according to the `spacing` value.
    //`xOffset` determines the point from the left of the screen
    //at which the first blob should be added.

    for(let i=0;i<numBlobs;i++){
        let blob = new Sprite(id["blob.png"]);
        blob.height= 25;
        blob.width = 25;
        let x = spacing * i + xOffset;
        let y = randomInt(0,app.stage.height-blob.height);

        blob.position.set(x,y);
        app.stage.addChild(blob);
    }
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

