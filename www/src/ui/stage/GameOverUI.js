import { createStageLayout } from "./Layout.js";

export function showGameOverUI({ onRestart, onExit }) {
    const uiRoot = document.getElementById("ui-root");

    uiRoot.innerHTML = createStageLayout(
        `
        <div class="game-over-ui">

            <div class="game-over-popup">

                <img
                    src="/assets/stages/game_over.png"
                    class="game-over-bg"
                />

                <div class="game-over-content">
                    <div class="game-over-actions">

                        <button class="game-over-btn btn-exit">
                            <img
                                src="/assets/stages/UI/btn-map.png"
                                class="game-over-btn-img"
                            />
                        </button>
                        <button class="game-over-btn btn-restart">
                            <img
                                src="/assets/stages/UI/btn-replay.png"
                                class="game-over-btn-img"
                            />
                        </button>
                    </div>
                </div>
            </div>
        </div>
        `,
    );

    /*
    ========================
    EVENTS
    ========================
    */
    document.querySelector(".btn-restart").onclick = () => {
        if (onRestart) {
            onRestart();
        }
    };

    document.querySelector(".btn-exit").onclick = () => {
        if (onExit) {
            onExit();
        }
    };
}

/*
========================
CLEAR
========================
*/

export function clearGameUI() {
    document.getElementById("ui-root").innerHTML = "";
}
