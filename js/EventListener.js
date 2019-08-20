import GameConfiguration from "./GameConfiguration.js";

function onMouseUpdate(e)
{
    GameConfiguration.mousePosition.x = e.pageX;
    GameConfiguration.mousePosition.y = e.pageY;
}

function onKeyDownListener(e)
{
    if(e.keyCode === 65){
        GameConfiguration.Keys.left = true;
    }

    if(e.keyCode === 87){
        GameConfiguration.Keys.up = true;
    }

    if(e.keyCode === 68){
        GameConfiguration.Keys.right = true;
    }

    if(e.keyCode === 83){
        GameConfiguration.Keys.down = true;
    }

}

function onKeyUpListener(e)
{
    if(e.keyCode === 65){
        GameConfiguration.Keys.left = false;
    }

    if(e.keyCode === 87){
        GameConfiguration.Keys.up = false;
    }

    if(e.keyCode === 68){
        GameConfiguration.Keys.right = false;
    }

    if(e.keyCode === 83){
        GameConfiguration.Keys.down = false;
    }
}

function onMouseClick()
{
    GameConfiguration.isShooting = true;
}

function initEventListener() {
    GameConfiguration.canvas.addEventListener('mousemove', onMouseUpdate, false);
    GameConfiguration.canvas.addEventListener('mouseenter', onMouseUpdate, false);
    document.addEventListener('keydown', onKeyDownListener, false);
    document.addEventListener('keyup', onKeyUpListener, false);
    document.addEventListener('click', onMouseClick, false);
}

export default {initEventListener};
