let canvas = document.getElementById('canvas');
let _w = window.innerWidth;
let _h = window.innerHeight;

//Aliases
let Application = PIXI.Application,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    Sprite = PIXI.Sprite;

let app = new Application({
    // view: canvas,
    height : _h,
    width : _w,
    antialias: true,
    transparent: false,
    resolution:1
})

document.body.appendChild(app.view)

forceCanvas = true;

app.renderer.backgroundColor = 0x427462;
app.renderer.autoResize = true;

// It's possible to assign a unique name to each resource you want to load. Just supply the name (a string) as the 
// first argument in the add method. For example, here's how to name the image of a woody as lf2.
loader
  //.add("woody.png")
  .add("lf2","woody.png")
  .load(setup);

  //This creates an object called catImage in loader.resources. 
  // That means you can create a sprite by referencing the lf2 object, like this:
function setup() {
  //let woody = new Sprite(resources["woody.png"].texture);
  let woody = new Sprite(resources.lf2.texture)
  app.stage.addChild(woody);
  //woody.visible = false;
}


