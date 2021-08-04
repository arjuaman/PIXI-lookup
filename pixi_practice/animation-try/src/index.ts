import './css/main.scss';
import { Application, Ticker} from 'pixi.js';
import { Game } from './ts/Game';
onload = () => {
    const app = new Application({
        width: 256,
        height: 256,
        antialias: true,
        // transparent: false,
        backgroundAlpha:1, // used instead of transparent
        resolution: 1,
        forceCanvas: true
    });
    console.log(app);

    app.renderer.backgroundColor = 0xffffff;//0xdcb7b7;
    // app.renderer.autoResize = true;  NOT EXISTS
    app.renderer.resize(512, 512);
    app.renderer.view.style.position = "absolute";
    app.renderer.view.style.display = "block";
    app.renderer.resize(window.innerWidth, window.innerHeight);
    document.body.appendChild(app.view);

    const game = new Game(app);
    const ticker = Ticker.shared;
    ticker.add(game.update.bind(game));
}