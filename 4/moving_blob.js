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

let rocket, state;

function setup() {
    let texture = PIXI.utils.TextureCache["images/spritesheet.png"];
    let rectangle = new Rectangle(96, 64, 32, 32);
    texture.frame = rectangle;
    rocket = new Sprite(texture);
    rocket.position.set(32, 32);

    rocket.vx = 0;
    rocket.vy = 0;

    app.stage.addChild(rocket);

    state = play;

    app.ticker.add(delta => gameLoop(delta));
    
    app.renderer.render(app.stage);
}

function gameLoop(delta){
    state(delta);
}

function play(delta){
    rocket.vx = 1;
    rocket.x += rocket.vx;
}