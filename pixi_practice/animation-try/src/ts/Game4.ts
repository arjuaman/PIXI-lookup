import {
    Application, Container, Sprite
    , Texture, Resource, AnimatedSprite
} from 'pixi.js';
// import { getTexture } from './Textures';
import { preLoader } from './PreLoader';
// import * as PIXI from 'pixi.js';
import assets from './assets';
import { getSSAnimTextures } from './Textures';

export class Game {
    private stage: Container;
    public app: Application;
    private readonly background: Container;

    constructor(app: Application) {
        this.app = app;
        this.stage = app.stage;

        this.background = new Container();
        this.stage.addChild(this.background);
        preLoader(assets, () => {
            this.createImage(getSSAnimTextures('goku-ss', 'still')[0]);
            this.createAnimated('goku-ss','idle');
        })
    }

    // private createTilingSprites(texture: Texture<Resource>): TilingSprite {
    //     const img = new TilingSprite(texture, 1600, 1080);
    //     // img.anchor.set(0.5);
    //     // img.position.set(this.app.view.width / 2);
    //     img.scale.set(0.5);
    //     return this.background.addChild(img);
    // }

    private createImage(texture: Texture<Resource>): Sprite {
        const img = Sprite.from(texture);
        img.anchor.set(0.5);
        // img.scale.set(0.15);
        img.position.set(this.app.view.width / 2, this.app.view.height / 2);
        return this.stage.addChild(img);
    }

    private createAnimated(assetId: string, animId: string): AnimatedSprite {
        const anim = new AnimatedSprite(getSSAnimTextures(assetId, animId));
        anim.position.set(100,100);
        anim.animationSpeed = 0.05;
        anim.play();
        return this.stage.addChild(anim);
    }

    public update(delta:number): void {
        this.background.x = delta;
    }
}