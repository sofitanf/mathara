import { gameState } from "../../core/gameState.js";
import { CITIES } from "../../data/cities.js";
import { createStageLayout } from "./Layout.js";
import { showQuizUI } from "./QuizUI.js";

export function showIntroUI() {
    const uiRoot = document.getElementById("ui-root");

    const data = CITIES.find((city) => city.id === gameState.cityId);

    let currentSlide = 0;

    renderSlide();

    function renderSlide() {
        const slide = data.intro[currentSlide];

        uiRoot.innerHTML = createStageLayout(
            `
          
               <div class="intro-overlay">

                    <div class="intro-card">

                        ${
                            slide
                                ? `
                                <img
                                    class="intro-image"
                                    src="${slide}"
                                />
                            `
                                : ""
                        }

                    

                    </div>

                </div>
                 <div class="intro-actions">

            ${
                currentSlide > 0
                    ? `
                    <button class="intro-btn btn-prev">
                        <img
                            src="/assets/stages/UI/btn-prev.png"
                            class="intro-icon"
                        />
                    </button>
                `
                    : `<div></div>`
            }

            <button class="intro-btn btn-next-intro">

                <img
                    src="${
                        currentSlide >= data.intro.length - 1
                            ? "/assets/stages/UI/btn-finish.png"
                            : "/assets/stages/UI/btn-next.png"
                    }"
                    class="intro-icon"
                />

            </button>

        </div>
        `,
        );

        bindEvents();
    }

    /*
    ========================
    EVENTS
    ========================
    */

    function bindEvents() {
        const nextBtn = document.querySelector(".btn-next-intro");

        nextBtn.onclick = () => {
            currentSlide += 1;

            if (currentSlide >= data.intro.length) {
                clearIntroUI();

                showQuizUI();

                return;
            }

            renderSlide();
        };

        const prevBtn = document.querySelector(".btn-prev");

        if (prevBtn) {
            prevBtn.onclick = () => {
                currentSlide -= 1;

                renderSlide();
            };
        }
    }
}

/*
========================
CLEAR
========================
*/

export function clearIntroUI() {
    document.getElementById("ui-root").innerHTML = "";
}
