// src/core/sceneManager.js

let currentScene = null;

export function setScene(scene) {
    currentScene = scene;
}

export function getScene() {
    return currentScene;
}
