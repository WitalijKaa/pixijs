<template>
<div class="the-app" id="the-app" ref="app">
</div>
</template>

<script>
import KeybordMixin from './mixins/keybord.vue';

import Knight from './mixins/Knight.es6';

import * as PIXI from 'pixi.js';

window.pixiApp = {
    sprites : {
        one: { sprite: null },
        knight: null
    }
};

import uOne from '../recources/sprites/knight/one.png';
import uRedKnight from '../recources/sprites/knight/red.png';

export default {
    name: 'the-app',
    mixins: [ KeybordMixin ],
    data () { return {
    }},
    created () {
        this.timeCoefficient = 1;
        this.gameLogicRun = this.gameEmptyLogic;
        this.one = window.pixiApp.sprites.one;
        this.knight = window.pixiApp.sprites.knight;

        this.$on('unitMoveHorizontally', this.unitMoveHorizontally);
        this.$on('unitMoveVertically', this.unitMoveVertically);
    },
    mounted () {
        this.thePixiJS();
        this.initPixiLoadTextures([uOne, uRedKnight]);
    },
    methods: {
        gamePlayLogic() {
            this.knightMove();
        },
        gameLogic(timeCoefficient) {
            this.timeCoefficient = timeCoefficient;
            this.gameLogicRun();
        },
        gameEmptyLogic() { },
        initSpritesCreate() {
            let kAlfa = this.pCreateSpriteByImageUrlAndRectangleCut(uRedKnight, [50, 0, 50, 50]);
            kAlfa.position.set(0, 0);
            let kBeta = this.pCreateSpriteByImageUrlAndRectangleCut(uRedKnight, [200, 0, 50, 50]);
            kBeta.position.set(100, 0);
            this.one.sprite = this.pCreateContainer([kAlfa, kBeta]);
            this.one.sprite.position.set(110, 110);
            this.one.sprite.pivot.x = 50;
            this.pStage.addChild(this.one.sprite);

            this.knight = new Knight(this.pTextures, { type: 'anim', url: uRedKnight, config: { w: 50, h: 50, c: 7, x: 0, y: 0 }});
            this.pStage.addChild(this.knight.sprite);
            this.knight.sprite.position.set(110, 210);

            setInterval(this.rotateOne, 25);
            this.pixiApp.ticker.add((timeCoefficient) => { this.gameLogic(timeCoefficient); } );
            this.gameLogicRun = this.gamePlayLogic;
        },
        rotateOne() {
            if (!this.one.sprite) { return ; }
            this.one.sprite.rotation += 0.05;
            if (this.one.sprite.rotation > (2 * Math.PI)) { this.one.sprite.rotation -= (2 * Math.PI);}
        },
        knightMove() { this.knight.moveLogic(); },
        unitMoveHorizontally(horz) { this.knight.moveHorizontally(horz); },
        unitMoveVertically(vert) { this.knight.moveVertically(vert); },
        pCreateSpriteByImageUrl(spriteUrl) {
            let sprite = new PIXI.Sprite(PIXI.loader.resources[spriteUrl].texture);
            sprite.anchor.x = 0.5;
            sprite.anchor.y = 0.5;
            return sprite;
        },
        pCreateSpriteByImageUrlAndRectangleCut(spriteUrl, rectangleArr) {
            let texture = this.pTextures[spriteUrl].clone();
            texture.frame = this.pCreateRectangleByArray(rectangleArr);
            let sprite = new PIXI.Sprite(texture);
            sprite.anchor.x = 0.5;
            sprite.anchor.y = 0.5;
            return sprite;
        },
        pCreateAnimByImageUrl(spriteUrl, configObj) {
            let textures = [];
            for (let c = 0; c < configObj.c; c++) {
                let texture = this.pTextures[spriteUrl].clone();
                texture.frame = this.pCreateRectangleByArray([configObj.x + c * configObj.w, configObj.y, configObj.w, configObj.h]);
                textures.push(texture);
            }
            let sprite = new PIXI.extras.AnimatedSprite(textures);
            sprite.anchor.set(0.5);
            sprite.animationSpeed = 1 / 6;
            return sprite;
        },
        pCreateContainer(spritesArr) {
            let c = new PIXI.Container();
            for (let sprite of spritesArr) { c.addChild(sprite); }
            return c;
        },
        pCreateRectangleByArray(rectangleArr) {
            return new PIXI.Rectangle(rectangleArr[0], rectangleArr[1], rectangleArr[2], rectangleArr[3]);
        },
        thePixiJS() {
            let size = this.findPixiSize();
            this.pixiApp = new PIXI.Application({width: size, height: size, transparent: false});
            this.$refs['app'].appendChild(this.pixiApp.view);

            this.pixiApp.renderer.view.style.position = "absolute";
            this.pixiApp.renderer.view.style.display = "block";
            this.pixiApp.renderer.autoResize = true;

            window.addEventListener('resize', this.resizePixiHandler);
            this.resizePixiHandler();

            this.pStage = this.pixiApp.stage;
            this.pTextures = PIXI.utils.TextureCache;
        },
        initPixiLoadTextures(spritesArr) { PIXI.loader.add(spritesArr).load(this.initSpritesCreate); },
        resizePixiHandler() {
            let size = this.findPixiSize();
            this.pixiApp.renderer.resize(size, size);
            this.pixiApp.renderer.view.style.top = (window.innerHeight - size) / 2 + 'px';
            this.pixiApp.renderer.view.style.left = (window.innerWidth - size) / 2 + 'px';
        },
        findPixiSize() {
            let w = window.innerWidth;
            let h = window.innerHeight;
            let size = w > h ? h : w;
            return Math.floor(size * 0.8);
        }
    }
}
</script>

<style lang="stylus">

.the-app
    position relative

</style>
