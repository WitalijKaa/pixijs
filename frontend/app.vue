<template>
<div class="the-app" id="the-app" ref="app">
</div>
</template>

<script>
import KeybordMixin from './mixins/keybord.vue';

import * as PIXI from 'pixi.js';

window.pixiApp = {
    sprites : {
        one: { sprite: null },
        knight: { sprite: null, sx: 0, sy: 0 }
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
            this.one.sprite = this.pCreateSpriteByImageUrl(uOne);
            this.pStage.addChild(this.one.sprite);
            this.one.sprite.position.set(110, 110);

            this.knight.sprite = this.pCreateSpriteByImageUrlAndRectangleCut(uRedKnight, [50, 0, 50, 50]);
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
        knightMove() {
            if (!this.knight.sprite) { return; }
            this.knight.sprite.position.x += this.knight.sx;
            this.knight.sprite.position.y += this.knight.sy;
        },
        unitMoveHorizontally(horz) { this.knight.sx = horz * 2; },
        unitMoveVertically(vert) { this.knight.sy = vert * 2; },
        pCreateSpriteByImageUrl(spriteUrl) {
            let sprite = new PIXI.Sprite(PIXI.loader.resources[spriteUrl].texture);
            sprite.anchor.x = 0.5;
            sprite.anchor.y = 0.5;
            return sprite;
        },
        pCreateSpriteByImageUrlAndRectangleCut(spriteUrl, rectangleArr) {
            let texture = this.pTextures[spriteUrl];
            texture.frame = this.pCreateRectangleByArray(rectangleArr);
            let sprite = new PIXI.Sprite(texture);
            sprite.anchor.x = 0.5;
            sprite.anchor.y = 0.5;
            return sprite;
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
