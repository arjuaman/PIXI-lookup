import {
    Container, Graphics, Point
} from 'pixi.js';

// eslint-disable-next-line no-shadow
export enum Directions {
    LEFT = 'left',
    RIGHT = 'right',
    UP = 'up',
    DOWN = 'down'
}

export class Snake extends Container {
    private readonly START_LENGTH = 15;
    private readonly SIZE = 10;
    private color: number | undefined;
    public dir: Directions | undefined;
    private parts: Graphics[] | undefined;       // to draw the snake
    private partPos: Point[] | undefined;        // to update positions of snake
    private startX: number | undefined;
    private startY: number | undefined;

    private readonly dirFunc = {
        up: (p: Point) => new Point(p.x, p.y - this.SIZE),     //subtarcting head ke size ka portion on each movement
        down: (p: Point) => new Point(p.x, p.y + this.SIZE),
        left: (p: Point) => new Point(p.x - this.SIZE, p.y),
        right: (p: Point) => new Point(p.x + this.SIZE, p.y),
    }

    public init(initX: number, initY: number): void {              // initial posn at initX and initY
        this.parts = [];
        this.partPos = [];
        this.color = 0x00ff00;
        this.dir = Directions.LEFT;  // would start moving towards left just after construction
        this.startX = initX;
        this.startY = initY;

        // in for loops, we're creating positions of body parts, i.e. which body part will be at which position, and add it to array
        for (let i = this.startX + (this.START_LENGTH * this.SIZE); i >= this.startX; i -= this.SIZE) {
            const pos = new Point(i, this.startY);
            this.partPos.push(pos);
            this.parts.push(this.drawPart(pos));
        }
    }

    public drawPart(pos: Point): Graphics {
        const g = new Graphics();
        g.beginFill(this.color);
        g.lineStyle(1);
        g.drawRect(0, 0, this.SIZE, this.SIZE);
        g.endFill();
        this.addChild(g);
        g.x = pos.x;
        g.y = pos.y;
        return g;
    }

    public draw() {
        this.partPos?.forEach((pos: Point, index: number) => {
            if (this.parts && this.parts[index]) {
                // if index pe body part hai, to eak aur draw karo, else update krdo position
                this.parts[index].x = pos.x;
                this.parts[index].y = pos.y;
            }
            else {
                this.drawPart(pos);
            }
        });
    }

    public move(): void {
        if (this.partPos?.length) {
            const lastValue = this.partPos[this.partPos?.length - 1];
            const newPos = this.dirFunc[this.dir as Directions](lastValue);
            this.checkGrowth();
            this.partPos.push(newPos);
        }
    }

    private checkGrowth():void{
        this.partPos?.shift();
    }
}
