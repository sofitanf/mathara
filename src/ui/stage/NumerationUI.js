import { gameState } from "../../core/gameState.js";
import { getScene } from "../../core/sceneManager.js";
import { CITIES } from "../../data/cities.js";
import { showBattleUI } from "./BattleUI.js";
import { showEvaluationUI } from "./EvaluationUI.js";
import { createStageLayout } from "./Layout.js";

export function showNumerationUI() {
    const uiRoot = document.getElementById("ui-root");

    const city = CITIES.find((c) => c.id === gameState.cityId);

    let numeration = city.numeration[0];

    let showResult = false;
    let isCorrect = false;
    let selectedAnswer = null;

    render();

    /*
    ========================
    RENDER
    ========================
    */

    function render() {
        if (showResult) {
            renderResult();
            return;
        }

        renderQuiz();
    }

    /*
    ========================
    QUIZ
    ========================
    */

    function renderQuiz() {
        uiRoot.innerHTML = createStageLayout(`
            <div class="numeration-ui">

                <div class="numeration-popup">

                    <img
                        src="/assets/stages/numeration.png"
                        class="numeration-bg"
                    />

                    <div class="numeration-content">

                        <img
                            src="${numeration.question}"
                            class="numeration-question"
                        />

                        <div class="numeration-answers">

                            ${Object.entries(numeration.answers)
                                .map(
                                    ([key, image]) => `
                                        <button
                                            class="
                                                answer-item
                                                ${
                                                    selectedAnswer === key
                                                        ? "selected"
                                                        : ""
                                                }
                                            "
                                            data-answer="${key}"
                                        >

                                            <img
                                                src="${image}"
                                                class="answer-image"
                                            />

                                            <img
                                                src="
                                                ${
                                                    selectedAnswer === key
                                                        ? "/assets/stages/UI/radio_active.png"
                                                        : "/assets/stages/UI/radio_nonactive.png"
                                                }
                                                "
                                                class="radio-image"
                                            />

                                        </button>
                                    `,
                                )
                                .join("")}

                        </div>

                        <div class="numeration-footer">
                            <button
                                class="numeration-action btn-check"
                            >
                                <img
                                    src="/assets/stages/UI/btn-checkeval.png"
                                    class="numeration-action-img"
                                />
                            </button>

                        </div>

                    </div>

                </div>

            </div>
        `);

        bindQuizEvents();
    }

    /*
    ========================
    RESULT
    ========================
    */

    function renderResult() {
        uiRoot.innerHTML = createStageLayout(`
            <div class="numeration-ui">

                <div class="numeration-result-popup ${isCorrect ? "pass" : "fail"}">

                    <img
                        src="${
                            isCorrect
                                ? "/assets/stages/numeration_pass.png"
                                : "/assets/stages/quiz_fail.png"
                        }"
                        class="numeration-result-bg"
                    />

                    ${isCorrect ? `<img src="/assets/stages/${city.weapon}.png" class='numeration-weapon'/>` : ""}

                    <button class="btn-next">
                       Lanjut
                    </button>

                </div>

            </div>
        `);

        bindResultEvents();
    }

    /*
    ========================
    QUIZ EVENTS
    ========================
    */

    function bindQuizEvents() {
        document.querySelectorAll(".answer-item").forEach((btn) => {
            btn.onclick = () => {
                selectedAnswer = btn.dataset.answer;
                render();
            };
        });

        document.querySelector(".btn-check").onclick = () => {
            if (!selectedAnswer) {
                return;
            }

            isCorrect = selectedAnswer === numeration.correctAnswer;

            if (isCorrect) gameState.setWeapon(city.weapon);
            console.log(gameState.weapon);
            showResult = true;

            render();
        };
    }

    /*
    ========================
    RESULT EVENTS
    ========================
    */

    function bindResultEvents() {
        const scene = getScene();
        document.querySelector(".btn-next").onclick = () => {
            scene.updateHeroWeapon();
            showBattleUI(getScene());
        };
    }
}

/*
========================
CLEAR
========================
*/

export function clearNumerationUI() {
    document.getElementById("ui-root").innerHTML = "";
}
