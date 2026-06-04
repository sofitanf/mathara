import { Scene } from "phaser";
import { renderHomeOverlay } from "../ui/HomeUI.js";

export class MainMenu extends Scene {
    constructor() {
        super("MainMenu");
    }

    // preload() {
    //     this.load.spritesheet("ship", "assets/spritesheet.png", {
    //         frameWidth: 514,
    //         frameHeight: 514,
    //     });
    // }

    create() {
        // console.log("Frames:", this.textures.get("ship").getFrameNames());

        // this.anims.create({
        //     key: "fly",
        //     frames: this.anims.generateFrameNumbers("ship", {
        //         start: 0,
        //         end: 2,
        //     }),
        //     frameRate: 5,
        //     repeat: -1,
        // });

        // const ship = this.add.sprite(
        //     this.scale.width / 2,
        //     this.scale.height / 2,
        //     "ship",
        //     0,
        // );

        // ship.setDisplaySize(183, 183);

        // ship.play("fly");

        renderHomeOverlay(this);
    }
}
