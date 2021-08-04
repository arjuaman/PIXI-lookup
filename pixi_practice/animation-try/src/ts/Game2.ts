import { Text, Application, Container, TextStyle, Loader, Sprite } from 'pixi.js';

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

        const loader = Loader.shared
        loader.baseUrl = 'assets/img';
        loader.add('head.png');
        loader.onProgress.add((e:any)=>{
            console.log("Progress is: "+e.progress);
        })
        loader.onComplete.add(this.createImage.bind(this));
        loader.load();
    }
    private createText(text: string, style: TextStyle, x: number, y: number): Text {
        // throw new Error('Method not implemented.');
        const txt = new Text(text, style);
        txt.position.set(x, y);
        this.stage.addChild(txt);
        return txt;
    }

    private createImage(loader:Loader, resource:{[key:string]:any}):Sprite {
        console.log(loader);
        const img = Sprite.from(resource['head.png'].texture);
        img.anchor.set(0.5, 0.5);
        img.position.set(100,100);
        this.stage.addChild(img);
        return img;
    }

    public update(): void {
        this.message.x += 5;
        if (this.message.x > this.app.view.width) {
            this.message.x = -this.message.width;
        }
    }
}