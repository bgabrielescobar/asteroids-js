import GameConfiguration from '../Configuration/GameConfiguration.js';
import Player from '../GameObjects/GOPlayer.js';
import Enemy from '../GameObjects/GOEnemy.js';
import ResourceManager from "../Managers/ResourceHandler/ResourceManager.js";
// import SceneManager from '../SceneHandler/SceneManager.js';

let run;
let update;
let refresh;
let player;

// To SceneManager
window.onresize = function ()
{
    GameConfiguration.WINDOW_WIDTH =  window.innerWidth;
    GameConfiguration.WINDOW_HEIGHT = window.innerHeight;
    GameConfiguration.canvas.width = GameConfiguration.WINDOW_WIDTH;
    GameConfiguration.canvas.height = GameConfiguration.WINDOW_HEIGHT;
};

refresh = function()
{
    GameConfiguration.context.drawImage(
        GameConfiguration.backgroundSelected,
        0,
        0,
        GameConfiguration.WINDOW_WIDTH,
        GameConfiguration.WINDOW_HEIGHT
    );
    //GameConfiguration.context.fillStyle = GameConfiguration.BACKGROUND_COLOR;
    //GameConfiguration.context.fillRect(0, 0, GameConfiguration.WINDOW_WIDTH, GameConfiguration.WINDOW_HEIGHT);
};

update = function(timeLapse = 0)
{
    // FPS counter
    GameConfiguration.deltaTime = timeLapse - GameConfiguration.lastTime;
    GameConfiguration.lastTime = timeLapse;
    GameConfiguration.dropCounter += GameConfiguration.deltaTime;

    if (GameConfiguration.dropCounter >= GameConfiguration.deltaLimit / GameConfiguration.fpsInterval){
        refresh();
        player.update();
        //enemy.update();
        GameConfiguration.dropCounter = 0;
    }
    requestAnimationFrame(update);
};


run = function ()
{
    ResourceManager.loadResources();
    player = new Player(
        200,
        200,
        50,
        50,
        {
            image: GameConfiguration.resourcesPath.atlasSprite[0].image,
            imgPositionX: 0,
            imgPositionY: 210,
            imgWidth: 75,
            imgHeight: 98,
            sizeWidth: 50,
            sizeHeight: 50,
        }
    );
    requestAnimationFrame(update);
};

export default run;