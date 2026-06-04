import { gameState } from "../../core/gameState.js";
import { CITIES } from "../../data/cities.js";
import { showIntroUI } from "./IntroUI.js";
import { createStageLayout } from "./Layout.js";
import { showMaterialUI } from "./MaterialUI.js";

export function showQuizUI() {
    const uiRoot = document.getElementById("ui-root");

    const city = CITIES.find((c) => c.id === gameState.cityId);

    let quiz = city.cultureQuiz[gameState.quizIndex];

    let showResult = false;
    let isCorrect = false;

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
            <div class="quiz-ui">

                <div class="quiz-popup">

                    <img
                        src="/assets/stages/quiz.png"
                        class="quiz-bg"
                    />

                    <div class="quiz-content">

                        <img
                            src="${quiz.question}"
                            class="quiz-question"
                        />

                        <div class="quiz-answers">

                            ${Object.entries(quiz.answers)
                                .map(
                                    ([key, image]) => `
                                        <button
                                            class="
                                                answer-item
                                                ${
                                                    gameState.quizSelectedAnswer ===
                                                    key
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
                                                    gameState.quizSelectedAnswer ===
                                                    key
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

                        <div class="quiz-footer">

                            <button
                                class="quiz-action btn-back"
                            >
                                <img
                                    src="/assets/stages/UI/btn-backtomaterial.png"
                                    class="quiz-action-img"
                                />
                            </button>

                            <button
                                class="quiz-action btn-check"
                            >
                                <img
                                    src="/assets/stages/UI/btn-checkquiz.png"
                                    class="quiz-action-img"
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
            <div class="quiz-ui">

                <div class="quiz-result-popup ${isCorrect ? "pass" : "fail"}">

                    <img
                        src="${
                            isCorrect
                                ? "/assets/stages/quiz_pass.png"
                                : "/assets/stages/quiz_fail.png"
                        }"
                        class="quiz-result-bg"
                    />

                    <button class="btn-next">
                        ${
                            gameState.quizIndex === city.cultureQuiz.length - 1
                                ? "Selesai"
                                : "Lanjut"
                        }
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
                gameState.setValueQuizSelectedAnswer(btn.dataset.answer);

                render();
            };
        });

        document.querySelector(".btn-back").onclick = () => {
            showIntroUI();
        };

        document.querySelector(".btn-check").onclick = () => {
            if (!gameState.quizSelectedAnswer) {
                return;
            }

            isCorrect = gameState.quizSelectedAnswer === quiz.correctAnswer;

            if (isCorrect) {
                gameState.addHp();
            }

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
        document.querySelector(".btn-next").onclick = () => {
            showResult = false;

            gameState.setValueQuizSelectedAnswer(null);

            const isLastQuiz =
                gameState.quizIndex >= city.cultureQuiz.length - 1;

            if (!isLastQuiz) {
                gameState.nextQuiz();

                quiz = city.cultureQuiz[gameState.quizIndex];

                render();
            } else {
                showMaterialUI();
            }
        };
    }
}

/*
========================
CLEAR
========================
*/

export function clearQuizUI() {
    document.getElementById("ui-root").innerHTML = "";
}
