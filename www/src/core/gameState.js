class GameState {
    constructor() {
        this.initialState();
    }

    /*
    ========================
    INITIAL STATE
    ========================
    */

    initialState() {
        this.cityIdUnlocked = Number(
            localStorage.getItem("unlocked_city") || 1,
        );
        this.cityId = Number(localStorage.getItem("selected_city") || 1);

        this.hp = 1;
        this.currentHP = this.hp;

        this.maxHP = 3;

        this.weapon = null;

        this.score = 0;

        this.kkm = 72;

        this.currentBattle = 1;
        this.maxBattle = 5;

        this.isPaused = false;

        this.isGameOver = false;

        this.quizIndex = 0;
        this.quizSelectedAnswer = null;
    }

    nextBattle() {
        this.currentBattle++;
    }

    resetBattle() {
        this.currentBattle = 1;
        this.currentHP = this.hp;
        this.isGameOver = false;
        this.isPaused = false;
    }

    setIsPaused(value) {
        this.isPaused = value;
    }

    resetState({ preserveWeapon = false } = {}) {
        this.currentBattle = 1;
        this.currentHP = this.hp;
        if (!preserveWeapon) {
            this.weapon = null;
        }
        this.score = 0;
        this.quizIndex = 0;
        this.quizSelectedAnswer = null;
        this.isPaused = false;
        this.isGameOver = false;
    }

    setScore(value) {
        this.score += value;
    }

    setWeapon(value) {
        this.weapon = value;
    }

    setCityId(value) {
        localStorage.setItem("selected_city", value);
        this.cityId = value;
    }

    setCityIdUnlocked(value) {
        localStorage.setItem("unlocked_city", value);
        this.cityIdUnlocked = value;
    }

    setValueQuizSelectedAnswer(value = null) {
        this.quizSelectedAnswer = value;
    }

    nextQuiz() {
        this.quizIndex += 1;
    }

    addHp() {
        this.currentHP += 1;
        if (this.currentHP > this.maxHP) {
            this.currentHP = this.maxHP;
        }
    }

    removeHp() {
        this.currentHP -= 1;
        if (this.currentHP < 0) {
            this.currentHP = 0;
        }
    }
}

/*
========================
GLOBAL SINGLETON
========================
*/

export const gameState = new GameState();
