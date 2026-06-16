import * as Phaser from "phaser";
import { showIntroUI } from "../ui/stage/IntroUI.js";
import { gameState } from "../core/gameState.js";
import { setScene } from "../core/sceneManager.js";
import { showBattleUI } from "../ui/stage/BattleUI.js";
import { CITIES } from "../data/cities.js";
import { showNumerationUI } from "../ui/stage/NumerationUI.js";
import { BATTLE_CONFIG } from "../data/battleConfig.js";
import { showEvaluationUI } from "../ui/stage/EvaluationUI.js";
import { showGameOverUI } from "../ui/stage/GameOverUI.js";

const HERO_DISPLAY_SIZE = 152;
const HERO_GROUND_OFFSET_FROM_BOTTOM = 95;
const ATTACK_EFFECT_SIZE = 92;
const CHARACTER_SHEET_FRAME_SIZE = 514;
const ENEMY_FRONT_DISTANCE = 520;
const ENEMY_FRONT_BUFFER = 180;
const ENEMY_WEAPON_GROUND_OFFSET = 25;
const ENEMY_WEAPON_SIZE = 76;
const ENEMY_WEAPON_DURATION = 1200;
const HERO_DODGE_HEIGHT = 45;
const EVALUATION_DELAY_AFTER_WIN = 3000;

export class Game extends Phaser.Scene {
    constructor() {
        super("Game");
    }

    init(data = {}) {
        this.startWithBattleUI = data.startWithBattleUI === true;
    }

