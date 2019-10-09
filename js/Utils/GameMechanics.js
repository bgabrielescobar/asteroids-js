import GameConfiguration from "../Configuration/GameConfiguration.js";

function centerObject(entity)
{
    entity.y = GameConfiguration.WINDOW_HEIGHT / 2;
    entity.x = GameConfiguration.WINDOW_WIDTH / 2;
}

function normalize(val, max, min)
{
    return (val - min) / (max - min);
}

export default {centerObject};