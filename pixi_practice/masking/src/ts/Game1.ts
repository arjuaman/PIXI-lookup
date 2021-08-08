import {
  Application, Container, Graphics
} from 'pixi.js';

// import { gsap } from 'gsap';
import { preLoader } from './PreLoader';
import assets from './assets';

export class Game {
  private stage: Container;
  private readonly app: Application;
  // private readonly game: Container;
  private isInitialized = false;

  constructor(app: Application) {
    this.app = app;
    this.stage = app.stage;

    preLoader(assets, () => {

      this.isInitialized = true;
      const graphics = new Graphics();
      this.stage.addChild(graphics);

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
      graphics.drawPolygon(10,600,800,600,600,200, 400, 400);
      graphics.endFill();      

      graphics.bezierCurveTo(180,150,40,40,100,200);
    });

    console.warn(this.app);
  }



  public update(delta: number): void {
    if (this.isInitialized) {
      delta;
    }
  }
}