    preload() {
        const city = CITIES.find((item) => item.id === gameState.cityId);
        this.city = city;
        this.stageBackgroundKey = `stage-background-${city.name}`;

        if (city?.background) {
            this.load.image(this.stageBackgroundKey, city.background);
        }

        this.load.image("ground", "/assets/stages/ground.png");

        // load hero
        // default hero
        this.load.image("hero-idle-default", "/assets/mc/mc_idle.png");
        this.load.spritesheet("hero-win-default", "/assets/mc/mc_win.png", {
            frameWidth: CHARACTER_SHEET_FRAME_SIZE,
            frameHeight: CHARACTER_SHEET_FRAME_SIZE,
        });
        this.load.spritesheet("hero-run-default", "/assets/mc/mc_run.png", {
            frameWidth: CHARACTER_SHEET_FRAME_SIZE,
            frameHeight: CHARACTER_SHEET_FRAME_SIZE,
        });
        this.load.spritesheet("hero-jump-default", "/assets/mc/mc_jump.png", {
            frameWidth: CHARACTER_SHEET_FRAME_SIZE,
            frameHeight: CHARACTER_SHEET_FRAME_SIZE,
        });
        this.load.spritesheet(
            "hero-attack-default",
            "/assets/mc/mc_attack.png",
            {
                frameWidth: CHARACTER_SHEET_FRAME_SIZE,
                frameHeight: CHARACTER_SHEET_FRAME_SIZE,
            },
        );
        this.load.image(
            "attack-effect-default",
            "/assets/mc/attact_effect.png",
        );

        // weapon1
        this.load.image("hero-idle-weapon1", "/assets/mc/weapon1/mc_idle.png");
        this.load.spritesheet(
            "hero-win-weapon1",
            "/assets/mc/weapon1/mc_win.png",
            {
                frameWidth: CHARACTER_SHEET_FRAME_SIZE,
                frameHeight: CHARACTER_SHEET_FRAME_SIZE,
            },
        );
        this.load.spritesheet(
            "hero-run-weapon1",
            "/assets/mc/weapon1/mc_run.png",
            {
                frameWidth: CHARACTER_SHEET_FRAME_SIZE,
                frameHeight: CHARACTER_SHEET_FRAME_SIZE,
            },
        );
        this.load.spritesheet(
            "hero-jump-weapon1",
            "/assets/mc/weapon1/mc_jump.png",
            {
                frameWidth: CHARACTER_SHEET_FRAME_SIZE,
                frameHeight: CHARACTER_SHEET_FRAME_SIZE,
            },
        );
        this.load.spritesheet(
            "hero-attack-weapon1",
            "/assets/mc/weapon1/mc_attack.png",
            {
                frameWidth: CHARACTER_SHEET_FRAME_SIZE,
                frameHeight: CHARACTER_SHEET_FRAME_SIZE,
            },
        );
        this.load.image(
            "attack-effect-weapon1",
            "/assets/mc/weapon1/attact_effect.png",
        );

        // weapon2
        this.load.image("hero-idle-weapon2", "/assets/mc/weapon2/mc_idle.png");
        this.load.spritesheet(
            "hero-win-weapon2",
            "/assets/mc/weapon2/mc_win.png",
            {
                frameWidth: CHARACTER_SHEET_FRAME_SIZE,
                frameHeight: CHARACTER_SHEET_FRAME_SIZE,
            },
        );
        this.load.spritesheet(
            "hero-run-weapon2",
            "/assets/mc/weapon2/mc_run.png",
            {
                frameWidth: CHARACTER_SHEET_FRAME_SIZE,
                frameHeight: CHARACTER_SHEET_FRAME_SIZE,
            },
        );
        this.load.spritesheet(
            "hero-jump-weapon2",
            "/assets/mc/weapon2/mc_jump.png",
            {
                frameWidth: CHARACTER_SHEET_FRAME_SIZE,
                frameHeight: CHARACTER_SHEET_FRAME_SIZE,
            },
        );
        this.load.spritesheet(
            "hero-attack-weapon2",
            "/assets/mc/weapon2/mc_attack.png",
            {
                frameWidth: CHARACTER_SHEET_FRAME_SIZE,
                frameHeight: CHARACTER_SHEET_FRAME_SIZE,
            },
        );
        this.load.image(
            "attack-effect-weapon2",
            "/assets/mc/weapon2/attact_effect.png",
        );

        // load enemy
        this.load.image(
            this.getStageTextureKey("enemy", "idle"),
            `/assets/stages/${city.name}/enemy/idle.png`,
        );

        this.load.spritesheet(
            this.getStageTextureKey("enemy", "attack"),
            `/assets/stages/${city.name}/enemy/attack.png`,
            {
                frameWidth: CHARACTER_SHEET_FRAME_SIZE,
                frameHeight: CHARACTER_SHEET_FRAME_SIZE,
            },
        );

        this.load.spritesheet(
            this.getStageTextureKey("enemy", "hurt"),
            `/assets/stages/${city.name}/enemy/hurt.png`,
            {
                frameWidth: CHARACTER_SHEET_FRAME_SIZE,
                frameHeight: CHARACTER_SHEET_FRAME_SIZE,
            },
        );

        this.load.spritesheet(
            this.getStageTextureKey("enemy", "die"),
            `/assets/stages/${city.name}/enemy/die.png`,
            {
                frameWidth: CHARACTER_SHEET_FRAME_SIZE,
                frameHeight: CHARACTER_SHEET_FRAME_SIZE,
            },
        );

        this.load.image(
            this.getStageTextureKey("enemy", "weapon"),
            `/assets/stages/${city.name}/enemy/weapon.png`,
        );

        // load boss
        this.load.image(
            this.getStageTextureKey("boss", "idle"),
            `/assets/stages/${city.name}/boss/idle.png`,
        );

        this.load.spritesheet(
            this.getStageTextureKey("boss", "attack"),
            `/assets/stages/${city.name}/boss/attack.png`,
            {
                frameWidth: CHARACTER_SHEET_FRAME_SIZE,
                frameHeight: CHARACTER_SHEET_FRAME_SIZE,
            },
        );

        this.load.spritesheet(
            this.getStageTextureKey("boss", "hurt"),
            `/assets/stages/${city.name}/boss/hurt.png`,
            {
                frameWidth: CHARACTER_SHEET_FRAME_SIZE,
                frameHeight: CHARACTER_SHEET_FRAME_SIZE,
            },
        );

        this.load.spritesheet(
            this.getStageTextureKey("boss", "die"),
            `/assets/stages/${city.name}/boss/die.png`,
            {
                frameWidth: CHARACTER_SHEET_FRAME_SIZE,
                frameHeight: CHARACTER_SHEET_FRAME_SIZE,
            },
        );

        this.load.image(
            this.getStageTextureKey("boss", "weapon"),
            `/assets/stages/${city.name}/boss/weapon.png`,
        );
    }

