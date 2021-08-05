import {
    Application, Container
} from 'pixi.js';

import { preLoader } from './PreLoader';
import assets from './assets';
import { Card, cardFrames } from './Card';
import { shuffleArray } from './utils';

export class Game {
    private stage: Container;
    public app: Application;
    private readonly game: Container;
    private isInitialized: boolean = false;

    constructor(app: Application) {
        this.app = app;
        this.stage = app.stage;

        this.game = new Container();
        this.stage.addChild(this.game);
        preLoader(assets, () => { 
            this.isInitialized = true;
            this.createCards();    
        })
    }

    private createCards():void{
        shuffleArray(cardFrames).forEach((cardFrame)=>{
            const card = new Card('back', {id: 'front', frame: cardFrame});
            this.game.addChild(card);
        })
    }

    public update(): void {
        if (this.isInitialized) {  
            // console.warn(delta);
        }         

    }
}