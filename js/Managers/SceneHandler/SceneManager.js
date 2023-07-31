import GameConfiguration from '../../Configuration/GameConfiguration.js';
import Game from '../../Scenes/Game.js';

class SceneManager {

    /** By default value Title screen */
    static sceneSelected = 1;

    static changeScene(scene)
    {
        this.sceneSelected = scene;
        this.run();
    }

    static run()
    {
        switch(this.sceneSelected) {
            case 1:
                this.setupGameConfiguration();
                (new Game).run();
                break;
        }
    }

    static setupGameConfiguration()
    {
        GameConfiguration.soundPlayerShot.volume = 0.2;
        GameConfiguration.soundExplosionAsteroid.volume = 0.5;
    }
}

export default SceneManager;