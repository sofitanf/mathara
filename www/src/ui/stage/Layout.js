import AudioManager from "../../core/AudioManager.js";
import { gameState } from "../../core/gameState.js";
import { getScene } from "../../core/sceneManager.js";
import { CITIES } from "../../data/cities.js";
import { showPauseUI } from "./PauseUI.js";

let eventsBound = false;

export function createStageLayout(content) {
    bindStageEvents();

    const city = CITIES.find((c) => c.id === gameState.cityId);

    const hpHTML = Array.from({
        length: gameState.maxHP,
    })
        .map((_, index) => {
            const active = index < gameState.currentHP;

            return `
                <img
                    src="${
                        active
                            ? "/assets/stages/love_active.png"
                            : "/assets/stages/love_nonactive.png"
                    }"
                    class="stage-love"
                />
            `;
        })
        .join("");

    return `
        <div
            class="stage-ui"
            style="background-image:url('${city.background}')"
        >
            <div class="stage-topbar">

                <button class="stage-pause">
                    <img src="/assets/stages/UI/pause.png" />
                </button>

                <div class="stage-hp">
                    ${hpHTML}
                </div>

            </div>

            ${content}

        </div>
    `;
}

function bindStageEvents() {
    if (eventsBound) return;

    eventsBound = true;
    const scene = getScene();

    document.addEventListener("click", (event) => {
        /*
        ========================
        PAUSE
        ========================
        */

        const pauseBtn = event.target.closest(".stage-pause");

        if (pauseBtn) {
            gameState.setIsPaused(true);

            const existingPause = document.querySelector(".pause-ui");

            if (!existingPause) {
                AudioManager.stopMenu(scene, "bgm_battle");

                document
                    .querySelector(".stage-ui")
                    ?.insertAdjacentHTML("beforeend", showPauseUI());
            }

            return;
        }

        /*
        ========================
        RESUME
        ========================
        */

        const resumeBtn = event.target.closest(".btn-resume");

        if (resumeBtn) {
            gameState.setIsPaused(false);

            document.querySelector(".pause-ui")?.remove();
            AudioManager.playMenu(scene, "bgm_battle");

            return;
        }

        /*
        ========================
        RESTART
        ========================
        */

        const restartBtn = event.target.closest(".btn-restart");

        if (restartBtn && restartBtn.closest(".pause-ui")) {
            const scene = getScene();

            document.querySelector(".pause-ui")?.remove();

            gameState.setIsPaused(false);

            scene.scene.start("Game");

            return;
        }

        /* 
        ========================
        EXIT
        ========================
        */

        const exitBtn = event.target.closest(".btn-exit");

        if (exitBtn && exitBtn.closest(".pause-ui")) {
            const scene = getScene();

            console.log("exit");

            document.querySelector(".pause-ui")?.remove();

            gameState.setIsPaused(false);

            AudioManager.stopMenu(scene, "bgm_battle");

            scene.scene.start("Map");

            return;
        }
    });
}
