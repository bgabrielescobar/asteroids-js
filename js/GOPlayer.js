import GOEntity from './GOEntity.js';
import GameConfiguration from './GameConfiguration.js';
import Bullet from './GOBullet.js';

let Player = new GOEntity();
let BulletArray = [];

Player.update = function ({target})
{
    this.rotationObject(target);
    this.draw();
    this.keyListener();
    if (GameConfiguration.isShooting){
        Bullet.collisionLimitStage = false;
        Bullet.x = this.x;
        Bullet.y = this.y;
        Bullet.target_x = target.x;
        Bullet.target_y = target.y;
        Bullet.angle = this.angle;
        BulletArray.push(Bullet);
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