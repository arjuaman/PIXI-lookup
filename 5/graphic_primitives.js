// All shapes are made by first creating a new instance of Pixi's Graphics class (PIXI.Graphics).

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


let rectangle = new PIXI.Graphics();
rectangle.lineStyle(4, 0xFF3300, 1);   // to give the shape an outline. Here's how to give the rectangle a 4 pixel wide red outline, with an alpha value of 1.
rectangle.beginFill(0x66CCFF);         // to set the rectangle’ s fill color
rectangle.drawRect(0, 0, 64, 64);      // rectangle.drawRect(x, y, width, height);
rectangle.endFill();
rectangle.x = 170;
rectangle.y = 170;
app.stage.addChild(rectangle);

let circle = new PIXI.Graphics();
circle.beginFill(0xFFFFFF);
circle.drawCircle(0, 0, 32);       // drawCircle(x, y, radius)
// Unlike rectangles and sprites, a circle’s x and y position is also its center point.
circle.endFill();
circle.x = 64;
circle.y = 130;
app.stage.addChild(circle);