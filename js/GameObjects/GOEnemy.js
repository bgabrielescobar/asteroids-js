import BaseEntity from './ParentEntity/GOEntity.js';
import GameConfiguration from '../Configuration/GameConfiguration.js';

export default class Enemy extends BaseEntity{

    moveSpeed
    targetPos = {x:0, y:0};

    life

    scoreByHit
    scoreByEliminate

    constructor(x, y, w, h, sprite)
    {
        super(x, y, w, h, 0, sprite);

        this.life = 5;
        this.scoreByHit = 100;
        this.scoreByEliminate = 500;
        this.init();
    }

    init()
    {
        this.moveSpeed = 1;
        [this.x, this.y] = this.getRandomPosition();
        [this.targetPos.x, this.targetPos.y] = this.getRandomPosition();
    }

    update()
    {
        //this.rotationObject();
        this.move();
        this.draw();
    };

    getRandomPosition()
    {
        const x = Math.floor(Math.random() * GameConfiguration.WINDOW_WIDTH + 100);
        const y = Math.floor(Math.random() * GameConfiguration.WINDOW_HEIGHT + 100);
        return [x, y];
    }

    move()
    {
        let startPos = {
            x: this.x,
            y: this.y
        }

        let direction = {
            x: this.targetPos.x - startPos.x,
            y: this.targetPos.y - startPos.y
        };

        let distance = Math.sqrt(direction.x * direction.x + direction.y * direction.y);

        let stepX = (direction.x / distance) * this.moveSpeed;
        let stepY = (direction.y / distance) * this.moveSpeed;

        this.x = startPos.x + stepX;
        this.y = startPos.y + stepY;
    }

    collisionBullet(bullet)
    {
        if (typeof bullet === "undefined") return;

        const overlapX = Math.abs(bullet.x - this.x) <= (bullet.w + this.w) / 2;

        const overlapY = Math.abs(bullet.y - this.y) <= (bullet.h + this.h) / 2;

        return overlapX && overlapY;
    }

    collisionPlayer(player)
    {
        const overlapX = Math.abs(player.x - this.x) <= (player.w + this.w) / 2;

        const overlapY = Math.abs(player.y - this.y) <= (player.h + this.h) / 2;

        return overlapX && overlapY;
    }

    getDamage()
    {
        this.life--;
        this.recievedDamage = true;
    }

}