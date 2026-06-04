import { loginByNIS } from "../services/authService.js";

export function renderLoginOverlay(scene) {
    const uiRoot = document.getElementById("ui-root");

    uiRoot.innerHTML = `
        <div class="login-ui">

            <img
                class="hero"
                src="/assets/home/mathara.png"
            />

            <div class="login-container">

                <img
                    class="login-close"
                    src="/assets/close.png"
                />

                <div class="login-panel">

                    <img
                        class="panel-bg"
                        src="/assets/login/popup.png"
                    />

                    <input
                        type="text"
                        class="login-input"
                        placeholder="Masukkan NIS"
                    />

                    <div class="wrap-alert hidden">
                        <img
                            class="alert-icon"
                            src="/assets/login/alert-icon.png"
                        />

                        <p class="alert-text"></p>
                    </div>

                    <button
                        class="menu-btn btn-login"
                    ></button>

                </div>

            </div>
        </div>
    `;

    bindEvents(scene);
}

function bindEvents(scene) {
    const uiRoot = document.getElementById("ui-root");

    const input = uiRoot.querySelector(".login-input");
    const alertWrap = uiRoot.querySelector(".wrap-alert");
    const alertText = uiRoot.querySelector(".alert-text");
    const btn = uiRoot.querySelector(".btn-login");

    btn.onclick = async () => {
        const nis = input.value.trim();

        // reset error
        hideError(alertWrap, alertText);

        const result = await loginByNIS(nis);

        if (!result.success) {
            showError(alertWrap, alertText, result.message);
            return;
        }

        clearLoginOverlay();
        scene.scene.start("MainMenu");
    };

    uiRoot.querySelector(".login-close").onclick = () => {
        clearLoginOverlay();
        scene.scene.start("MainMenu");
    };

    input.addEventListener("input", () => {
        hideError(alertWrap, alertText);
    });
}

function showError(wrapper, textEl, message) {
    wrapper.classList.remove("hidden");
    textEl.textContent = message;
}

function hideError(wrapper, textEl) {
    wrapper.classList.add("hidden");
    textEl.textContent = "";
}

export function clearLoginOverlay() {
    document.getElementById("ui-root").innerHTML = "";
}
