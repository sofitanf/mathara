import { gameState } from "../../core/gameState.js";
import { CITIES } from "../../data/cities.js";

export function createStageLayout(content) {
    const city = CITIES.find((c) => c.id === gameState.cityId);

    /*
    ========================
    HP UI
    ========================
    */

    const hpHTML = Array.from({
        length: gameState.maxHP,
    })
        .map((_, index) => {
            const active = index < gameState.hp;

            return `
                <img
                    src="
                        ${
                            active
                                ? "/assets/stages/love_active.png"
                                : "/assets/stages/love_nonactive.png"
                        }
                    "
                    class="stage-love"
                />
            `;
        })
        .join("");

    return `
        <div
            class="stage-ui"
            style="
                background-image:url('${city.background}')
            "
        >

            <div class="stage-topbar">

                <div class="stage-hp">
                    ${hpHTML}
                </div>

            </div>

            ${content}

        </div>
    `;
}
