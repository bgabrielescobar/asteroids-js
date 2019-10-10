import Bullet from './GOEntity.js';
import GameConfiguration from '../Configuration/GameConfiguration.js';

Bullet.prototype.w = 10;
Bullet.prototype.h = 10;
Bullet.prototype.normalizeVelocityY = 0;
Bullet.prototype.normalizeVelocityX = 0;
Bullet.prototype.normalizedAngle = 0;
Bullet.prototype.angleX = 0;
Bullet.prototype.angleY = 0;

Bullet.prototype.update = function()
{
    this.draw();
    this.moveBullet();
    this.collisionStage();
    console.log('test');
};

Bullet.prototype.moveBullet = function ()
{
    this.x -= this.normalizeVelocityX;
    this.y -= this.normalizeVelocityY;
};

Bullet.prototype.collisionStage = function ()
{
    if (this.x < 0 || this.x > GameConfiguration.WINDOW_WIDTH || this.y < 0 || this.y > GameConfiguration.WINDOW_HEIGHT){
        this.collisionLimitStage = true;
    }
};

export default Bullet;