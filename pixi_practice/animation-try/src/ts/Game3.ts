import { Text, Application, Container, TextStyle, Sprite
,Texture, Resource } from 'pixi.js';
import { getTexture } from './Textures';
import { preLoader } from './PreLoader';
import assets from './assets';

export class Game {
    public message: Text;
    private stage: Container;
    public app: Application;

    constructor(app: Application) {
        this.app = app;
        this.stage = app.stage;

        this.message = this.createText("hello world!!", new TextStyle({
            fontSize: '28px',
            fontFamily: 'Comic Sans',
            fill: 'blue',
            align: 'center'
        }), 50, 100);

        preLoader(assets, this.createImage.bind(this));
    }
    private createText(text: string, style: TextStyle, x: number, y: number): Text {
        // throw new Error('Method not implemented.');
        const txt = new Text(text, style);
        txt.position.set(x, y);
        this.stage.addChild(txt);
        return txt;
    }

    private createImage():void {
        const img = Sprite.from(getTexture('apple') as Texture<Resource>);
        img.anchor.set(0.5, 0.5);
        img.position.set(100,100);
        this.stage.addChild(img);
    }

    public update(): void {
        this.message.x += 5;
        if (this.message.x > this.app.view.width) {
            this.message.x = -this.message.width;
        }
    }
}