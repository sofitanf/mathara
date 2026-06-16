import { gameState } from "../core/gameState.js";
import { CITIES } from "../data/cities.js";
import { getSessionGuest } from "../utils/guest.js";
import { getSession, isLogin } from "../utils/session.js";

export function renderMapOverlay(scene) {
    const uiRoot = document.getElementById("ui-root");
    const user = getSession();
    const guest = getSessionGuest();

    const unlocked_stage =
        (isLogin()
            ? Number(user?.unlocked_stage)
            : Number(guest?.unlocked_stage)) || 1;

    const citiesHTML = CITIES.map((city) => {
        const state = city.id <= unlocked_stage ? "unlocked" : "locked";

        return `
            <button
                class="city ${city.name} ${state}"
                data-id="${city.id}"
            >
               
            </button>
        `;
    }).join("");

    uiRoot.innerHTML = `
    <div>
    <button class="btn-home"></button>
    <div class="map-ui">

            <div class="map-wrapper">
                
                ${citiesHTML}
            </div>
        </div>
    </div>

`;

    bindEvents(scene);

    uiRoot.querySelector(".btn-home").onclick = () => {
        clearMapOverlay();
        scene.scene.start("MainMenu");
    };
}

function bindEvents(scene) {
    document.querySelectorAll(".city.unlocked").forEach((btn) => {
        btn.onclick = () => {
            const cityId = Number(btn.dataset.id);

            startStage(cityId, scene);
        };
    });
}

function startStage(cityId, scene) {
    gameState.setCityId(cityId);
    clearMapOverlay();
    scene.scene.start("Game", { startWithBattleUI: false });
}

export function clearMapOverlay() {
    document.getElementById("ui-root").innerHTML = "";
}
