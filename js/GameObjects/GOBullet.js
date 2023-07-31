import BaseEntity from './ParentEntity/GOEntity.js';
import GameConfiguration from '../Configuration/GameConfiguration.js';
import Math from "../Utils/Math/Math.js";

class Bullet extends BaseEntity{

    constructor(x, y, w, h, targetX, targetY, speedBullet, angle, image)
    {
        super(x, y, w, h, angle, image);

        this.targetX = targetX;
        this.targetY = targetY;

        this.angleX = x - this.targetX;
        this.angleY = y - this.targetY;

        this.normalizedAngle = Math.magnitude(this.angleX, this.angleY);

        this.speedBullet = speedBullet;

        this.normalizedVelocityX = (this.angleX / this.normalizedAngle) * this.speedBullet;
        this.normalizedVelocityY = (this.angleY / this.normalizedAngle) * this.speedBullet;

    }

    moveBullet()
    {
        this.x -= this.normalizedVelocityX;
        this.y -= this.normalizedVelocityY;
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
