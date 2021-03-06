import {
    Application, Container//, Loader, Texture,
} from 'pixi.js';
import { Snake, Directions } from './Snake3';

export class Game {
    private readonly stage: Container;

    private readonly centerX: number;

    private readonly centerY: number;

    public speed: number;

    private snake: Snake;

    private timeLapsed: number;

    private fps: number;

    private readonly keyMap: { [key: string]: Directions } = {
        ArrowLeft: Directions.LEFT,
        ArrowRight: Directions.RIGHT,
        ArrowUp: Directions.UP,
        ArrowDown: Directions.DOWN,
    }

    private readonly inverseDir = {
        [Directions.UP]: Directions.DOWN,
        [Directions.DOWN]: Directions.UP,
        [Directions.LEFT]: Directions.RIGHT,
        [Directions.RIGHT]: Directions.LEFT,
    }

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

        window.addEventListener('keydown', this.onKeyDown.bind(this), false);
    }

    private onKeyDown(e: KeyboardEvent): void {
        const newDir = this.keyMap[e.code] as string;
        if (newDir && newDir != this.inverseDir[this.snake.dir as Directions]) {
            this.snake.dir = newDir as Directions;
        }
    }

    public update(delta: number): void {

        this.timeLapsed += delta * 1000;

        if (this.timeLapsed >= this.fps) {
            this.snake.move();
            this.snake.draw();
            this.timeLapsed = 0;
        }
    }
}
