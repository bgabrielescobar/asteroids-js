import GameConfiguration from './GameConfiguration.js';
import EventListener from './EventListener.js';
import {Player, BulletArray} from './GOPlayer.js';
import GameMechanics from './GameMechanics.js';

    GameConfiguration.canvas.width = GameConfiguration.WINDOW_WIDTH;
    GameConfiguration.canvas.height = GameConfiguration.WINDOW_HEIGHT;

    function refresh()
    {
        GameConfiguration.context.fillStyle = 'black';
        GameConfiguration.context.fillRect(1, 0, GameConfiguration.WINDOW_HEIGHT, GameConfiguration.WINDOW_HEIGHT);
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
                    BulletArray.pop(element);
                }
            });
            console.log(BulletArray.length);
            GameConfiguration.dropCounter = 0;

        }

        // TODO: Enemy creation loop
        requestAnimationFrame(update);
    }

    EventListener.initEventListener();
    GameMechanics.centerObject(Player);

    window.onload = update();