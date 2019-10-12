import GameConfiguration from './Configuration/GameConfiguration.js';
import Player from './GameObjects/GOPlayer.js';
import Enemy from './GameObjects/GOEnemy.js';

//TODO: Import a scene manager

    GameConfiguration.canvas.width = GameConfiguration.WINDOW_WIDTH;
    GameConfiguration.canvas.height = GameConfiguration.WINDOW_HEIGHT;

    let player = new Player(20, 20, 50, 50);
    // Todo: Random corner generation position
    //let enemy = new Enemty();

    function refresh()
    {
        GameConfiguration.context.fillStyle = GameConfiguration.BACKGROUND_COLOR;
        GameConfiguration.context.fillRect(0, 0, GameConfiguration.WINDOW_WIDTH, GameConfiguration.WINDOW_HEIGHT);
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
            //enemy.update();

            GameConfiguration.dropCounter = 0;

        }

        // TODO: Enemy creation loop
        requestAnimationFrame(update);
    }

    window.onload = update();