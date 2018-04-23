<template>
<div class="the-app" id="the-app" ref="app">
</div>
</template>

<script>
import * as PIXI from 'pixi.js';

window.pixiApp = {
    pixiApp: null,
    pStage: null,
    sprites : {
        one: { sprite: null }
    }
};

import uOne from '../recources/sprites/knight/one.png';

export default {
    name: 'the-app',
    data () { return {
    }},
    created () {
        this.pixiApp = window.pixiApp.pixiApp;
        this.pStage = window.pixiApp.pStage;
        this.one = window.pixiApp.sprites.one;
    },
    mounted () {
        this.thePixiJS();
        this.initPixiLoadTextures([uOne]);
        this.initSpritesCreate();
        setInterval(this.rotateOne, 25);
    },
    methods: {
        initSpritesCreate() {
            this.one.sprite = this.pCreateSpriteByImageUrl(uOne);
            this.pStage.addChild(this.one.sprite);
            this.one.sprite.position.set(110, 110);
        },
        rotateOne() {
            this.one.sprite.rotation += 0.05;
            if (this.one.sprite.rotation > (2 * Math.PI)) { this.one.sprite.rotation -= (2 * Math.PI);}
        },
        pCreateSpriteByImageUrl(spriteUrl) {
            let sprite = new PIXI.Sprite(PIXI.loader.resources[spriteUrl].texture);
            sprite.anchor.x = 0.5;
            sprite.anchor.y = 0.5;
            return sprite;
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