    getStageTextureKey(character, action) {
        return `${character}-${action}-${this.city.name}`;
    }

    create() {
        setScene(this);
        gameState.resetState({
            preserveWeapon: this.startWithBattleUI,
        });

        this.controls = {
            left: false,
            right: false,
            jump: false,
            attack: false,
        };
        this.currentWeapon = gameState.weapon || "default";
        this.battleStarted = false;

        if (this.startWithBattleUI) {
            this.startBattle();
        } else {
            showIntroUI();
        }
    }

    startBattle() {
        if (this.battleStarted) {
            showBattleUI(this);
            return;
        }

        this.battleStarted = true;
        this.currentWeapon = gameState.weapon || "default";

        this.createBattleWorld();

        this.createHero();

        this.createHeroAnimations();

        this.createEnemyAnimations();

        this.createEnemy();

        showBattleUI(this);
    }

    createBattleWorld() {
        const WORLD_WIDTH = 7000;
        const WORLD_HEIGHT = this.scale.height;
        const GROUND_HEIGHT = 100;
        const groundTop = WORLD_HEIGHT - HERO_GROUND_OFFSET_FROM_BOTTOM;

        this.physics.world.setBounds(0, 0, WORLD_WIDTH, WORLD_HEIGHT);

        this.cameras.main.setBounds(0, 0, WORLD_WIDTH, WORLD_HEIGHT);
        this.cameras.main.roundPixels = true;

        if (this.textures.exists(this.stageBackgroundKey)) {
            this.add
                .image(0, 0, this.stageBackgroundKey)
                .setOrigin(0, 0)
                .setDisplaySize(this.scale.width, this.scale.height)
                .setScrollFactor(0)
                .setDepth(-20);
        }

        this.platforms = this.physics.add.staticGroup();

        const groundTexture = this.textures.get("ground").getSourceImage();
        const groundScale = GROUND_HEIGHT / groundTexture.height;
        const groundWidth = groundTexture.width * groundScale;
        const groundY = WORLD_HEIGHT - GROUND_HEIGHT / 2;

        for (let x = groundWidth / 2; x < WORLD_WIDTH; x += groundWidth) {
            this.add
                .image(x, groundY, "ground")
                .setDisplaySize(groundWidth, GROUND_HEIGHT)
                .setDepth(-10);
        }

        const groundColliderY = groundTop + GROUND_HEIGHT / 2;

        const groundCollider = this.add.zone(
            WORLD_WIDTH / 2,
            groundColliderY,
            WORLD_WIDTH,
            GROUND_HEIGHT,
        );

        this.physics.add.existing(groundCollider, true);
        this.platforms.add(groundCollider);

        this.groundTop = groundTop;
        this.worldWidth = WORLD_WIDTH;
    }

    updateHeroWeapon() {
        this.currentWeapon = gameState.weapon || "default";

        this.hero.setTexture(`hero-idle-${this.currentWeapon}`);

        this.createHeroAnimations();

        this.setHeroIdle();
    }

    createHero() {
        this.hero = this.physics.add.sprite(
            150,
            this.groundTop,
            "hero-idle-default",
        );
        this.heroGroundY = this.groundTop;
        this.heroIsJumping = false;

        this.hero.setOrigin(0.5, 1);
        this.setHeroIdle();
        this.heroMode = "idle";
        this.heroIsAttacking = false;

        this.hero.setCollideWorldBounds(true);

        this.hero.setBounce(0);
        this.hero.setGravityY(1200);

        this.physics.add.collider(this.hero, this.platforms);

        this.cameras.main.startFollow(this.hero, true, 0.12, 0.12);
    }

