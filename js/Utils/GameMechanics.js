import GameConfiguration from "../Configuration/GameConfiguration.js";

function centerObject(entity)
{
    entity.y = GameConfiguration.WINDOW_HEIGHT / 2;
    entity.x = GameConfiguration.WINDOW_WIDTH / 2;
}

function magnitude(x, y)
{
    return Math.sqrt(Math.pow(x,2) + Math.pow(y,2));
}

export default {centerObject, magnitude};