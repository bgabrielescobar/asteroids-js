import GameConfiguration from "./GameConfiguration.js";

function centerObject(entity)
{
    entity.y = GameConfiguration.WINDOW_HEIGHT / 2;
    entity.x = GameConfiguration.WINDOW_WIDTH / 2;
}

export default {centerObject};