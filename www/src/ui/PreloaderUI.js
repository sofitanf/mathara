export function renderPreloaderOverlay() {
    const uiRoot = document.getElementById("ui-root");

    uiRoot.innerHTML = `
      <div class="preloader-ui">

          <img
              class="preloader-uin"
              src="/assets/splash/uin.png"
          />

          <img
              class="preloader-logo"
              src="/assets/mathara.png"
          />

          <img
              class="preloader-loading"
              src="/assets/splash/loading.png"
          />

      </div>
  `;
}

export function clearPreloaderOverlay() {
    document.getElementById("ui-root").innerHTML = "";
}