    createHeroAnimations() {
        const weapon = this.currentWeapon;

        ["hero-run", "hero-jump", "hero-attack", "hero-win"].forEach((key) => {
            if (this.anims.exists(key)) {
                this.anims.remove(key);
            }
        });

        this.anims.create({
            key: "hero-run",
            frames: this.anims.generateFrameNumbers(`hero-run-${weapon}`, {
                start: 0,
                end: 7,
            }),
            frameRate: 8,
            repeat: -1,
        });

        this.anims.create({
            key: "hero-jump",
            frames: this.anims.generateFrameNumbers(`hero-jump-${weapon}`, {
                start: 0,
                end: 4,
            }),
            frameRate: 10,
            repeat: 0,
        });

        this.anims.create({
            key: "hero-attack",
            frames: this.anims.generateFrameNumbers(`hero-attack-${weapon}`, {
                start: 0,
                end: 3,
            }),
            frameRate: 6,
            repeat: 0,
        });

        this.anims.create({
            key: "hero-win",
            frames: this.anims.generateFrameNumbers(`hero-win-${weapon}`, {
                start: 0,
                end: this.getLastTextureFrameIndex(`hero-win-${weapon}`),
            }),
            frameRate: 3,
            repeat: -1,
        });
    }

    createEnemyAnimations() {
        const animationConfigs = [
            {
                textureKey: this.getStageTextureKey("enemy", "attack"),
                frameRate: 8,
                repeat: 0,
            },
            {
                textureKey: this.getStageTextureKey("enemy", "hurt"),
                frameRate: 8,
                repeat: 0,
            },
            {
                textureKey: this.getStageTextureKey("enemy", "die"),
                frameRate: 6,
                repeat: 0,
            },
            {
                textureKey: this.getStageTextureKey("boss", "attack"),
                frameRate: 8,
                repeat: 0,
            },
            {
                textureKey: this.getStageTextureKey("boss", "hurt"),
                frameRate: 8,
                repeat: 0,
            },
            {
                textureKey: this.getStageTextureKey("boss", "die"),
                frameRate: 6,
                repeat: 0,
            },
        ];

        animationConfigs.forEach(({ textureKey, frameRate, repeat }) => {
            const key = this.getEnemyAnimationKey(textureKey);

            if (this.anims.exists(key)) {
                this.anims.remove(key);
            }

            this.anims.create({
                key,
                frames: this.anims.generateFrameNumbers(textureKey, {
                    start: 0,
                    end: this.getLastTextureFrameIndex(textureKey),
                }),
                frameRate,
                repeat,
            });
        });
    }

    getEnemyAnimationKey(textureKey) {
        return `${textureKey}-anim`;
    }

    getLastTextureFrameIndex(key) {
        const texture = this.textures.get(key);
        const frameCount = texture.getFrameNames(false).length;

        return Math.max(0, frameCount - 1);
    }

    setHeroIdle() {
        this.hero.setTexture(`hero-idle-${this.currentWeapon}`);
        this.hero.setDisplaySize(HERO_DISPLAY_SIZE, HERO_DISPLAY_SIZE);
        this.hero.body?.setSize(this.hero.width, this.hero.height);

        this.alignHeroToGround();
    }

    setHeroRun() {
        this.hero.setDisplaySize(HERO_DISPLAY_SIZE, HERO_DISPLAY_SIZE);
        this.hero.body?.setSize(this.hero.width, this.hero.height);

        this.alignHeroToGround();
    }

    setHeroJump() {
        this.hero.setDisplaySize(HERO_DISPLAY_SIZE, HERO_DISPLAY_SIZE);

        this.hero.body?.setSize(this.hero.width, this.hero.height);
    }

    setHeroAttack() {
        this.hero.setDisplaySize(HERO_DISPLAY_SIZE, HERO_DISPLAY_SIZE);
        this.hero.body?.setSize(this.hero.width, this.hero.height);

        this.alignHeroToGround();
    }

    setHeroWin() {
        this.hero.stop();
        this.hero.setVelocity(0, 0);
        this.hero.play("hero-win", true);
        this.hero.setDisplaySize(HERO_DISPLAY_SIZE, HERO_DISPLAY_SIZE);
        this.hero.body?.setSize(this.hero.width, this.hero.height);
        this.alignHeroToGround();
        this.heroMode = "win";
        this.heroIsAttacking = false;
        this.heroIsJumping = false;
        this.controls.left = false;
        this.controls.right = false;
        this.controls.jump = false;
        this.controls.attack = false;
    }

