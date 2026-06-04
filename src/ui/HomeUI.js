import { exitGame } from "../services/appService.js";
import { clearSession, getSession } from "../utils/session.js";

export function renderHomeOverlay(scene) {
    const uiRoot = document.getElementById("ui-root");
    const user = getSession();

    const isLogin = !!user;

    uiRoot.innerHTML = `
    <div class="home-ui">
         ${
             isLogin
                 ? `
                    <div class="user-info">
                        <div class="user-name">
                            Hi, ${user.name}
                        </div>

                        <button class="logout-btn"></button>
                    </div>
                `
                 : ""
         }

      <img
        class="hero"
        src="/assets/home/mathara.png"
      />

      
      <div class="home-content">
      <div class="home-panel">
        <button class="menu-btn btn-start"></button>
         ${
             !isLogin
                 ? `
                <button
                    class="menu-btn btn-student"
                ></button>
            `
                 : ""
         }
        <button class="menu-btn btn-about"></button>
        <button class="menu-btn btn-exit"></button>
      </div>
      </div>
    </div>
  `;
    bindEvents(scene, isLogin);
}

function bindEvents(scene, isLogin) {
    const startBtn = document.querySelector(".btn-start");
    const aboutBtn = document.querySelector(".btn-about");
    const exitBtn = document.querySelector(".btn-exit");
    const studentBtn = document.querySelector(".btn-student");
    const logoutBtn = document.querySelector(".logout-btn");

    // mulai
    startBtn.onclick = () => {
        scene.scene.start("Map");
    };

    // login siswa
    if (studentBtn) {
        studentBtn.onclick = () => {
            scene.scene.start("Login");
        };
    }

    // about
    if (aboutBtn) {
        aboutBtn.onclick = () => {
            scene.scene.start("About");
        };
    }

    // logout
    if (logoutBtn) {
        logoutBtn.onclick = () => {
            clearSession();
            scene.scene.restart();
        };
    }

    // keluar
    if (exitBtn) {
        exitBtn.onclick = async () => {
            await exitGame();
        };
    }
}

export function clearOverlay() {
    document.getElementById("ui-root").innerHTML = "";
}
