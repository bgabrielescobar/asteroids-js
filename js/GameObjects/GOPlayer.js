import BaseEntity from './ParentEntity/GOEntity.js';
import GameConfiguration from '../Configuration/GameConfiguration.js';
import Bullet from './GOBullet.js';
import SceneManager from "../Managers/SceneHandler/SceneManager.js";

class Player extends BaseEntity {

    // Contain an every instance object from the bullet
    bulletList = [];

    // Speed of the spaceship
    moveSpeed;

    bulletSpeed;
    bulletHeight;
    bulletWeight;

    gameOver = false;
    resetGame = false;

    mousePosition = {
        x: 0,
        y: 0,
    };

    keyList = {
        keyUp: false,
        keyDown: false,
        keyLeft: false,
        keyRight: false,
    };

    enemyList = []

    constructor(x, y, w, h, sprite)
    {
        super(x, y, w, h, 0, sprite);

        this.mousePosition.x = 0;
        this.mousePosition.y = 0;

        this.moveSpeed = 5;
        this.bulletSpeed = 10;
        this.bulletWeight = 5;
        this.bulletHeight = 5;

        this.init();
    }

    init()
    {
        this.initEventListener();
    }

    update()
    {
        this.rotationObject();
        this.keyListener();
        this.handlerEnemyCollision();
        this.draw();
    };

    keyListener()
    {
        if (this.keyList.keyUp){
            this.y -= this.moveSpeed;
        }

        if (this.keyList.keyDown){
            this.y += this.moveSpeed;
        }

        if (this.keyList.keyLeft){
            this.x -= this.moveSpeed;
        }

        if (this.keyList.keyRight){
            this.x += this.moveSpeed;
        }
    };

    // Instance bullet
    playerShoot()
    {
        this.bulletList.push(
            new Bullet(
                this.x,
                this.y,
                this.bulletWeight,
                this.bulletHeight,
                this.mousePosition.x,
                this.mousePosition.y,
                this.bulletSpeed,
                this.angle,
                {
                    image: GameConfiguration.resourcesPath.atlasSprite[0].image,
                    imgPositionX: 422,
                    imgPositionY: 834,
                    imgWidth: 37,
                    imgHeight: 13,
                    sizeWidth: this.bulletWeight,
                    sizeHeight: this.bulletHeight,
                }
            )
        );
    }

    handlerEnemyCollision()
    {
        if (this.bulletList.length > 0) {
            for ( let i = this.bulletList.length - 1 ; i >= 0 ; i--){
                this.bulletList[i].update();
                if (this.bulletList[i].collisionLimitStage){
                    this.bulletList.splice(i,1);
                }
                for (let x = this.enemyList.length - 1 ; x >= 0 ; x--) {
                    let collisionBullet = this.enemyList[x].collisionBullet(this.bulletList[i]);
                    if (collisionBullet) {

                        this.bulletList.splice(i,1);
                        this.enemyList[x].getDamage();

                        if (this.enemyList[x].life <= 0) {

                            this.addScore(this.enemyList[x].scoreByEliminate);
                            this.enemyList.splice(x,1);

                            GameConfiguration.soundExplosionAsteroid.currentTime = 0;
                            GameConfiguration.soundExplosionAsteroid.play();

                            return true;
                        }
                        this.addScore(this.enemyList[x].scoreByHit);
                    }
                }
            }
        }
        this.enemyList.forEach( el => {
            let collisionPlayer = el.collisionPlayer(this);
            if (collisionPlayer) {
                GameConfiguration.gameOverTag.style.display = "inline-block";
                GameConfiguration.soundGameOver.play();
                GameConfiguration.soundPlayerShot.volume = 0;
                this.gameOver = true;
            }
        })
    }

    initEventListener()
    {
        this.handleMouseUpdate = this.onMouseUpdate.bind(this);
        this.handleMouseClick = this.onMouseClick.bind(this);
        this.handleKeyUpListener = this.onKeyUpListener.bind(this);
        this.handleKeyDownListener = this.onKeyDownListener.bind(this);

        GameConfiguration.canvas.addEventListener('mousemove', this.handleMouseUpdate, false);
        GameConfiguration.canvas.addEventListener('mouseenter', this.handleMouseUpdate, false);
        document.addEventListener('click', this.handleMouseClick, false);
        document.addEventListener('keyup', this.handleKeyUpListener, false);
        document.addEventListener('keydown', this.handleKeyDownListener, false);

    }

    removeEventListener()
    {
        GameConfiguration.canvas.removeEventListener('mousemove', this.handleMouseUpdate, false);
        GameConfiguration.canvas.removeEventListener('mouseenter', this.handleMouseUpdate, false);
        document.removeEventListener('click', this.handleMouseClick, false);
        document.removeEventListener('keyup', this.handleKeyUpListener, false);
        document.removeEventListener('keydown', this.handleKeyDownListener, false);
    }

    addEnemy(enemy)
    {
        this.enemyList = enemy;
    }

    addScore(score)
    {
        let paddedScore = parseInt(GameConfiguration.tagScore.textContent, 10) + score;
        GameConfiguration.tagScore.textContent = paddedScore.toString().padStart(8, '0');
    }

    // Event listener
    onMouseClick()
    {
        GameConfiguration.soundPlayerShot.currentTime = 0;
        this.playerShoot();
        GameConfiguration.soundPlayerShot.play();
    }

    onMouseUpdate(e)
    {
        this.mousePosition.x = e.pageX;
        this.mousePosition.y = e.pageY;
    }

    onKeyDownListener(e)
    {
        if(e.keyCode === 65){
            this.keyList.keyLeft = true;
        }

        if(e.keyCode === 87){
            this.keyList.keyUp = true;
        }

        if(e.keyCode === 68){
            this.keyList.keyRight = true;
        }

        if(e.keyCode === 83){
            this.keyList.keyDown = true;
        }

        if (e.key === "Escape") {
            this.resetGame = true;
            SceneManager.run();
            GameConfiguration.gameOverTag.style.display = "none";
        }
    }

    onKeyUpListener(e)
    {
        if(e.keyCode === 65){
            this.keyList.keyLeft = false;
        }

        if(e.keyCode === 87){
            this.keyList.keyUp = false;
        }

        if(e.keyCode === 68){
            this.keyList.keyRight = false;
        }

        if(e.keyCode === 83){
            this.keyList.keyDown = false;
        }
    }
}

export default Player;
