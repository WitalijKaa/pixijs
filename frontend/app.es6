import Vue from 'vue';
import VueApp from './app.vue';

function theApp() {
    appendStylesToDOM('* {padding: 0; margin: 0;}');

    let appEl = document.createElement('div');
    appEl.setAttribute('id', 'the-app');
    document.body.appendChild(appEl);
}

function appendStylesToDOM(styleScript) {
    let style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = styleScript;
    document.head.appendChild(style);
}

theApp();

window.Vue = new Vue({
    el: '#the-app',
    render: createElement => createElement(VueApp)
});
