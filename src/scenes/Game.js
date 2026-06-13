import * as Phaser from "phaser";
import { showIntroUI } from "../ui/stage/IntroUI.js";
import { gameState } from "../core/gameState.js";
import { setScene } from "../core/sceneManager.js";
import { showBattleUI } from "../ui/stage/BattleUI.js";
import { CITIES } from "../data/cities.js";
import { showNumerationUI } from "../ui/stage/NumerationUI.js";

const HERO_DISPLAY_SIZE = 152;
const HERO_GROUND_OFFSET_FROM_BOTTOM = 95;
const ATTACK_EFFECT_SIZE = 92;

export class Game extends Phaser.Scene {
    constructor() {
        super("Game");
    }

    preload() {
        const city = CITIES.find((item) => item.id === gameState.cityId);

        if (city?.background) {
            this.load.image("stage-background", city.background);
        }

        this.load.image("ground", "/assets/stages/ground.png");

        // load hero
        // default hero
        this.load.image("hero-idle-default", "/assets/mc/mc_idle.png");
        this.load.spritesheet("hero-run-default", "/assets/mc/mc_run.png", {
            frameWidth: 514,
            frameHeight: 514,
        });
        this.load.spritesheet("hero-jump-default", "/assets/mc/mc_jump.png", {
            frameWidth: 514,
            frameHeight: 514,
        });
        this.load.spritesheet(
            "hero-attack-default",
            "/assets/mc/mc_attack.png",
            {
                frameWidth: 514,
                frameHeight: 514,
            },
        );
        this.load.image(
            "attack-effect-default",
            "/assets/mc/attact_effect.png",
        );

        // weapon1
        this.load.image("hero-idle-weapon1", "/assets/mc/weapon1/mc_idle.png");
        this.load.spritesheet(
            "hero-run-weapon1",
            "/assets/mc/weapon1/mc_run.png",
            {
                frameWidth: 514,
                frameHeight: 514,
            },
        );
        this.load.spritesheet(
            "hero-jump-weapon1",
            "/assets/mc/weapon1/mc_jump.png",
            {
                frameWidth: 514,
                frameHeight: 514,
            },
        );
        this.load.spritesheet(
            "hero-attack-weapon1",
            "/assets/mc/weapon1/mc_attack.png",
            {
                frameWidth: 514,
                frameHeight: 514,
            },
        );
        this.load.image(
            "attack-effect-weapon1",
            "/assets/mc/weapon1/attact_effect.png",
        );

        // weapon2
        this.load.image("hero-idle-weapon2", "/assets/mc/weapon2/mc_idle.png");
        this.load.spritesheet(
            "hero-run-weapon2",
            "/assets/mc/weapon2/mc_run.png",
            {
                frameWidth: 514,
                frameHeight: 514,
            },
        );
        this.load.spritesheet(
            "hero-jump-weapon2",
            "/assets/mc/weapon2/mc_jump.png",
            {
                frameWidth: 514,
                frameHeight: 514,
            },
        );
        this.load.spritesheet(
            "hero-attack-weapon2",
            "/assets/mc/weapon2/mc_attack.png",
            {
                frameWidth: 514,
                frameHeight: 514,
            },
        );
        this.load.image(
            "attack-effect-weapon2",
            "/assets/mc/weapon2/attact_effect.png",
        );
    }

    create() {
        setScene(this);
        gameState.resetState();

        this.controls = {
            left: false,
            right: false,
            jump: false,
            attack: false,
        };
        this.currentWeapon = "default";

        // showIntroUI(this);
        showNumerationUI();

        // showBattleUI(this);

        this.createBattleWorld();

        this.createHero();

        this.createEnemyPrototype();

        this.createHeroAnimations();
    }

    createBattleWorld() {
        const WORLD_WIDTH = 7000;
        const WORLD_HEIGHT = this.scale.height;
        const GROUND_HEIGHT = 100;
        const groundTop = WORLD_HEIGHT - HERO_GROUND_OFFSET_FROM_BOTTOM;

        this.physics.world.setBounds(0, 0, WORLD_WIDTH, WORLD_HEIGHT);

        this.cameras.main.setBounds(0, 0, WORLD_WIDTH, WORLD_HEIGHT);
        this.cameras.main.roundPixels = true;

        if (this.textures.exists("stage-background")) {
            this.add
                .image(0, 0, "stage-background")
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

    createEnemyPrototype() {
        this.enemy = this.add
            .rectangle(620, this.groundTop, 58, 86, 0xff2222)
            .setOrigin(0.5, 1)
            .setDepth(5);
    }

    createHeroAnimations() {
        const weapon = this.currentWeapon;

        ["hero-run", "hero-jump", "hero-attack"].forEach((key) => {
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

    update() {
        if (!this.hero) return;

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

    /*
    ========================
    ATTACK
    ========================
    */

    attack() {
        if (this.heroIsAttacking) return;

        this.heroIsAttacking = true;
        this.heroIsJumping = false;
        this.hero.setVelocity(0, 0);

        if (this.enemy) {
            this.hero.setFlipX(this.enemy.x < this.hero.x);
        }

        this.hero.play("hero-attack", true);
        this.setHeroAttack();
        this.heroMode = "attack";

        this.time.delayedCall(140, () => {
            this.shootAttackEffect();
        });

        this.hero.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
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
        if (!this.enemy) return;

        const direction = this.hero.flipX ? -1 : 1;
        const startX = this.hero.x + direction * 58;
        const startY = this.hero.y - HERO_DISPLAY_SIZE * 0.48;
        const targetX = this.enemy.x;
        const targetY = this.enemy.y - this.enemy.height * 0.55;
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
}
