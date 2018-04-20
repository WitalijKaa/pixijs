<template>
<div class="the-app" id="the-app" ref="app">

</div>
</template>

<script>
import * as PIXI from 'pixi.js';

export default {
    name: 'the-app',
    data () { return {
        pixiApp: {}
    }},
    mounted () {
        this.thePixiJS();
    },
    methods: {
        thePixiJS() {
            let size = this.findPixiSize();
            this.pixiApp = new PIXI.Application({width: size, height: size, transparent: false});
            this.$refs['app'].appendChild(this.pixiApp.view);

            this.pixiApp.renderer.autoResize = true;

            window.addEventListener('resize', this.resizePixiHandler);
        },
        resizePixiHandler() {
            let size = this.findPixiSize();
            this.pixiApp.renderer.resize(size, size);
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
