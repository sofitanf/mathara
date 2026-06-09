import { createStageLayout } from "./Layout.js";
import { getScene } from "../../core/sceneManager.js";

export function showBattleUI(scene) {
    scene = scene || getScene();

    if (!scene) return;

    const root = document.getElementById("ui-root");

    root.innerHTML = createStageLayout(`
        <div class="battle-ui">

            <div class="battle-controls">

                <div class="battle-controls-left">

                    <button
                        id="btn-left"
                        class="battle-btn"
                    >
                        <img
                            src="/assets/stages/UI/btn-left.png"
                            alt="left"
                        />
                    </button>

                    <button
                        id="btn-right"
                        class="battle-btn"
                    >
                        <img
                            src="/assets/stages/UI/btn-right.png"
                            alt="right"
                        />
                    </button>

                </div>

                <div class="battle-controls-right">

                    <button
                        id="btn-attack"
                        class="battle-btn"
                    >
                        <img
                            src="/assets/stages/UI/btn-attack.png"
                            alt="attack"
                        />
                    </button>

                    <button
                        id="btn-jump"
                        class="battle-btn"
                    >
                        <img
                            src="/assets/stages/UI/btn-jump.png"
                            alt="jump"
                        />
                    </button>

                </div>

            </div>

        </div>
    `);

    bindBattleEvents(scene);
}

function bindBattleEvents(scene) {
    scene.controls = {
        left: false,
        right: false,
        jump: false,
        attack: false,
    };

    bindHoldButton(
        "btn-left",
        () => {
            scene.controls.left = true;
        },
        () => {
            scene.controls.left = false;
        },
    );

    bindHoldButton(
        "btn-right",
        () => {
            scene.controls.right = true;
        },
        () => {
            scene.controls.right = false;
        },
    );

    bindHoldButton("btn-attack", () => {
        scene.controls.attack = true;
    });

    bindHoldButton("btn-jump", () => {
        scene.controls.jump = true;
    });

    document.getElementById("btn-pause")?.addEventListener("click", () => {
        scene.onPause();
    });
}

function bindHoldButton(id, onDown, onUp = () => {}) {
    const el = document.getElementById(id);

    if (!el) return;

    el.addEventListener("pointerdown", (event) => {
        event.preventDefault();
        event.stopPropagation();

        onDown();
    });

    el.addEventListener("pointerup", (event) => {
        event.preventDefault();
        event.stopPropagation();

        onUp();
    });

    el.addEventListener("pointerleave", onUp);

    el.addEventListener("pointercancel", onUp);
}
