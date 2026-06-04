import { gameState } from "../../core/gameState.js";
import { getScene } from "../../core/sceneManager.js";
import { CITIES } from "../../data/cities.js";
import {
    saveStudentProgress,
    updateStage,
} from "../../services/gameService.js";
import { setSessionGuest } from "../../utils/guest.js";
import { isLogin } from "../../utils/session.js";
import { createStageLayout } from "./Layout.js";
import { showResultUI } from "./ResultUI.js";

export function showEvaluationUI() {
    const uiRoot = document.getElementById("ui-root");

    const city = CITIES.find((c) => c.id === gameState.cityId);

    let evalIndex = 0;
    let evaluation = city.evaluation[evalIndex];

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
            <div class="evaluation-ui">
                <div class="wrap-point">
                  <p>${gameState.score} Poin</p></div>
                <div class="evaluation-popup">
                   
                    <img
                        src="/assets/stages/evaluation.png"
                        class="evaluation-bg"
                    />

                    <div class="evaluation-content">
                         <p class="evaluation-point">${evaluation.poin} Poin</p>
                        <img
                            src="${evaluation.question}"
                            class="evaluation-question"
                        />

                        <div class="evaluation-answers">

                            ${Object.entries(evaluation.answers)
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

                        <div class="evaluation-footer">
                            <button
                                class="evaluation-action btn-check"
                            >
                                <img
                                    src="/assets/stages/UI/btn-checkeval.png"
                                    class="evaluation-action-img"
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
            <div class="evaluation-ui">
                <div class="wrap-point">
                  <p>${gameState.score} Poin</p></div>
                <div class="evaluation-popup">
                <div class="evaluation-result-popup ${isCorrect ? "pass" : "fail"}">

                    <img
                        src="${
                            isCorrect
                                ? "/assets/stages/eval_pass.png"
                                : "/assets/stages/eval_fail.png"
                        }"
                        class="evaluation-result-bg"
                    />

                    ${isCorrect ? `<p class="point">+${evaluation.poin} POIN</p>` : ""}

                    <button class="btn-next">
                       ${
                           evalIndex === city.evaluation.length - 1
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
                selectedAnswer = btn.dataset.answer;
                render();
            };
        });

        document.querySelector(".btn-check").onclick = () => {
            if (!selectedAnswer) {
                return;
            }

            isCorrect = selectedAnswer === evaluation.correctAnswer;

            if (isCorrect) gameState.setScore(evaluation.poin);

            showResult = true;

            render();
        };
    }

    /*
    ========================
    RESULT EVENTS
    ========================
    */

    async function bindResultEvents() {
        document.querySelector(".btn-next").onclick = () => {
            showResult = false;

            selectedAnswer = null;

            const isLastQuiz = evalIndex >= city.evaluation.length - 1;

            if (!isLastQuiz) {
                evalIndex += 1;

                evaluation = city.evaluation[evalIndex];

                render();
            } else {
                if (isLogin())
                    saveStudentProgress({
                        stage: gameState.cityId,
                        score: gameState.score,
                    });

                if (gameState.score >= gameState.kkm) {
                    if (!isLogin()) {
                        setSessionGuest({
                            unlocked_stage: gameState.cityId + 1,
                        });
                    } else {
                        updateStage(gameState.cityId + 1);
                    }
                }
                showResultUI();
            }
        };
    }
}

/*
========================
CLEAR
========================
*/

export function clearEvaluationUI() {
    document.getElementById("ui-root").innerHTML = "";
}
