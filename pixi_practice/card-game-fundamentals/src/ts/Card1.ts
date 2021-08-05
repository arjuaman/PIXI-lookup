import { BaseTexture, Container, Rectangle, Sprite, Texture } from 'pixi.js';
import { getResource, getTexture } from './Textures';


export type CardFrame = {
    name: string;
    frame: number[]
};

export type CardFront = { id: string, frame: CardFrame };
export const cardFrames: CardFrame[] = [];
export const W = 150;
export const H = 150;
for (let c = 0; c < 4; c++) {
    for (let r = 0; r < 6; r++) {
        for (let i = 0; i < 2; i++) {
            cardFrames.push({
                name: `card-${c}-${r}`,
                frame: [W * c, H * r, W, H],
            });
        }
    }
}

export class Card extends Container {
    public back: Sprite;

    public front: Sprite;
    constructor(back: string, front: CardFront) {
        super();
        const frontTexture = this.getFrontTexture(front);
        this.front = this.createSprite(frontTexture);
        this.back = this.createSprite(getTexture(back) as Texture);
        this.name = front.frame.name;
    }

    private createSprite(texture: Texture): Sprite {
        const sprite = new Sprite(texture);
        sprite.anchor.set(0.5);
        sprite.width = W;
        sprite.height = H;
        this.addChild(sprite);
        return sprite;
    }

    private getFrontTexture(data: CardFront): Texture {
        const baseTexture = new BaseTexture(getResource(data.id).url);
        const frameRect = new Rectangle(...data.frame.frame); 
        // ...data.frame.frame = data.frame[0],data.fram[1] .... and so on
        return new Texture(baseTexture, frameRect);
    }
}

