import { Scene } from "phaser";
import { renderHomeOverlay } from "../ui/HomeUI.js";
import AudioManager from "../core/AudioManager.js";

export class MainMenu extends Scene {
    constructor() {
        super("MainMenu");
    }

    create() {
        AudioManager.playMenu(this, "bgm", 1);

        renderHomeOverlay(this);
    }
}
