export function renderAboutOverlay(scene) {
    const uiRoot = document.getElementById("ui-root");

    uiRoot.innerHTML = `
    <div class="about-ui">
        <div class="about-container">
            
            <img class="about-close" src="/assets/close.png" />

            <img
                class="about-logo"
                src="/assets/mathara.png"
            />

            <div class="about-panel">
                <img
                    class="panel-bg"
                    src="/assets/about/panel.png"
                />
                <p class="about-text">
                    MATHARA adalah game edukasi yang
                    menggabungkan matematika dan
                    budaya Indonesia dalam petualangan
                    seru dan interaktif.
                </p>
            </div>

        </div>
    </div>
`;

    uiRoot.querySelector(".about-close").onclick = () => {
        clearAboutOverlay();
        scene.scene.start("MainMenu");
    };
}

export function clearAboutOverlay() {
    document.getElementById("ui-root").innerHTML = "";
}
