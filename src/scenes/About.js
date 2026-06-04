import { Scene } from "phaser";
import { renderAboutOverlay } from "../ui/AboutUI.js";

export class About extends Scene {
    constructor() {
        super("About");
    }

    create() {
        renderAboutOverlay(this);
    }
}
