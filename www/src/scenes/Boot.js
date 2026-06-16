import { Scene } from "phaser";
import { renderPreloaderOverlay } from "../ui/PreloaderUI.js";

export class Boot extends Scene {
    constructor() {
        super("Boot");
    }

    preload() {
        renderPreloaderOverlay();
        //  The Boot Scene is typically used to load in any assets you require for your Preloader, such as a game logo or background.
        //  The smaller the file size of the assets, the better, as the Boot Scene itself has no preloader.
        this.load.image("bg", "assets/bg.png");
        this.load.image("uin", "assets/splash/uin.png");
        this.load.image("logo", "assets/mathara.png");
        this.load.image("loading", "assets/splash/loading.png");
    }

    create() {
        this.scene.start("Preloader");
    }
}
