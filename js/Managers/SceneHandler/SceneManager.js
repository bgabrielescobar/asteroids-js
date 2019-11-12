import GameConfiguration from '../../Configuration/GameConfiguration.js';
import Game from '../../Game/Game.js';

window.onresize = function ()
{
    GameConfiguration.WINDOW_WIDTH =  window.innerWidth;
    GameConfiguration.WINDOW_HEIGHT = window.innerHeight;
    GameConfiguration.canvas.width = GameConfiguration.WINDOW_WIDTH;
    GameConfiguration.canvas.height = GameConfiguration.WINDOW_HEIGHT;
};

class SceneManager {

    static scenes = {
        0: {play: 'TitleScreen'},
        1: {play: 'History'},
        2: {play: Game},
        3: {play: 'Credits'},
    };

    /** By default value Title screen */
    static sceneSelected = 2;

    static changeScene(scene)
    {
        this.sceneSelected = scene;
        this.run();
    }

    static run()
    {
        this.scenes[this.sceneSelected].play();
    }
}

export default SceneManager;