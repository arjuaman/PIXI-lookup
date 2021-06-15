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

loader
    .add("images/spritesheet.png")
    .load(setup);

let rocket;
// function setup() {
//     let texture = PIXI.utils.TextureCache["images/spritesheet.png"];
//     let rectangle = new Rectangle(96, 64, 32, 32);
//     texture.frame = rectangle;
//     rocket = new Sprite(texture);
//     rocket.position.set(500, 500);

//     app.ticker.add(delta => gameLoop(delta));

//     app.stage.addChild(rocket);
//     app.renderer.render(app.stage);
// }

// function gameLoop(delta) {
//     //Any code you put inside the game loop will update 60 times per second.
//     //Move the rocket 1 pixel 
    
//     //rocket.x += 1;

//     // The delta value represents the amount of fractional lag between frames. 
//     // You can optionally add it to the cat's position, to make the cat's animation independent of the frame rate.

//     rocket.x += 1 + delta;
// }

// We can also use requestAnimationFrame instead of ticker:

// function gameLoop() {
//   requestAnimationFrame(gameLoop);
//   rocket.x += 1;
// }
// gameLoop();



// it's a good idea to control a sprite's movement speed using two velocity properties: vx and vy. 
// vx is used to set the sprite's speed and direction on the x axis (horizontally). vy is used to set the sprite's 
// speed and direction on the y axis (vertically). Instead of changing a sprite's x and y values directly, 
// first update the velocity variables, and then assign those velocity values to the sprite.

function setup() {
    let texture = PIXI.utils.TextureCache["images/spritesheet.png"];
    let rectangle = new Rectangle(96, 64, 32, 32);
    texture.frame = rectangle;
    rocket = new Sprite(texture);
    rocket.position.set(32, 32);

    rocket.vx = 0;
    rocket.vy = 0;

    app.ticker.add(delta => gameLoop(delta));

    app.stage.addChild(rocket);
    app.renderer.render(app.stage);
}

function gameLoop(delta){

    //Update the rocket's velocity
    rocket.vx = 1;
    rocket.vy = 0;
    //can modify to change directions
  
    //Apply the velocity values to the rocket's 
    //position to make it move
    rocket.x += rocket.vx;
    rocket.y += rocket.vy;
  }