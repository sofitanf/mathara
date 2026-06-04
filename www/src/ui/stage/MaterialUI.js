import { gameState } from "../../core/gameState.js";
import { CITIES } from "../../data/cities.js";
import { createStageLayout } from "./Layout.js";
import { showNumerationUI } from "./NumerationUI.js";

export function showMaterialUI() {
    const uiRoot = document.getElementById("ui-root");

    const data = CITIES.find((city) => city.id === gameState.cityId);

    let currentSlide = 0;

    renderSlide();

    function renderSlide() {
        let slide = data.material[currentSlide];

        uiRoot.innerHTML = createStageLayout(
            `
          
                <div class="material-overlay">
                    <div class="material-wrapper">
                    <img  src="${
                        slide.type === "example"
                            ? "/assets/stages/example.png"
                            : slide.type === "answer"
                              ? "/assets/stages/explanation.png"
                              : "/assets/stages/material.png"
                    }" class="material-card">
                        ${
                            slide.type === "material"
                                ? `<p class="material-title">
                                ${`Materi : ${data.type}`}
                            </p>`
                                : ""
                        }
                        
                        <div class="material-content">
                            
                            ${
                                slide
                                    ? `
                                <img
                                    class="material-image"
                                    src="${slide.img}"
                                />
                            `
                                    : ""
                            }

               
                        </div>
                    
                    </div>
                </div>
                 <div class="material-actions">

                    ${
                        currentSlide > 0
                            ? `
                            <button class="material-btn material-prev-btn">
                                <img
                                    src="/assets/stages/UI/btn-prev.png"
                                    class="material-icon"
                                />
                            </button>
                        `
                            : `<div></div>`
                    }

                    <button class="material-btn material-next-btn">

                        <img
                            src="
                                ${
                                    currentSlide >= data.material.length - 1
                                        ? "/assets/stages/UI/btn-finish.png"
                                        : "/assets/stages/UI/btn-next.png"
                                }
                            "
                            class="material-icon"
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
        const nextBtn = document.querySelector(".material-next-btn");

        nextBtn.onclick = () => {
            currentSlide += 1;

            if (currentSlide >= data.material.length) {
                clearMaterialUI();

                showNumerationUI();

                return;
            }

            renderSlide();
        };

        const prevBtn = document.querySelector(".material-prev-btn");

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

export function clearMaterialUI() {
    document.getElementById("ui-root").innerHTML = "";
}
