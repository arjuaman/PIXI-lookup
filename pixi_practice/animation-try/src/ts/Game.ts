import {
    Application, Container, Sprite
    , Texture, Resource, AnimatedSprite, DisplayObject
} from 'pixi.js';
// import { getTexture } from './Textures';
import { preLoader } from './PreLoader';
// import * as PIXI from 'pixi.js';
import assets from './assets';
import { getSSAnimTextures, getTextures } from './Textures';

export class Game {
    private stage: Container;
    public app: Application;
    private readonly background: Container;
    public gokuSS: AnimatedSprite | undefined;
    private isInitialized: boolean = false;
    public dino: AnimatedSprite | undefined;
    private keyMap: { [key: string]: boolean } = {};
    private speed = 5;

    constructor(app: Application) {
        this.app = app;
        this.stage = app.stage;

        this.background = new Container();
        this.stage.addChild(this.background);
        preLoader(assets, () => {
            this.createImage(getSSAnimTextures('goku-ss', 'still')[0]);
            this.gokuSS = this.createAnimated('goku-ss', 'punch');

            this.dino = this.createAnimatedSprite('dino', 'idle');
            // this.dino.scale.set(0.25);
            this.dino.x = 200;
            this.dino.y = app.view.height * 0.75;
            this.isInitialized = true;
            window.onkeydown = (e: KeyboardEvent) => {
                this.keyMap[e.code] = true;
                if (this.keyMap.ArrowRight || this.keyMap.ArrowLeft) {
                    this.dino.textures = getTextures('dino', 'walk');
                    if (this.dino.playing === false) {
                        this.dino.loop = true;
                        this.dino.play();
                    }
                    // console.log(dino.playing);
                }
            }
            window.onkeyup = (e: KeyboardEvent) => {
                this.keyMap[e.code] = false;
                if (!this.keyMap.ArrowRight && !this.keyMap.ArrowLeft) {
                    this.dino.textures = getTextures('dino', 'idle');
                    this.dino.play();
                }
            }
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
        anim.position.set(100, 100);
        anim.animationSpeed = 0.05;
        anim.play();
        return this.stage.addChild(anim);
    }

    private createAnimatedSprite(assetId: string, animId: string): AnimatedSprite {
        const anim = new AnimatedSprite(getTextures(assetId, animId));
        anim.animationSpeed = 0.33;
        anim.scale.set(0.25);
        anim.anchor.set(0.5);
        anim.play();
        console.log(assetId, anim);
        return this.stage.addChild(anim);
    }

    public update(delta: number): void {
        if (this.isInitialized) {
            // console.warn(delta);
            (this.gokuSS as DisplayObject).x += delta;
        }

        //This one provides control on button and action, but walk wala animation nhi h isme: 

        if (this.keyMap.ArrowRight) {
            this.dino.x += this.speed;
        }
        if (this.keyMap.ArrowLeft) {
            this.dino.x -= this.speed;
        }

    }
}