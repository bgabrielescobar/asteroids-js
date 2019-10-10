import GameConfiguration from '../Configuration/GameConfiguration.js';

export default class Entity {

        constructor()
        {
            this.x = 0;
            this.y = 0;
            this.w = 50;
            this.h = 50;
            this.angle = 0;
            this.color = 'white';
            this.target_x = 0;
            this.target_y = 0;
            this.collisionLimitStage = false;
        }

        update()
        {
        };

        collisionStage()
        {
        };

        draw()
        {
            GameConfiguration.context.fillStyle = this.color;
            GameConfiguration.context.save();
            GameConfiguration.context.translate(this.x, this.y);
            GameConfiguration.context.rotate(this.angle);
            GameConfiguration.context.fillRect(-this.w/2, -this.h/2, this.w, this.h);
            GameConfiguration.context.restore();
        };

        rotationObject(target)
        {
            this.angle = Math.atan2( target.y - this.y, target.x - this.x) + GameConfiguration.TO_DEGREES;
        }
}
