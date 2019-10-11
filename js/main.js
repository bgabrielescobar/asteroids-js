import GameConfiguration from './Configuration/GameConfiguration.js';
import Player from './GameObjects/GOPlayer.js';
import GameFunctions from './Utils/Functions/GameFunctions.js';
//TODO: Import a scene manager

    GameConfiguration.canvas.width = GameConfiguration.WINDOW_WIDTH;
    GameConfiguration.canvas.height = GameConfiguration.WINDOW_HEIGHT;

    let player = new Player();

    function refresh()
    {
        GameConfiguration.context.fillStyle = GameConfiguration.BACKGROUND_COLOR;
        GameConfiguration.context.fillRect(0, 0, GameConfiguration.WINDOW_WIDTH, GameConfiguration.WINDOW_HEIGHT);
        //var image = new Image(GameConfiguration.WINDOW_WIDTH, GameConfiguration.WINDOW_HEIGHT);
        //image.src = '../src/images/backgrounds/black.png';
        //document.body.appendChild(image);
    }

    function update(timeLapse = 0)
    {
        // FPS counter
        GameConfiguration.deltaTime = timeLapse - GameConfiguration.lastTime;
        GameConfiguration.lastTime = timeLapse;
        GameConfiguration.dropCounter += GameConfiguration.deltaTime;

        if (GameConfiguration.dropCounter >= GameConfiguration.deltaLimit / GameConfiguration.fpsInterval){

            refresh();
            player.update();

            // BulletArray.forEach( (element) => {
            //     element.update();
            //     if (element.collisionLimitStage){
            //         BulletArray.splice(BulletArray.indexOf(element),1);
            //     }
            // });
            // GameConfiguration.dropCounter = 0;

        }

        // TODO: Enemy creation loop
        requestAnimationFrame(update);
    }

    //GameFunctions.centerObject(player);

    window.onload = update();