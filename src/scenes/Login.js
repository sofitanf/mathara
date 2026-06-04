import { Scene } from "phaser";
import { renderLoginOverlay } from "../ui/LoginUI.js";

export class Login extends Scene {
    constructor() {
        super("Login");
    }

    create() {
        renderLoginOverlay(this);
    }
}
