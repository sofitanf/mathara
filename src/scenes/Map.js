import { Scene } from "phaser";
import { renderMapOverlay } from "../ui/MapUI.js";

export class Map extends Scene {
    constructor() {
        super("Map");
    }

    create() {
        renderMapOverlay(this);
    }
}
