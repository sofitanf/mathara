import * as Phaser from "phaser";

import { Boot } from "./scenes/Boot.js";
import { Game } from "./scenes/Game.js";
import { MainMenu } from "./scenes/MainMenu.js";
import { About } from "./scenes/About.js";
import { Login } from "./scenes/Login.js";
import { Map } from "./scenes/Map.js";
import { Preloader } from "./scenes/Preloader.js";
import AudioManager from "./core/AudioManager.js";

const config = {
    type: Phaser.AUTO,

    width: window.innerWidth,
    height: window.innerHeight,

    parent: "game-container",
    transparent: true,

    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.NO_CENTER,
    },

    scene: [Boot, Preloader, MainMenu, About, Login, Map, Game],

    physics: {
        default: "arcade",
        arcade: {
            debug: false,
        },
    },

    render: {
        pixelArt: false,
        antialias: true,
        roundPixels: true,
    },
};

const game = new Phaser.Game(config);

AudioManager.installLifecycle(game);

export default game;
