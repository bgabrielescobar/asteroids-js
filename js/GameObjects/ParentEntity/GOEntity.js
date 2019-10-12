import GameConfiguration from '../../Configuration/GameConfiguration.js';

export default class Entity {

        x;
        y;
        w;
        h;
        angle;


        constructor(x, y, w, h, angle)
        {
            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;
            this.angle = angle;
            this.spritePath = 0;
            this.color = 'white';
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
            this.angle = Math.atan2(this.mousePosition.y - this.y, this.mousePosition.x - this.x) + GameConfiguration.TO_DEGREES;
        }
}
