// Pixi has an alternative, high-performance way to group sprites called a ParticleContainer (PIXI.particles.ParticleContainer). 
// Any sprites inside a ParticleContainer will render 2 to 5 times faster than they would if they were in a regular Container. 
// It’s a great performance boost for games.

// Create a ParticleContainer like this:

// >>  let superFastSprites = new PIXI.particles.ParticleContainer();
// Then use addChild to add sprites to it, just like you would with any ordinary Container

// You have to make some compromises if you decide to use a ParticleContainer. Sprites inside a ParticleContainer only have a few 
// basic properties: x, y, width, height, scale, pivot, alpha, visible – and that’s about it. Also, the sprites that it contains can’t 
// have nested children of their own. A ParticleContainer also can’t use Pixi’s advanced visual effects like filters and blend modes. 
// Each ParticleContainer can use only one texture (so you'll have to use a spritesheet if you want Sprites with different appearances). 
// But for the huge performance boost that you get, those compromises are usually worth it. And you can use Containers and 
// ParticleContainers simultaneously in the same project, so you can fine-tune your optimization.

// Where you create a ParticleContainer, there are four optional arguments you can provide: size, properties, batchSize and autoResize.

// let superFastSprites = new ParticleContainer(maxSize, properties, batchSize, autoResize);
// The default value for maxSize is 1500. So, if you need to contain more sprites, set it to a higher number. The properties argument is an object with 5 Boolean values you can set: scale, position, rotation, uvs and alphaAndTint. The default value of position is true, but all the others are set to false. That means that if you want change the rotation, scale, tint, or uvs of sprite in the ParticleContainer, you have to set those properties to true, like this:

// >>  let superFastSprites = new ParticleContainer(
// >>    size, 
// >>    {
// >>      rotation: true,
// >>      alphaAndtint: true,
// >>      scale: true,
// >>      uvs: true
// >>    }
// >>  );


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

    let game = new PIXI.particles.ParticleContainer();

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

    console.log("banana's global position inside the game group is: ");
    console.log(game.toGlobal(banana.position));

    console.log("Child's global position is: ");
    console.log(banana.parent.toGlobal(banana.position));

    console.log(banana.getGlobalPosition().x +" " + banana.getGlobalPosition().y);

    console.log("Distance btn banana and blob: ");
    console.log(banana.toLocal(banana.position, blob).x);
    console.log(banana.toLocal(banana.position, blob).y);

    app.stage.addChild(game);
}

