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
    .add("images/tileset.json")
    .load(setup);

let id, monkey, dungeon, door, banana, blob;

function setup() {
    id = resources["images/tileset.json"].textures;

    blob = new Sprite(id["blob.png"]);
    blob.height = 64;
    blob.width = 64;
    blob.position.set(48, 48);

    monkey = new Sprite(id["monke.png"]);
    monkey.height = 64;
    monkey.width = 64;
    monkey.position.set(96, 96);

    banana = new Sprite(id["banana.jpg"]);
    banana.height = 64;
    banana.width = 64;
    banana.position.set(128, 138);

    let game = new PIXI.Container();

    game.addChild(blob);
    game.addChild(monkey);
    game.addChild(banana);

    // You can now treat the game group as a single unit. You can think of a Container as a special kind of sprite that doesn’t have a 
    // texture.
    // If you need a list of all the child sprites that game contains, use its children array to find out.
    console.log(game.children);

    // Because the game group is just like any other sprite, you can change its x and y values, alpha, scale and all the other 
    // sprite properties.
    //  Any property value you change on the parent container will affect the child sprites in a relative way. 
    // So if you set the group's x and y position, all the child sprites will be repositioned relative to the group's top left corner. 
    game.position.set(64, 64);

    //The game group also has its own dimensions, which is based on the area occupied by the containing sprites. You can find its width and height values like this:
    console.log(game.width);
    console.log(game.height);

    game.width = 200;
    game.height = 200;
    //All the child sprites will scale to match this change.

    // You can nest as many Containers inside other Containers as you like, to create deep hierarchies if you need to. 
    // However, a DisplayObject (like a Sprite or another Container) can only belong to one parent at a time. 
    // If you use addChild to make a sprite the child of another object, Pixi will automatically remove it from its current parent.

    app.stage.addChild(game);
}

