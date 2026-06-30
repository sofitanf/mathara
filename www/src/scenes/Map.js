import { Scene } from "phaser";
import { renderMapOverlay } from "../ui/MapUI.js";
import AudioManager from "../core/AudioManager.js";

export class Map extends Scene {
    constructor() {
        super("Map");
    }

    preload() {
        this.load.audio("pilih_pulau", "assets/sounds/sfx-pilih-pulau.wav");
    }

    create() {
        AudioManager.playMenu(this, "bgm", 0.9);

        renderMapOverlay(this);
    }
}
