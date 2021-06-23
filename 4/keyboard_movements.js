//keyboard function pasted here:
function keyboard(value) {
    let key = {};
    key.value = value;
    key.isDown = false;
    key.isUp = true;
    key.press = undefined;
    key.release = undefined;
    //The `downHandler`
    key.downHandler = event => {
        if (event.key === key.value) {
            if (key.isUp && key.press) key.press();
            key.isDown = true;
            key.isUp = false;
            event.preventDefault();
        }
    };

    //The `upHandler`
    key.upHandler = event => {
        if (event.key === key.value) {
            if (key.isDown && key.release) key.release();
            key.isDown = false;
            key.isUp = true;
            event.preventDefault();
        }
    };

    //Attach event listeners
    const downListener = key.downHandler.bind(key);
    const upListener = key.upHandler.bind(key);

    window.addEventListener(
        "keydown", downListener, false
    );
    window.addEventListener(
        "keyup", upListener, false
    );

    // Detach event listeners
    key.unsubscribe = () => {
        window.removeEventListener("keydown", downListener);
        window.removeEventListener("keyup", upListener);
    };

    return key;
}

// let keyObject = keyboard(keyValue);

// // Its one argument is the key value that you want to listen for.
// // List of key values can be found at: 
// // https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values

// // Then assign press and release methods to the keyboard object like this:

// keyObject.press = () => {
//   //key object pressed
// };
// keyObject.release = () => {
//   //key object released
// };

// Keyboard objects also have isDown and isUp Boolean properties that you can use to check the state of each key.

// Don't forget to remove event listeners by using the unsubscribe method :

// keyObject.unsubscribe();




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

    //Capture the keyboard arrow keys 
    let left = keyboard("ArrowLeft"),
        up = keyboard("ArrowUp"),
        right = keyboard("ArrowRight"),
        down = keyboard("ArrowDown");

    //Left arrow key `press` method 
    left.press = () => {
        //Change the rocket's velocity when the key is pressed 
        rocket.vx = -5;
        rocket.vy = 0;
    };

    //Left arrow key `release` method 
    left.release = () => {
        //If the left arrow has been released, and the right arrow isn't down, 
        //and the rocket isn't moving vertically: 
        //Stop the rocket 
        if (!right.isDown && rocket.vy === 0) {
            rocket.vx = 0;
        }
    };

    //Up 
    up.press = () => {
        rocket.vy = -5;
        rocket.vx = 0;
    };
    up.release = () => {
        if (!down.isDown && rocket.vx === 0) {
            rocket.vy = 0;
        }
    };

    //Right 
    right.press = () => {
        rocket.vx = 5;
        rocket.vy = 0;
    };
    right.release = () => {
        if (!left.isDown && rocket.vy === 0) {
            rocket.vx = 0;
        }
    };

    //Down 
    down.press = () => {
        rocket.vy = 5;
        rocket.vx = 0;
    };
    down.release = () => {
        if (!up.isDown && rocket.vx === 0) {
            rocket.vy = 0;
        }
    };

    //Set the game state 
    state = play;

    //Start the game loop  
    app.ticker.add(delta => gameLoop(delta));
    app.renderer.render(app.stage);
}

function gameLoop(delta) {
    state(delta);
}

function play(delta) {
    // rocket.vx = 1;
    rocket.x += rocket.vx;
    rocket.y += rocket.vy;
}