import BaseEntity from './GOEntity.js';
import GameConfiguration from '../Configuration/GameConfiguration.js';

class Bullet extends BaseEntity{

    constructor()
    {
        super();
        this.w = 10;
        this.h = 10;
        this.normalizeVelocityY = 0;
        this.normalizeVelocityX = 0;
        this.normalizedAngle = 0;
        this.angleX = 0;
        this.angleY = 0;
    }


    moveBullet()
    {
        this.x -= this.normalizeVelocityX;
        this.y -= this.normalizeVelocityY;
    };

    collisionStage()
    {
        if (this.x < 0 || this.x > GameConfiguration.WINDOW_WIDTH || this.y < 0 || this.y > GameConfiguration.WINDOW_HEIGHT){
            this.collisionLimitStage = true;
        }
    };

    update()
    {
        this.draw();
        this.moveBullet();
        this.collisionStage();
    };


}
export default Bullet;
