import {
    Application, Container//, Loader, Texture,
} from 'pixi.js';
import { Snake } from './Snake1';

export class Game {
    private readonly stage: Container;

    private readonly centerX: number;

    private readonly centerY: number;

    public speed: number;

    private snake: Snake;

    private timeLapsed: number;

    private fps: number;

    constructor(app: Application) {
        this.stage = app.stage;
        this.centerX = app.view.width / 2;
        this.centerY = app.view.height / 2;
        this.speed = 10;
        this.timeLapsed = 0;
        this.fps = 1000 / this.speed;
        this.snake = new Snake();
        this.stage.addChild(this.snake);
        this.snake.init(this.centerX, this.centerY);
    }

    public update(delta: number): void {

        this.timeLapsed += delta * 1000;

        if (this.timeLapsed >= this.fps) {

            this.snake.draw();

            this.timeLapsed = 0;
        }
    }
}
