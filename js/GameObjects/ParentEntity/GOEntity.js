import GameConfiguration from '../../Configuration/GameConfiguration.js';

export default class Entity {

        x = 0;
        y = 0;
        constructor(x, y, w, h, angle, spritePath)
        {
            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;
            this.angle = angle;
            this.spritePath = spritePath;
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

        rotationObject()
        {
            this.angle = Math.atan2(this.mousePositionY - this.y, this.mousePositionX - this.x) + GameConfiguration.TO_DEGREES;
        }
}
