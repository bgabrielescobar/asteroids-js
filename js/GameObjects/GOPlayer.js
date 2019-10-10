import GOEntity from './GOEntity.js';
import GameConfiguration from '../Configuration/GameConfiguration.js';
import Bullet from './GOBullet.js';
import GameMechanics from "../Utils/GameMechanics.js";

let Player = new GOEntity();
let BulletArray = [];

Player.update = function ({target})
{
    this.rotationObject(target);
    this.draw();
    this.keyListener();
    if (GameConfiguration.isShooting){
        let bulletCopy =  Bullet;
        bulletCopy.collisionLimitStage = false;
        bulletCopy.x = this.x;
        bulletCopy.y = this.y;
        bulletCopy.angleX = bulletCopy.x - target.x;
        bulletCopy.angleY = bulletCopy.y - target.y;
        bulletCopy.normalizeAngle =  GameMechanics.magnitude(bulletCopy.angleX, bulletCopy.angleY) + 5;
        bulletCopy.normalizeVelocityX = (bulletCopy.angleX / bulletCopy.normalizedAngle);
        bulletCopy.normalizeVelocityY = (bulletCopy.angleY / bulletCopy.normalizedAngle);
        bulletCopy.angle = this.angle;
        BulletArray.push( new bulletCopy());
        GameConfiguration.isShooting = false;
    }
};

Player.keyListener = function()
{
    if (GameConfiguration.Keys.up){
        Player.y -= GameConfiguration.MOVE_SPEED;
    }

    if (GameConfiguration.Keys.down){
        Player.y += GameConfiguration.MOVE_SPEED;
    }

    if (GameConfiguration.Keys.left){
        Player.x -= GameConfiguration.MOVE_SPEED;
    }

    if (GameConfiguration.Keys.right){
        Player.x += GameConfiguration.MOVE_SPEED;
    }
};

export {Player, BulletArray};