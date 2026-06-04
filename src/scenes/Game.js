import * as Phaser from "phaser";
import { showIntroUI } from "../ui/stage/IntroUI.js";
import { showPauseUI } from "../ui/stage/PauseUI.js";
import { showGameOverUI } from "../ui/stage/GameOverUI.js";
import { showResultUI } from "../ui/stage/ResultUI.js";
import { showQuizUI } from "../ui/stage/QuizUI.js";
import { showNumerationUI } from "../ui/stage/NumerationUI.js";
import { showEvaluationUI } from "../ui/stage/EvaluationUI.js";
import { gameState } from "../core/gameState.js";
import { showMaterialUI } from "../ui/stage/MaterialUI.js";
import { setScene } from "../core/sceneManager.js";

export class Game extends Phaser.Scene {
    constructor() {
        super("Game");
    }

    create() {
        setScene(this);
        gameState.resetState();

        showIntroUI(this);
    }

    onResume() {
        console.log("RESUME");
    }

    onRestart() {
        console.log("RESTART");
    }

    onExit() {
        console.log("EXIT");
    }
}
