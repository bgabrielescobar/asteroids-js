import GameConfiguration from '../../Configuration/GameConfiguration.js';

export default class Entity {

        constructor(x, y, w, h, angle, sprite)
        {
            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;
            this.angle = angle;
            this.sprite = sprite;
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

            //GameConfiguration.context.fillStyle = this.color;
            GameConfiguration.context.save();
            GameConfiguration.context.translate(this.x, this.y);
            GameConfiguration.context.rotate(this.angle);
            GameConfiguration.context.drawImage(
                this.sprite.image,
                this.sprite.imgPositionX,
                this.sprite.imgPositionY,
                this.sprite.imgWidth,
                this.sprite.imgHeight,
                -this.w/2,
                -this.h/2,
                this.sprite.sizeWidth,
                this.sprite.sizeHeight,
            );
            //GameConfiguration.context.fillRect(-this.w/2, -this.h/2, this.w, this.h);
            GameConfiguration.context.restore();
        };

        rotationObject()
        {
            this.angle = Math.atan2(this.mousePosition.y - this.y, this.mousePosition.x - this.x) + GameConfiguration.TO_DEGREES;
        };
}
