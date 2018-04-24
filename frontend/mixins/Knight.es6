import * as PIXI from 'pixi.js';

export default class Knight {

    constructor(textureCache, settings = null) {
        this.pTextures = textureCache; // todo нужен синглтон с pixi
        this.sprite = null;
        if (settings) { this.createSprite(settings); }

        this.sx = 0;
        this.sy = 0;
        this.isMooving = false;
    }

    createSprite(settings) {
        let spriteUrl = settings.url;
        let configObj = settings.config;
        if (settings.type === 'anim') {
            let textures = [];
            for (let c = 0; c < configObj.c; c++) {
                let texture = this.pTextures[spriteUrl].clone();
                texture.frame = Knight.pCreateRectangleByArray([configObj.x + c * configObj.w, configObj.y, configObj.w, configObj.h]);
                textures.push(texture);
            }
            let sprite = new PIXI.extras.AnimatedSprite(textures);
            sprite.anchor.set(0.5);
            sprite.animationSpeed = 1 / 6;
            this.sprite = sprite;
        }
    }

    static pCreateRectangleByArray (rectangleArr) { // todo нужен синглтон с pixi
        return new PIXI.Rectangle(rectangleArr[0], rectangleArr[1], rectangleArr[2], rectangleArr[3]);
    }

    moveLogic() {
        if (!this.sprite) { return; }

        this.sprite.position.x += this.sx;
        this.sprite.position.y += this.sy;
    }

    moveAnimation() {
        if (this.isMooving) {
            if (!this.sx && !this.sy) {
                this.isMooving = false;
                this.sprite.gotoAndStop(0);
            }
        }
        else {
            if (this.sx || this.sy) {
                this.isMooving = true;
                this.sprite.gotoAndPlay(0);
            }
        }
    }

    moveHorizontally(horz) { this.sx = horz * 2; this.moveAnimation(); }
    moveVertically(vert) { this.sy = vert * 2; this.moveAnimation(); }
}