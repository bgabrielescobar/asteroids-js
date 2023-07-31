import GameConfiguration from '../../Configuration/GameConfiguration.js';

export default class Entity {

        recievedDamage = false;

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
            GameConfiguration.context.save();
            GameConfiguration.context.translate(this.x, this.y);
            GameConfiguration.context.rotate(this.angle);
            if (this.recievedDamage) {
                this.renderHitDamage();
            } else {
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
            }

            GameConfiguration.context.restore();
        };

        rotationObject()
        {
            this.angle = Math.atan2(this.mousePosition.y - this.y, this.mousePosition.x - this.x) + GameConfiguration.TO_DEGREES;
        };

        renderHitDamage()
        {
            this.recievedDamage = false;
        }
}
