import {
    Application, Container
} from 'pixi.js';

import { preLoader } from './PreLoader';
import assets from './assets';
import { Card, cardFrames } from './Card';

export class Game {
    private stage: Container;
    public app: Application;
    private readonly background: Container;
    private isInitialized: boolean = false;

    constructor(app: Application) {
        this.app = app;
        this.stage = app.stage;

        this.background = new Container();
        this.stage.addChild(this.background);
        preLoader(assets, () => { 
            this.isInitialized = true;
            this.stage.addChild(new Card('back',{id: 'front',frame: cardFrames[0]}));
        })
    }

    public update(delta: number): void {
        if (this.isInitialized) {  
            console.warn(delta);
        }         

    }
}