import {
    Application, Container
} from 'pixi.js';

import { preLoader } from './PreLoader';
import assets from './assets';
import { Card, cardFrames, CARD_WIDTH, CARD_HEIGHT } from './Card';
import { shuffleArray } from './utils';
// import gsap from 'gsap/src/all';
import { gsap } from 'gsap';

export class Game {
    private stage: Container;
    public app: Application;
    private readonly game: Container;
    public firstSelection: Card | undefined;
    public secondSelection: Card | undefined;
    private isInitialized: boolean = false;

    constructor(app: Application) {
        this.app = app;
        this.stage = app.stage;

        this.game = new Container();
        this.stage.addChild(this.game);
        preLoader(assets, () => {
            this.isInitialized = true;
            this.createCards();
            this.placeCards();
        })
    }

    private next(): void {
        this.firstSelection = undefined;
        this.secondSelection = undefined;
        this.cardEnabled(true);
    }

    private checkResult(): void {
        if (this.firstSelection && this.secondSelection) {
            if (this.firstSelection.name === this.secondSelection.name) {
                //if both are correctly matched, we'll remove them from game.
                // this.game.removeChild(this.firstSelection);
                // this.game.removeChild(this.secondSelection);
                // this.next(); //ab unn dono ko undefined kr denge
                gsap.to([this.firstSelection, this.secondSelection],
                    {
                        width: 160, height: 160, alpha: 0, duration: 0.75, onComplete: () => {
                            //fades on matched
                            this.game.removeChild(this.firstSelection as Card);
                            this.game.removeChild(this.secondSelection as Card);
                            this.next();
                        }
                    });
            }
            else {
                //if not matching cards, then wapas se face down kar dena hai
                // this.firstSelection.back.visible = true;
                // this.secondSelection.back.visible = true;
                gsap.fromTo([this.firstSelection, this.secondSelection],
                    { rotation: 0.5 },   
                    {
                        rotation: 0,
                        ease: 'elastic',  // a little shake for mismatch
                        duration: 0.5,
                        onComplete: () => {
                            (this.firstSelection as Card).back.visible = true;
                            (this.secondSelection as Card).back.visible = true;
                            this.next();
                        }
                    });
            }
        }
    }

    private createCards(): void {
        shuffleArray(cardFrames).forEach((cardFrame) => {
            const card = new Card('back', { id: 'front', frame: cardFrame });
            card.on('pointerup', () => {
                card.interactive = false;
                gsap.to(card.back, {
                    alpha: 0, duration: 0.5, onComplete: () => {
                        card.back.visible = false;
                        card.back.alpha = 1;
                    }
                });
                if (this.firstSelection) {
                    this.secondSelection = card;
                    this.cardEnabled(false);
                    setTimeout(this.checkResult.bind(this), 1000);
                } else {
                    this.firstSelection = card;
                }
            })
            this.game.addChild(card);
        });
    }

    private cardEnabled(value: boolean) {
        this.game.children.forEach((child) => child.interactive = value);
    }


    private placeCards(): void {
        let count = 0;
        const PADDING = 20;
        const OFFSET = 100;
        for (let r = 0; r < 6; r++) {
            for (let c = 0; c < 8; c++) {
                let card = this.game.getChildAt(count);
                card.x = c * (CARD_WIDTH + PADDING) + OFFSET;
                card.y = r * (CARD_HEIGHT + PADDING) + OFFSET;
                count++;
            }
        }
    }

    public update(): void {
        if (this.isInitialized) {
            // console.warn(delta);
        }

    }
}