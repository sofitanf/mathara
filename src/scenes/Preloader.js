import { Scene } from "phaser";
import { renderPreloaderOverlay } from "../ui/PreloaderUI.js";

export class Preloader extends Scene {
    constructor() {
        super("Preloader");
    }

    preload() {
        // renderPreloaderOverlay();
    }

    create() {
        //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
        //  For example, you can define global animations here, so we can use them in other scenes.
        //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.
        // this.scene.start('MainMenu');
        this.time.delayedCall(2000, () => {
            this.scene.start("MainMenu");
        });
    }
}
