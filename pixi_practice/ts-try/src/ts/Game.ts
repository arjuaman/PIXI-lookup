import {
    Text, Application, Container, TextStyle, Sprite
    , Texture, Resource, TilingSprite
} from 'pixi.js';
import { getTexture } from './Textures';
import { preLoader } from './PreLoader';
import * as PIXI from 'pixi.js';
import assets from './assets';

export class Game {
    public message: Text;
    private stage: Container;
    public app: Application;
    private readonly background: Container;
    private field: TilingSprite | undefined;
    private mountain1: TilingSprite | undefined;
    private mountain2: TilingSprite | undefined;
    private speed = 10;

    constructor(app: Application) {
        this.app = app;
        this.stage = app.stage;
        this.message = this.createText("hello world!!", new TextStyle({
            fontSize: '28px',
            fontFamily: 'Comic Sans',
            fill: 'blue',
            align: 'center'
        }), 50, 100);

        this.background = new Container();
        this.stage.addChild(this.background);
        preLoader(assets, () => {
            this.field = this.createTilingSprites(getTexture('field') as Texture<Resource>);
            const blur = new PIXI.filters.BlurFilter(12, 8);
            this.field.filters = [blur];
            this.mountain1 = this.createTilingSprites(getTexture('mountain1') as Texture<Resource>);
            this.mountain2 = this.createTilingSprites(getTexture('mountain2') as Texture<Resource>);
            this.createImage(getTexture('head') as Texture<Resource>);
        })
    }

    private createText(text: string, style: TextStyle, x: number, y: number): Text {
        // throw new Error('Method not implemented.');
        const txt = new Text(text, style);
        txt.position.set(x, y);
        this.stage.addChild(txt);
        return txt;
    }

    private createTilingSprites(texture: Texture<Resource>): TilingSprite {
        const img = new TilingSprite(texture, 1600, 1080);
        // img.anchor.set(0.5);
        // img.position.set(this.app.view.width / 2);
        img.scale.set(0.5);
        return this.background.addChild(img);
    }

    private createImage(texture: Texture): Sprite {
        const img = Sprite.from(texture);
        img.anchor.set(0.5);
        img.scale.set(1);
        img.position.set(this.app.view.width / 2, this.app.view.height - 50);
        return this.stage.addChild(img);
    }

    public update(): void {
        this.message.x += 5;
        if (this.message.x > this.app.view.width) {
            this.message.x = -this.message.width;
        }
        if (this.field) {
            (this.field as TilingSprite).tilePosition.x += this.speed / 10;
            (this.mountain1 as TilingSprite).tilePosition.x += this.speed / 5;
            (this.mountain2 as TilingSprite).tilePosition.x += this.speed;
          }
    }
}