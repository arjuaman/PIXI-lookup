import * as PIXI from 'pixi.js';
export class LoadingScreen{

    /**
     * yep, you guessed it, loads in all the assets
     * @param app pixi application - incase you want to add actual loading elements to the stage
     * @param callback the function to call when the loading is complete
     */
    constructor(public app: PIXI.Application, private callback:Function){
        PIXI.Loader.shared
            .add("player1", "../assets/img/head.png")
            .add("apple", "../assets/img/apple.png")
            .add("body","../assets/img/body.png")
            .add("playerArrow", "../assets/img/arrows.png")
            .add("field", "../assets/img/field.png")
            .on("progress",this.handleLoadProgress.bind(this))
            .once("load", this.handleLoadComplete.bind(this))
            .once("error", this.handleLoadError.bind(this));

        PIXI.Loader.shared.load()
    }

    private handleLoadProgress() {
        console.log(PIXI.Loader.shared.progress + "% loaded");
    }

    private handleLoadError() {
        console.error("load error");
    }

    private handleLoadComplete() {
        // PIXI.Loader.shared.removeAllListeners();

        setTimeout(() => {
            this.callback();
        }, 1000);
    }
}