import BaseEntity from './ParentEntity/GOEntity.js';

export default class Enemy extends BaseEntity{

    constructor(x, y, life)
    {
        super();
        this.life = life;
        this.x = x;
        this.y = y;
    }

    move()
    {

    }

}