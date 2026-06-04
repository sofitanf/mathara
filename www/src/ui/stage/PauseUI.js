import { createStageLayout } from "./Layout.js";

export function showPauseUI({ onResume, onRestart, onExit }) {
    const uiRoot = document.getElementById("ui-root");

    uiRoot.innerHTML = createStageLayout(
        `
        <div class="pause-ui">

            <div class="pause-popup">

                <img
                    src="/assets/stages/pause.png"
                    class="pause-bg"
                />

                <div class="pause-content">
                    <div class="pause-actions">

                        <button class="pause-btn btn-exit">
                            <img
                                src="/assets/stages/UI/btn-map.png"
                                class="pause-btn-img"
                            />
                        </button>
                        <button class="pause-btn btn-resume">
                            <img
                                src="/assets/stages/UI/btn-play.png"
                                class="pause-btn-img play"
                            />
                        </button>
                        <button class="pause-btn btn-restart">
                            <img
                                src="/assets/stages/UI/btn-replay.png"
                                class="pause-btn-img"
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

    document.querySelector(".btn-resume").onclick = () => {
        clearPauseUI();
        if (onResume) {
            onResume();
        }
    };

    document.querySelector(".btn-restart").onclick = () => {
        clearPauseUI();
        if (onRestart) {
            onRestart();
        }
    };

    document.querySelector(".btn-exit").onclick = () => {
        clearPauseUI();
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

export function clearPauseUI() {
    document.getElementById("ui-root").innerHTML = "";
}
