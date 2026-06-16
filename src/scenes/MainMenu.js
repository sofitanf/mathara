import { Scene } from "phaser";
import { renderHomeOverlay } from "../ui/HomeUI.js";

export class MainMenu extends Scene {
    constructor() {
        super("MainMenu");
    }

    create() {
        renderHomeOverlay(this);
    }
}