    alignHeroToGround() {
        if (!this.hero.body || this.hero.body.blocked.down) {
            this.hero.y = this.groundTop;
        }
    }

    isHeroGrounded() {
        return (
            this.hero.body?.blocked.down ||
            this.hero.body?.touching.down ||
            this.hero.y >= this.heroGroundY
        );
    }

    landHero(isMoving) {
        this.heroIsJumping = false;
        this.hero.setVelocityY(0);
        this.hero.y = this.heroGroundY;

        if (isMoving) {
            this.hero.play("hero-run", true);
            this.setHeroRun();
            this.heroMode = "run";
        } else {
            this.hero.stop();
            this.setHeroIdle();
            this.heroMode = "idle";
        }
    }

    /*
    ========================
    ATTACK
    ========================
    */

    attack() {
        if (gameState.isGameOver) return;
        if (this.heroIsAttacking) return;

        this.heroIsAttacking = true;
        this.heroIsJumping = false;
        this.hero.setVelocity(0, 0);

        if (this.enemy) {
            if (this.enemy.x < this.hero.x) {
                this.hero.setFlipX(true);
            } else {
                this.hero.setFlipX(false);
            }
        }

        this.hero.play("hero-attack", true);
        this.setHeroAttack();
        this.heroMode = "attack";

        this.time.delayedCall(140, () => {
            this.shootAttackEffect();
        });

        this.hero.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
            if (this.heroMode === "win") return;

            this.heroIsAttacking = false;

            if (this.controls.left || this.controls.right) {
                this.hero.play("hero-run", true);
                this.setHeroRun();
                this.heroMode = "run";
                return;
            }

            this.hero.stop();
            this.setHeroIdle();
            this.heroMode = "idle";
        });
    }

    shootAttackEffect() {
        if (gameState.isGameOver) return;
        if (!this.enemy) return;

        const direction = this.hero.flipX ? -1 : 1;
        const startX = this.hero.x + direction * 58;
        const startY = this.hero.y - HERO_DISPLAY_SIZE * 0.48;
        const targetX = this.enemy.x;
        const targetY = this.enemy.y - this.enemy.displayHeight * 0.55;
        const angle = Phaser.Math.Angle.Between(
            startX,
            startY,
            targetX,
            targetY,
        );

        const effect = this.add
            .image(startX, startY, `attack-effect-${this.currentWeapon}`)
            .setDisplaySize(ATTACK_EFFECT_SIZE, ATTACK_EFFECT_SIZE)
            .setRotation(angle)
            .setDepth(20);

        this.tweens.add({
            targets: effect,
            x: targetX,
            y: targetY,
            duration: 360,
            ease: "Sine.easeOut",
            onComplete: () => {
                if (gameState.isGameOver) {
                    effect.destroy();
                    return;
                }

                this.damageEnemy();

                const impactScaleX = effect.scaleX * 1.25;
                const impactScaleY = effect.scaleY * 1.25;

                this.tweens.add({
                    targets: effect,
                    alpha: 0,
                    scaleX: impactScaleX,
                    scaleY: impactScaleY,
                    duration: 120,
                    onComplete: () => effect.destroy(),
                });
            },
        });
    }

    // enemy
    createEnemy() {
        const config = BATTLE_CONFIG[gameState.currentBattle];

        this.enemyType = config.type;

        const texture = this.getStageTextureKey(this.enemyType, "idle");
        const enemyX = this.getEnemyFrontX();

        this.enemy = this.physics.add.sprite(enemyX, this.groundTop, texture);

        this.enemy.setOrigin(0.5, 1);

        this.enemy.setDisplaySize(
            this.enemyType === "boss" ? 190 : 160,
            this.enemyType === "boss" ? 190 : 160,
        );

        this.enemyHP = config.hp;

        this.enemyDamage = config.damage;

        this.enemyCooldown = config.attackCooldown;

        this.setEnemyIdle();

        this.enemyDead = false;

        this.enemyAttacking = false;
    }

    getEnemyFrontX() {
        const desiredX = (this.hero?.x || 150) + ENEMY_FRONT_DISTANCE;
        const maxX = (this.worldWidth || 7000) - ENEMY_FRONT_BUFFER;

        return Phaser.Math.Clamp(desiredX, 350, maxX);
    }

    keepEnemyInFrontOfHero() {
        if (!this.enemy || this.enemyDead) return;

        const minimumX = this.hero.x + ENEMY_FRONT_BUFFER;

        if (this.enemy.x < minimumX) {
            this.enemy.x = this.getEnemyFrontX();
            this.enemy.y = this.groundTop;
            this.enemyAttacking = false;
            this.setEnemyIdle();
        }
    }

    setEnemyIdle() {
        if (!this.enemy) return;

        this.enemy.stop();
        this.enemy.setTexture(this.getStageTextureKey(this.enemyType, "idle"));
        this.enemy.setDisplaySize(
            this.enemyType === "boss" ? 165 : 160,
            this.enemyType === "boss" ? 165 : 160,
        );
    }

    playEnemyAnimation(action, onComplete) {
        if (!this.enemy || this.enemyDead) return;

        const textureKey = this.getStageTextureKey(this.enemyType, action);
        const animationKey = this.getEnemyAnimationKey(textureKey);

        if (!this.anims.exists(animationKey)) {
            this.enemy.setTexture(textureKey);
            if (onComplete) {
                this.time.delayedCall(0, onComplete);
            }
            return;
        }

        this.enemy.play(animationKey, true);
        this.enemy.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
            if (onComplete) {
                onComplete();
            }
        });
    }

    updateEnemy() {
        if (gameState.isGameOver) return;
        if (!this.hero || !this.hero.body) return;
        if (!this.enemy) return;

        if (this.enemyDead) return;

        this.keepEnemyInFrontOfHero();

        const distance = Phaser.Math.Distance.Between(
            this.hero.x,
            this.hero.y,
            this.enemy.x,
            this.enemy.y,
        );

        this.enemy.setFlipX(this.hero.x > this.enemy.x);

        if (distance <= 500 && !this.enemyAttacking) {
            this.enemyAttack();
        }
    }

    enemyAttack() {
        if (gameState.isGameOver) return;
        if (this.enemyAttacking) return;

        this.enemyAttacking = true;

        this.playEnemyAnimation("attack", () => {
            if (!gameState.isGameOver && !this.enemyDead) {
                this.setEnemyIdle();
            }

            this.time.delayedCall(this.enemyCooldown, () => {
                if (gameState.isGameOver) return;
                this.enemyAttacking = false;
            });
        });

        this.time.delayedCall(500, () => {
            if (!gameState.isGameOver && !this.enemyDead) {
                this.shootEnemyWeapon();
            }
        });
    }

    shootEnemyWeapon() {
        if (gameState.isGameOver) return;
        if (!this.enemy || !this.hero || this.enemyDead) return;

        const weaponKey = this.getStageTextureKey(this.enemyType, "weapon");

        const startX = this.enemy.x;

        const laneY = this.groundTop - ENEMY_WEAPON_GROUND_OFFSET;

        const startY = laneY;

        const targetX = this.hero.x;

        const targetY = laneY;

        const projectile = this.add
            .image(startX, startY, weaponKey)
            .setDisplaySize(ENEMY_WEAPON_SIZE, ENEMY_WEAPON_SIZE);

        projectile.setFlipX(targetX > startX);
        projectile.setDepth(20);

        this.tweens.add({
            targets: projectile,

            x: targetX,

            y: targetY,

            duration: ENEMY_WEAPON_DURATION,

            onComplete: () => {
                projectile.destroy();

                if (gameState.isGameOver) return;

                if (!this.didHeroDodgeEnemyWeapon()) {
                    this.heroTakeDamage();
                }
            },
        });
    }

    didHeroDodgeEnemyWeapon() {
        return (
            this.heroIsJumping ||
            this.hero.y < this.heroGroundY - HERO_DODGE_HEIGHT
        );
    }

    heroTakeDamage() {
        if (gameState.isGameOver) return;

        gameState.removeHp();

        if (gameState.currentHP > 0) {
            this.refreshHpUI();
            return;
        }

        if (gameState.currentHP <= 0) {
            gameState.isGameOver = true;
            this.controls.left = false;
            this.controls.right = false;
            this.controls.jump = false;
            this.controls.attack = false;
            this.physics.pause();

            showGameOverUI({
                onRestart: () => {
                    gameState.resetBattle();
                    this.scene.restart({ startWithBattleUI: true });
                },
                onExit: () => {
                    this.scene.start("Map");
                },
            });
        }
    }

    refreshHpUI() {
        document.querySelectorAll(".stage-love").forEach((love, index) => {
            love.src =
                index < gameState.currentHP
                    ? "/assets/stages/love_active.png"
                    : "/assets/stages/love_nonactive.png";
        });
    }

    damageEnemy() {
        if (gameState.isGameOver) return;
        if (!this.enemy || this.enemyDead) return;

        let damage = 35;

        if (gameState.weapon) {
            damage = 50;
        }

        this.enemyHP -= damage;

        if (this.enemyHP <= 0) {
            this.enemyDie();
            return;
        }

        this.enemyHurt();
    }

    enemyHurt() {
        this.playEnemyAnimation("hurt", () => {
            if (!this.enemyDead) {
                this.setEnemyIdle();
            }
        });
    }

    enemyDie() {
        this.enemyDead = true;

        const textureKey = this.getStageTextureKey(this.enemyType, "die");
        const animationKey = this.getEnemyAnimationKey(textureKey);

        if (!this.anims.exists(animationKey)) {
            this.enemy.destroy();
            this.onBattleWin();
            return;
        }

        this.enemy.play(animationKey, true);
        this.enemy.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
            if (!this.enemy) return;

            this.enemy.destroy();
            this.onBattleWin();
        });
    }

    onBattleWin() {
        if (gameState.isGameOver) return;

        if (gameState.currentBattle >= 5) {
            this.setHeroWin();

            this.time.delayedCall(EVALUATION_DELAY_AFTER_WIN, () => {
                if (gameState.isGameOver) return;
                showEvaluationUI();
            });
            return;
        }

        gameState.nextBattle();

        this.time.delayedCall(5000, () => {
            if (gameState.isGameOver) return;
            this.setHeroIdle();
            this.heroMode = "idle";
            this.createEnemy();
        });
    }

    update() {
        if (gameState.isGameOver) {
            return;
        }

        if (!this.hero || !this.hero.body) {
            return;
        }

        if (this.heroMode === "win") {
            this.hero.setVelocityX(0);
            return;
        }

        this.updateEnemy();

        const speed = 220;
        const isMoving = this.controls.left || this.controls.right;

        if (this.heroIsAttacking) {
            this.hero.setVelocityX(0);
        } else if (this.controls.left) {
            this.hero.setVelocityX(-speed);

            this.hero.setFlipX(true);
        } else if (this.controls.right) {
            this.hero.setVelocityX(speed);

            this.hero.setFlipX(false);
        } else {
            this.hero.setVelocityX(0);
        }

        if (
            this.controls.jump &&
            this.isHeroGrounded() &&
            !this.heroIsJumping &&
            !this.heroIsAttacking
        ) {
            this.heroIsJumping = true;
            this.hero.play("hero-jump", true);
            this.setHeroJump();
            this.heroMode = "jump";
            this.hero.setVelocityY(-500);

            this.controls.jump = false;
        }

        if (this.heroIsJumping) {
            if (
                this.hero.body.velocity.y >= 0 &&
                this.hero.y >= this.heroGroundY
            ) {
                this.landHero(isMoving);
            }

            this.controls.jump = false;
        } else if (
            !this.heroIsAttacking &&
            isMoving &&
            this.heroMode !== "run"
        ) {
            this.hero.play("hero-run", true);
            this.setHeroRun();
            this.heroMode = "run";
        } else if (
            !this.heroIsAttacking &&
            !isMoving &&
            this.heroMode !== "idle"
        ) {
            this.hero.stop();
            this.setHeroIdle();
            this.heroMode = "idle";
        }

        if (this.controls.attack) {
            this.attack();

            this.controls.attack = false;
        }
    }
}
