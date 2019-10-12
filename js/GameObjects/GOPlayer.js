import BaseEntity from './ParentEntity/GOEntity.js';
import GameConfiguration from '../Configuration/GameConfiguration.js';
import Bullet from './GOBullet.js';

//Todo: Power ups

class Player extends BaseEntity {

    bulletList = [];

    moveSpeed;

    bulletSpeed;
    bulletHeight;
    bulletWeight;

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


    constructor(x, y, w, h)
    {
        super(x, y, w, h);

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
        this.draw();
        this.keyListener();
        this.handlerBullets();
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
            new Bullet(this.x, this.y, this.bulletWeight, this.bulletHeight, this.mousePosition.x, this.mousePosition.y, this.bulletSpeed, this.angle)
        );
    }

    handlerBullets()
    {
        if (this.bulletList.length > 0){
            this.bulletList.forEach( (element) => {
                element.update();
                if (element.collisionLimitStage){
                    this.bulletList.splice(this.bulletList.indexOf(element),1);
                }
            });
        }
    }

    initEventListener()
    {
        GameConfiguration.canvas.addEventListener('mousemove', this.onMouseUpdate.bind(this), false);
        GameConfiguration.canvas.addEventListener('mouseenter', this.onMouseUpdate.bind(this), false);
        document.addEventListener('click', this.onMouseClick.bind(this), false);
        document.addEventListener('keyup', this.onKeyUpListener.bind(this), false);
        document.addEventListener('keydown', this.onKeyDownListener.bind(this), false);
    }

    // Event listener
    onMouseClick()
    {
        this.playerShoot();
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
