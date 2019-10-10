import BaseEntity from './GOEntity.js';
import GameConfiguration from '../Configuration/GameConfiguration.js';
import Bullet from './GOBullet.js';
import GameMechanics from "../Utils/GameMechanics.js";

let BulletArray = [];

class Player extends BaseEntity {

    update({target})
    {
        this.rotationObject(target);
        this.draw();
        this.keyListener();
        if (GameConfiguration.isShooting){
            let bulletCopy = new Bullet();
            bulletCopy.collisionLimitStage = false;
            bulletCopy.x = this.x;
            bulletCopy.y = this.y;
            bulletCopy.angleX = bulletCopy.x - target.x;
            bulletCopy.angleY = bulletCopy.y - target.y;
            bulletCopy.normalizedAngle =  GameMechanics.magnitude(bulletCopy.angleX, bulletCopy.angleY);
            bulletCopy.normalizeVelocityX = (bulletCopy.angleX / bulletCopy.normalizedAngle) * 5;
            bulletCopy.normalizeVelocityY = (bulletCopy.angleY / bulletCopy.normalizedAngle) * 5;
            bulletCopy.angle = this.angle;
            BulletArray.push(bulletCopy);
            GameConfiguration.isShooting = false;
        }
    };

    keyListener()
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

}

export default{PlayerClass: Player, BulletArray};
