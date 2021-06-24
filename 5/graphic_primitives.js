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

// PIXI.Graphics objects, like lines, have x and y values, just like sprites, so you can position them anywhere on the stage after you've drawn them.

// rectangle.drawRect(x, y, width, height);
let rectangle = new PIXI.Graphics();
rectangle.lineStyle(4, 0xFF3300, 1);   // to give the shape an outline. Here's how to give the rectangle a 4 pixel wide red outline, with an alpha value of 1.
rectangle.beginFill(0x66CCFF);         // to set the rectangle’ s fill color
rectangle.drawRect(0, 0, 64, 64);      
rectangle.endFill();
rectangle.x = 170;
rectangle.y = 170;
app.stage.addChild(rectangle);


// drawCircle(x, y, radius)
let circle = new PIXI.Graphics();
circle.lineStyle(4, 0x88FFAA, 1);
circle.beginFill(0xFFFFFF);
circle.drawCircle(0, 0, 32);       
// Unlike rectangles and sprites, a circle’s x and y position is also its center point.
circle.endFill();
circle.x = 64;
circle.y = 130;
app.stage.addChild(circle);


// drawEllipse(x, y, width, height);
let ellipse = new PIXI.Graphics();
ellipse.lineStyle(4, 0xFF3300, 1);
ellipse.beginFill(0xFFFF00);
ellipse.drawEllipse(0, 0, 50, 20);
ellipse.endFill();
ellipse.x = 180;
ellipse.y = 130;
app.stage.addChild(ellipse);


// drawRoundedRect(x, y, width, height, cornerRadius)
// The last argument, cornerRadius is a number in pixels that determines by how much the corners should be rounded.
let roundBox = new PIXI.Graphics();
roundBox.lineStyle(4, 0x99CCFF, 1);
roundBox.beginFill(0xFF9933);
roundBox.drawRoundedRect(0, 0, 84, 36, 10)
roundBox.endFill();
roundBox.x = 48;
roundBox.y = 190;
app.stage.addChild(roundBox);


// lineStyle method lets you define a line. You can use the moveTo and lineTo methods to draw the start and end points of the line, 
// in just the same way you can with the Canvas Drawing API. Here’s how to draw a 4 pixel wide, white diagonal line.
let line = new PIXI.Graphics();
line.lineStyle(4, 0xFFFFFF, 1);
line.moveTo(0, 0);
line.lineTo(80, 50);
line.x = 32;
line.y = 32;
app.stage.addChild(line);


// You can join lines together and fill them with colors to make complex shapes using the drawPolygon method. 
// drawPolygon's argument is a path array of x/y points that define the positions of each point on the shape.

// Sample code:

// let path = [
//     point1X, point1Y,
//     point2X, point2Y,
//     point3X, point3Y
//   ];
  
//   graphicsObject.drawPolygon(path);

let triangle = new PIXI.Graphics();
triangle.beginFill(0x66FF33);
triangle.drawPolygon([
    -32, 64,             //First point
    32, 64,              //Second point
    0, 0                 //Third point
]);

//Fill shape's color
triangle.endFill();

//Position the triangle after you've drawn it.
//The triangle's x/y position is anchored to its first point in the path
triangle.x = 180;
triangle.y = 22;
app.stage.addChild(triangle);