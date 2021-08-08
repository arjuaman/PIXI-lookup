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

      // bg.mask = custom_mask;

      this.stage.addChild(custom_mask);

      custom_mask.interactive = true;

      let isMoving = false;
      custom_mask.on('pointerup', () => {
        if (bg.mask) {
          bg.mask = null;
          isMoving = false;
        }
        else {
          bg.mask = custom_mask;
          isMoving = true;
        }
      });

      this.stage.interactive = true;
      this.app.stage.on('pointermove',(e)=>{
        console.log('mouse move', isMoving, e);
        if(isMoving){
          custom_mask.x = e.data.global.x;
          custom_mask.y = e.data.global.y;
        }
      });

    });

    console.warn(this.app);
  }



  public update(delta: number): void {
    if (this.isInitialized) {
      delta;
    }
  }
}
