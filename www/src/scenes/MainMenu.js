import { Scene } from "phaser";
import { renderHomeOverlay } from "../ui/HomeUI.js";

export class MainMenu extends Scene {
    constructor() {
        super("MainMenu");
    }

    preload() {
        this.load.spritesheet("ship", "assets/spritesheet.png", {
            frameWidth: 183,
            frameHeight: 183,
        });
    }

    create() {
        console.log("Frames:", this.textures.get("ship").getFrameNames());

        this.anims.create({
            key: "fly",
            frames: this.anims.generateFrameNumbers("ship", {
                start: 0,
                end: 3,
            }),
            frameRate: 8,
            repeat: -1,
        });

        const ship = this.add.sprite(
            this.scale.width / 2,
            this.scale.height / 2,
            "ship",
            0,
        );

        ship.play("fly");

        // renderHomeOverlay(this);
    }
}
