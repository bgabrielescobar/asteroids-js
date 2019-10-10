import GameConfiguration from './Configuration/GameConfiguration.js';
import EventListener from './EventHandler/EventListener.js';
import {PlayerClass, BulletArray} from './GameObjects/GOPlayer.js';
import GameMechanics from './Utils/GameMechanics.js';

    GameConfiguration.canvas.width = GameConfiguration.WINDOW_WIDTH;
    GameConfiguration.canvas.height = GameConfiguration.WINDOW_HEIGHT;

    let Player = new PlayerClass();

    function refresh()
    {
        GameConfiguration.context.fillStyle = GameConfiguration.BACKGROUND_COLOR;
        GameConfiguration.context.fillRect(1, 0, GameConfiguration.WINDOW_WIDTH, GameConfiguration.WINDOW_HEIGHT);
    }

    function update(timeLapse = 0)
    {
        GameConfiguration.deltaTime = timeLapse - GameConfiguration.lastTime;
        GameConfiguration.lastTime = timeLapse;
        GameConfiguration.dropCounter += GameConfiguration.deltaTime;

        if (GameConfiguration.dropCounter >= GameConfiguration.deltaLimit / GameConfiguration.fpsInterval){

            refresh();
            Player.update({target: GameConfiguration.mousePosition});
            BulletArray.forEach( (element) => {
                element.update();
                if (element.collisionLimitStage){
                    BulletArray.splice(BulletArray.indexOf(element),1);
                }
            });
            GameConfiguration.dropCounter = 0;

        }

        // TODO: Enemy creation loop
        requestAnimationFrame(update);
    }

    EventListener.initEventListener();
    GameMechanics.centerObject(Player);

    window.onload = update();