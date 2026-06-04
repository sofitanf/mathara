export function openAboutModal() {
    const uiRoot = document.getElementById("ui-root");

    const modal = document.createElement("div");
    modal.className = "modal-backdrop";

    modal.innerHTML = `
    <div class="about-card">
      <button class="close-btn">✕</button>

      <img
        class="about-logo"
        src="/assets/logo.png"
      />

      <p>
        MATHARA adalah game edukasi yang
        menggabungkan matematika dan
        budaya Indonesia dalam petualangan
        seru dan interaktif.
      </p>
    </div>
  `;

    modal.querySelector(".close-btn").onclick = () => modal.remove();

    uiRoot.appendChild(modal);
}
