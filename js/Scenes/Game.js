import GameConfiguration from '../Configuration/GameConfiguration.js';
import Player from '../GameObjects/GOPlayer.js';
import Enemy from '../GameObjects/GOEnemy.js';
import ResourceManager from "../Managers/ResourceHandler/ResourceManager.js";
import SceneManager from '../Managers/SceneHandler/SceneManager.js';

class Game {

    GameDifficulty = {
        Easy:   0,
        Normal: 1,
        Hard:   2,
        Expert: 3
    }

    constructor() {
        this.player             = null;
        this.timerInterval      = null;
        this.totalSeconds       = 0;
        this.minutes            = 0;
        this.difficultySelected = 0;
        this.backgroundStars    = [];
        this.enemies            = [];
    }

    timer()
    {
        this.timerInterval = setInterval(() => {
            this.minutes = Math.floor(this.totalSeconds / 60);
            this.totalSeconds++;

            this.spawnAsteroid();
        }, 1000);
    }

    spawnAsteroid()
    {
        if (this.totalSeconds % GameConfiguration.gameDifficulty[this.difficultySelected] === 0) {
            this.enemies.push(new Enemy(0, 0, 50, 50, {
                image: GameConfiguration.resourcesPath.atlasSprite[0].image,
                imgPositionX: 381,
                imgPositionY: 326,
                imgWidth: 95,
                imgHeight: 97,
                sizeWidth: 60,
                sizeHeight: 68,
            }));
        }

        switch (this.minutes) {
            case 0:
                this.difficultySelected = this.GameDifficulty.Easy;
                break;
            case 1:
                this.difficultySelected = this.GameDifficulty.Normal;
                break;
            case 2:
                this.difficultySelected = this.GameDifficulty.Hard;
                break;
            default:
                this.difficultySelected = this.GameDifficulty.Expert;
        }
    }

    backgroundRender()
    {
        for (let i = 0 ; i < this.backgroundStars.length ; i++) {
            GameConfiguration.context.beginPath();
            GameConfiguration.context.arc(this.backgroundStars[i].x, this.backgroundStars[i].y, this.backgroundStars[i].radius, 0, Math.PI * 2);
            GameConfiguration.context.fillStyle = '#FFFFFF';
            GameConfiguration.context.fill();
            GameConfiguration.context.closePath();
        }
    }

    refresh()
    {
        GameConfiguration.context.fillStyle = GameConfiguration.BACKGROUND_COLOR;
        GameConfiguration.context.fillRect(0, 0, GameConfiguration.WINDOW_WIDTH, GameConfiguration.WINDOW_HEIGHT);
    }

    update(timeLapse = 0)
    {

        if (this.player.resetGame) {
            this.resetGame();
            return;
        }

        GameConfiguration.deltaTime = timeLapse - GameConfiguration.lastTime;
        GameConfiguration.lastTime = timeLapse;
        GameConfiguration.dropCounter += GameConfiguration.deltaTime;

        if (GameConfiguration.dropCounter >= GameConfiguration.deltaLimit / GameConfiguration.fpsInterval && !this.player.gameOver){
            this.refresh();
            this.player.update();

            this.backgroundRender();
            for (let i = 0 ; i < this.enemies.length ; i++) {
                this.enemies[i].update();
            }

            GameConfiguration.dropCounter = 0;
        }
        requestAnimationFrame(this.update.bind(this));
    }

    resetGame()
    {
        this.player.removeEventListener();
        clearInterval(this.timerInterval);
    }

    run()
    {
        for (let i = 0 ; i < 40 ; i++) {
            this.backgroundStars.push(
                {
                    'x': Math.random() * GameConfiguration.canvas.width,
                    'y': Math.random() * GameConfiguration.canvas.height,
                    'radius': Math.random() * 3
                }
            );
        }

        GameConfiguration.tagScore.textContent = "00000000";

        ResourceManager.loadResources();
        this.player = new Player(
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

        this.timer();
        this.player.addEnemy(this.enemies);
        requestAnimationFrame(this.update.bind(this));
        console.log("end game")
    }
}

export default Game;