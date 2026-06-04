import * as Phaser from "phaser";

import { Boot } from "./scenes/Boot.js";
import { Game } from "./scenes/Game.js";
import { MainMenu } from "./scenes/MainMenu.js";
import { About } from "./scenes/About.js";
import { Login } from "./scenes/Login.js";
import { Map } from "./scenes/Map.js";
import { Preloader } from "./scenes/Preloader.js";

const GAME_WIDTH = 917;
const GAME_HEIGHT = 412;

const config = {
    type: Phaser.AUTO,

    width: GAME_WIDTH,
    height: GAME_HEIGHT,

    parent: "game-container",
    transparent: true,

    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: GAME_WIDTH,
        height: GAME_HEIGHT,
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
    },
};

export default new Phaser.Game(config);
