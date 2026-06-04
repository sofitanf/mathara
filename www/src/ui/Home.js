export function renderHomeOverlay(scene) {
    const uiRoot = document.getElementById("ui-root");

    uiRoot.innerHTML = `
    <div class="home-ui">
    <div class="user-info">
    <div class="user-name">
        Hi, Fita
    </div>

    <button class="logout-btn"></button>
</div>
      

      <img
        class="hero"
        src="/assets/home/mathara.png"
      />

      
      <div class="home-content">
      <div class="home-panel">
        <button class="menu-btn btn-start"></button>
        <button class="menu-btn btn-student"></button>
        <button class="menu-btn btn-about"></button>
        <button class="menu-btn btn-exit"></button>
      </div>
      </div>
    </div>
  `;

    uiRoot.querySelector(".btn-start").onclick = () => {
        console.log("mulai");
    };

    uiRoot.querySelector(".btn-student").onclick = () => {
        clearOverlay();
        scene.scene.start("Login");
    };

    uiRoot.querySelector(".btn-about").onclick = () => {
        clearOverlay();
        scene.scene.start("About");
    };

    uiRoot.querySelector(".btn-exit").onclick = () => {
        window.close();
    };
}

export function clearOverlay() {
    document.getElementById("ui-root").innerHTML = "";
}
