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

    console.log("Children within conatiner are: "+game.children);

    game.position.set(64, 64);
    console.log("Game width is: "+game.width);
    console.log("Game height is: "+game.height);
    game.width = 200;
    game.height = 200;

    console.log("Monkey's x position is: "+monkey.x);

    // Sprites also have a global position. The global position is the distance from the top left corner of the stage, to the 
    // sprite's anchor point (usually the sprite's top left corner.) You can find a sprite's global position with the help of 
    // the toGlobal method. Here's how:
    // >> parentSprite.toGlobal(childSprite.position)

    //That means you can find the banana's global position inside the game group like this:
    console.log("banana's global position inside the game group is: ");
    console.log(game.toGlobal(banana.position));

    // What if you want to find the global position of a sprite, but don't know what the sprite's parent container is? 
    // Every sprite has a property called parent that will tell you what the sprite's parent is. If you add a sprite directly to the 
    // stage, then stage will be the sprite's parent. In the example above, the banana's parent is game. That means you can alternatively 
    // get the banana's global position by writing code like this:

    console.log("Child's global position is: ");
    console.log(banana.parent.toGlobal(banana.position));

    // 3rd and best method:
    console.log(banana.getGlobalPosition().x +" " + banana.getGlobalPosition().y);
    // The special thing about getGlobalPosition is that it's highly precise: it will give you the sprite's accurate global position 
    // as soon as its local position changes.

    // To convert a global position to a local position:
    // sprite.toLocal(sprite.position, anyOtherSprite)

    // Use toLocal to find the distance between a sprite and any other sprite. Here's how you could find out the banana's local position, 
    // relative to the blob.
    console.log("Distance btn banana and blob: ");
    console.log(banana.toLocal(banana.position, blob).x);
    console.log(banana.toLocal(banana.position, blob).y);

    app.stage.addChild(game);
}

