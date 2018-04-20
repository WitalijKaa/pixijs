import * as PIXI from 'pixi.js';

function theApp() {
    let appEl = document.createElement('div');
    appEl.setAttribute('id', 'the-app');
    document.body.appendChild(appEl);
}

function findPixiSize() {
    let w = window.innerWidth;
    let h = window.innerHeight;
    let size = w > h ? h : w;
    return Math.floor(size * 0.8);
}

function thePixiJS() {
    let appEl = document.getElementById('the-app');
    let size = findPixiSize();
    let pixiApp = new PIXI.Application({width: size, height: size, transparent: false});
    appEl.appendChild(pixiApp.view);

    pixiApp.renderer.autoResize = true;

    window.addEventListener('resize', () => {
        let size = findPixiSize();
        pixiApp.renderer.resize(size, size);
    });
}

theApp();
thePixiJS();
