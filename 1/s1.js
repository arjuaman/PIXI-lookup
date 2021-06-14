import {Progress} from './ex1.ts';

// The application will create a renderer using WebGL, if possible,
// with a fallback to a canvas render. It will also setup the ticker
// and the root stage PIXI.Container.
let app = new PIXI.Application({ width: 256, height: 256 });

// The application will create a canvas element for you that you
// can then insert into the DOM.
document.body.appendChild(app.view);

forceCanvas = true;

app.renderer.backgroundColor = 0x427462;

console.log(app.renderer.view.height);
console.log(app.renderer.view.width);

app.renderer.autoResize = true;
app.renderer.resize(512, 512);

// app.renderer.view.style.position = "absolute";
// app.renderer.view.style.display = "black";
// app.renderer.autoResize = true;
// app.renderer.resize(window.innerWidth, window.innerHeight);



// class Progress {
//     p;
//     bar = document.getElementById('prog-bar');
//     addBy;

//     constructor(p,addBy) {
//         this.addBy = addBy;
//         this.p = p;
//         this.update();
//     }
//     update() {
//         this.bar.style.width = this.p + '%';
//     }
//     countup() {
//         if (this.p < 100) { this.p += addBy; }
//         this.update();
//     }
// }


var arr = ["bunny.png","screenshot.png"];
var addBy = 100/(arr.length);
var p = new Progress(0,addBy);

PIXI.loader
    .add(arr)
    .load(x);

var x = setInterval(function setup() {
    for (let i = 0; i < arr.length; i++) {
        let sprite = new PIXI.Sprite(
            PIXI.loader.resources[arr[i]].texture
        );
        app.stage.addChild(sprite);
        p.countup();
    }
}
,1000);
