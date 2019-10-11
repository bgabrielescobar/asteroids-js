import BaseEntity from './ParentEntity/GOEntity.js';
import GameConfiguration from '../Configuration/GameConfiguration.js';
import Bullet from './GOBullet.js';
import GameFunctions from "../Utils/Functions/GameFunctions.js";
import Math from "../Utils/Math/Math.js";

class Player extends BaseEntity {


    bulletArray = [];

    moveSpeed = 5;
    shootSpeed = 10;

    mousePositionX = 0;
    mousePositionY = 0;

    keyUp = false;
    keyDown = false;
    keyLeft = false;
    keyRight = false;

    isShooting = false;

    constructor()
    {
        super();
        this.init();
    }

    init()
    {
        this.initEventListener();
    }

    // @Target - mouse position
    update()
    {
        this.rotationObject();
        this.draw();
        this.keyListener();
        this.handlerShoot();
    };

    keyListener()
    {
        if (this.keyUp){
            this.y -= this.moveSpeed;
        }

        if (this.keyDown){
            this.y += this.moveSpeed;
        }

        if (this.keyLeft){
            this.x -= this.moveSpeed;
        }

        if (this.keyRight){
            this.x += this.moveSpeed;
        }
        console.log(this.x);
    };

    handlerShoot()
    {
        if (this.isShooting){
            let bulletCopy = new Bullet();
            bulletCopy.collisionLimitStage = false;
            bulletCopy.x = this.x;
            bulletCopy.y = this.y;
            bulletCopy.angleX = bulletCopy.x - target.x;
            bulletCopy.angleY = bulletCopy.y - target.y;
            bulletCopy.normalizedAngle =  Math.magnitude(bulletCopy.angleX, bulletCopy.angleY);
            bulletCopy.normalizeVelocityX = (bulletCopy.angleX / bulletCopy.normalizedAngle) * this.shootSpeed;
            bulletCopy.normalizeVelocityY = (bulletCopy.angleY / bulletCopy.normalizedAngle) * this.shootSpeed;
            bulletCopy.angle = this.angle;
            isShooting = false;
            this.bulletArray.push(bulletCopy);
        }
    }

    initEventListener()
    {
        GameConfiguration.canvas.addEventListener('mousemove', this.onMouseUpdate, false);
        GameConfiguration.canvas.addEventListener('mouseenter', this.onMouseUpdate, false);
        document.addEventListener('click', this.onMouseClick, false);
        document.addEventListener('keyup', this.onKeyUpListener, false);
        document.addEventListener('keydown', this.onKeyDownListener, false);
    }

    // Event listener
    onMouseClick()
    {
        this.isShooting = true;
    }

    onMouseUpdate(e)
    {
        this.mousePositionX = e.pageX;
        this.mousePositionY = e.pageY;
    }

    onKeyDownListener(e)
    {
        if(e.keyCode === 65){
            this.keyLeft = true;
        }

        if(e.keyCode === 87){
            this.keyUp = true;
        }

        if(e.keyCode === 68){
            this.keyRight = true;
        }

        if(e.keyCode === 83){
            this.keyDown = true;
        }
    }

    onKeyUpListener(e)
    {
        if(e.keyCode === 65){
            this.keyLeft = false;
        }

        if(e.keyCode === 87){
            this.keyUp = false;
        }

        if(e.keyCode === 68){
            this.keyRight = false;
        }

        if(e.keyCode === 83){
            this.keyDown = false;
        }
    }



}

export default Player;
