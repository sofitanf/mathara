export default class AudioManager {
    static lifecycleInstalled = false;
    static lifecyclePaused = false;
    static lifecyclePausedSounds = new Set();

    static installLifecycle(game) {
        if (this.lifecycleInstalled || !game?.sound) {
            return;
        }

        this.lifecycleInstalled = true;

        const pauseAudio = () => {
            if (this.lifecyclePaused) {
                return;
            }

            this.lifecyclePaused = true;
            this.lifecyclePausedSounds.clear();

            this.getSounds(game).forEach((sound) => {
                if (sound?.isPlaying && !sound.isPaused) {
                    sound.pause();
                    this.lifecyclePausedSounds.add(sound);
                }
            });
        };

        const resumeAudio = () => {
            if (!this.lifecyclePaused) {
                return;
            }

            this.lifecyclePaused = false;

            this.lifecyclePausedSounds.forEach((sound) => {
                if (sound?.isPaused) {
                    sound.resume();
                }
            });

            this.lifecyclePausedSounds.clear();
        };

        const handleVisibility = () => {
            if (document.hidden) {
                pauseAudio();
            } else {
                resumeAudio();
            }
        };

        document.addEventListener("visibilitychange", handleVisibility);
        window.addEventListener("pagehide", pauseAudio);
        window.addEventListener("blur", pauseAudio);
        window.addEventListener("focus", () => {
            if (!document.hidden) {
                resumeAudio();
            }
        });

        window.Capacitor?.Plugins?.App?.addListener(
            "appStateChange",
            ({ isActive }) => {
                if (isActive) {
                    resumeAudio();
                } else {
                    pauseAudio();
                }
            }
        );
    }

    static getSounds(game) {
        if (Array.isArray(game.sound.sounds)) {
            return game.sound.sounds;
        }

        if (typeof game.sound.getAll === "function") {
            return game.sound.getAll();
        }

        return [];
    }

    static playMenu(scene, key, volume = 0.4) {
        let bgm = scene.sound.get(key);

        if (!bgm) {
            bgm = scene.sound.add(key, {
                loop: true,
                volume,
            });

            bgm.play();
        }
    }

    static stopMenu(scene, key) {
        const bgm = scene.sound.get(key);

        if (bgm) {
            bgm.stop();
            bgm.destroy();
        }
    }
}
