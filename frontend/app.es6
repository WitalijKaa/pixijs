import * as PIXI from 'pixi.js';

function theApp() {
    let appEl = document.createElement('div');
    appEl.setAttribute('id', 'the-app');
    document.body.appendChild(appEl);
}

function thePixiJS() {
    let appEl = document.getElementById('the-app');
    let pixiApp = new PIXI.Application({width: 256, height: 256});
    appEl.appendChild(pixiApp.view);
}

theApp();
thePixiJS();
