import { gameState } from "../../core/gameState.js";
import { getScene } from "../../core/sceneManager.js";
import { createStageLayout } from "./Layout.js";

export function showResultUI() {
    const scene = getScene();
    const uiRoot = document.getElementById("ui-root");
    const isPassed = gameState.score >= gameState.kkm;

    uiRoot.innerHTML = createStageLayout(
        `
        <div class="result-ui">
            <div class="result-popup">
                <img
                    src="
                        ${
                            isPassed
                                ? "/assets/stages/result_pass.png"
                                : "/assets/stages/result_fail.png"
                        }
                    "
                    class="result-bg"
                />


                <div class="result-score">

                    <span class="score-value ${isPassed ? "success" : ""}">
                        ${gameState.score}
                    </span>

                    <span class="score-total">
                        /100
                    </span>

                </div>

               

                <div class="result-actions">

                    ${
                        isPassed
                            ? `
                                <button
                                    class="
                                        result-btn
                                        btn-next-stage
                                    "
                                >
                                    Lanjut Belajar
                                </button>
                            `
                            : `
                                <button
                                    class="
                                        result-btn
                                        btn-back-map
                                    "
                                >
                                    Kembali ke Peta
                                </button>

                                <button
                                    class="
                                        result-btn
                                        btn-retry
                                    "
                                >
                                    Coba Lagi
                                </button>
                            `
                    }

                </div>

            </div>

        </div>
        `,
    );

    bindEvents(isPassed, scene);
}

function bindEvents(isPassed, scene) {
    /*
        ========================
        PASSED
        ========================
        */

    if (isPassed) {
        document.querySelector(".btn-next-stage").onclick = () => {
            clearResultUI();
            scene.scene.start("Map");
        };

        return;
    }

    /*
        ========================
        FAILED
        ========================
        */

    document.querySelector(".btn-retry").onclick = () => {
        clearResultUI();
        scene.scene.start("Game");
    };

    document.querySelector(".btn-back-map").onclick = () => {
        clearResultUI();
        scene.scene.start("Map");
    };
}

/*
========================
CLEAR
========================
*/

export function clearResultUI() {
    document.getElementById("ui-root").innerHTML = "";
}
