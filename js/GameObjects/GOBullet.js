import GOEntity from './GOEntity.js';
import GameConfiguration from '../Configuration/GameConfiguration.js';

let Bullet = new GOEntity();

Bullet.w = 10;
Bullet.h = 10;

Bullet.update = function()
{
    this.draw();
    this.moveBullet();
    this.collisionStage();
};

Bullet.moveBullet = function ()
{
    this.x -= (this.x - this.target_x);
    this.y -= (this.y - this.target_y);
};

Bullet.collisionStage = function ()
{
    if (this.x < 0 || this.x > GameConfiguration.WINDOW_WIDTH || this.y < 0 || this.y > GameConfiguration.WINDOW_HEIGHT){
        this.collisionLimitStage = true;
    }
};

export default Bullet;