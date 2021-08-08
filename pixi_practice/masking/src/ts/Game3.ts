import {
  Application, Container, Graphics, Sprite, Texture
} from 'pixi.js';

// import { gsap } from 'gsap';
import { preLoader } from './PreLoader';
import assets from './assets';
import { getTexture } from './Textures';

export class Game {
  private stage: Container;
  private readonly app: Application;
  // private readonly game: Container;
  private isInitialized = false;


  constructor(app: Application) {
    this.app = app;
    this.stage = app.stage;

    const centerX = app.view.width / 2;
    const centerY = app.view.height / 2;

    preLoader(assets, () => {

      this.isInitialized = true;

      const bg = new Sprite(getTexture('goku_ui') as Texture);
      bg.anchor.set(0.5);
      bg.x = centerX;
      bg.y = centerY;
      this.stage.addChild(bg);

      const graphics = new Graphics();
      // this.stage.addChild(graphics);

      graphics.lineStyle(3, 0x333333, 0.5);
      graphics.beginFill(0xff0000);
      graphics.drawRect(10, 10, 100, 100);
      graphics.endFill();

      graphics.lineStyle(3, 0x333333, 1);
      graphics.beginFill(0xff0000);
      graphics.drawRect(120, 10, 100, 100);
      graphics.endFill();

      graphics.lineStyle(3, 0x333333, 0.5);
      graphics.beginFill(0x4274ff);
      graphics.drawRoundedRect(230, 10, 100, 100, 10);
      graphics.endFill();

      graphics.lineStyle(3, 0x333333, 0.5);
      graphics.beginFill(0xff00dd);
      graphics.drawCircle(160, 180, 30);
      graphics.drawEllipse(60, 210, 40, 80);
      graphics.endFill();

      graphics.lineStyle(3, 0x333333, 0.5);
      graphics.beginFill(0xffaacc);
      // graphics.moveTo(10,400);
      // graphics.lineTo(400, 120);
      // graphics.lineTo(120, 600);
      // graphics.lineTo(600, 10);
      graphics.drawPolygon(10, 600, 800, 600, 600, 200, 400, 400);
      graphics.endFill();

      graphics.bezierCurveTo(180, 150, 40, 40, 100, 200);

      const custom_mask = new Graphics();
      // this.stage.addChild(custom_mask);

      custom_mask.x = this.app.view.width / 2;
      custom_mask.y = this.app.view.height / 2;

      custom_mask.lineStyle(1, 0x333333, 0.4);
      custom_mask.beginFill(0x0000ff, 0.75);
      custom_mask.drawCircle(0, 0, 400);             // iss circle ke andar ki cheezein hi dikhengi
      // custom_mask.beginHole();
      // custom_mask.drawRect(-50, -50, 100, 100);
      // custom_mask.endHole();
      custom_mask.endFill();
      
      bg.mask = custom_mask;

      this.stage.addChild(custom_mask);
      
      custom_mask.interactive = true;
      

    });

    console.warn(this.app);
  }



  public update(delta: number): void {
    if (this.isInitialized) {
      delta;
    }
  }
}
