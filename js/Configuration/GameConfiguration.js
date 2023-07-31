
let configuration = {};

configuration.canvas = document.querySelector( "#canvas");
configuration.context = configuration.canvas.getContext("2d");

configuration.gameOverTag = document.querySelector(".game-over");
configuration.tagScore = document.querySelector(".score")

configuration.soundExplosionAsteroid = document.querySelector("#explosion_asteroid");
configuration.soundGameOver = document.querySelector("#game_over");
configuration.soundPlayerShot = document.querySelector("#player_shot");


configuration.deltaTime = 0;
configuration.deltaLimit = 1000;
configuration.fpsInterval = 120;
configuration.lastTime = 0;
configuration.dropCounter = 0;

configuration.BACKGROUND_COLOR = 'black';

configuration.WINDOW_WIDTH =  window.innerWidth;
configuration.WINDOW_HEIGHT = window.innerHeight;
configuration.canvas.width = configuration.WINDOW_WIDTH;
configuration.canvas.height = configuration.WINDOW_HEIGHT;

window.onresize = function ()
{
    configuration.WINDOW_WIDTH =  window.innerWidth;
    configuration.WINDOW_HEIGHT = window.innerHeight;
    configuration.canvas.width = configuration.WINDOW_WIDTH;
    configuration.canvas.height = configuration.WINDOW_HEIGHT;
};

/** Contain the atlas sprites (Ex. Player, Laser, Asteroid, etc.)*/
configuration.atlasSprite = null;

/** The actually render background */
configuration.backgroundSelected = 0;

/** All resources path (Sprites, Backgrounds) */
configuration.resourcesPath = {
    atlasSprite: {
        0: {path: 'res/images/sprites/atlas.png', image: null}
    },
    backgrounds: {
        0: {path: 'res/images/backgrounds/purple.png', image: null},
        1: {path: 'res/images/backgrounds/blue.png', image: null},
        2: {path: 'res/images/backgrounds/darkPurple.png', image: null},
        3: {path: 'res/images/backgrounds/black.png', image: null},
    },
    sounds: {
        0: {path: ''}
    }
};
/**
 * @type {{"0": number, "1": number, "2": number, "3": number}}
 * @description key is minute, number time (in seconds) to respawn object
 */
configuration.gameDifficulty = {0: 4, 1: 3, 2:2, 3: 1}

configuration.playerSetup = {

};

configuration.bulletSetup = {

};

configuration.TO_DEGREES = Math.PI / 180;

export default configuration;
