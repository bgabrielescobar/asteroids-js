

    // Variable declaration

    let canvas = document.querySelector("#canvas");
    let context = canvas.getContext("2d");
    let deltaTime = 0;
    let deltaLimit = 1000;
    let fpsInterval = 60;
    let lastTime = 0;
    let dropCounter = 0;
    let isShooting = false;
    let Keys =
        {
            keyUp: false,
            keyDown: false,
            keyLeft: false,
            keyRight: false,
        };


    // Const declaration

    const WINDOW_WIDTH = window.innerWidth;
    const WINDOW_HEIGHT = window.innerHeight;
    const MOVE_SPEED = 1;
    const TO_DEGREES = Math.PI / 180;

    canvas.width = WINDOW_WIDTH;
    canvas.height = WINDOW_HEIGHT;



    // Mouse position

    let mousePosition =
        {
            x: 0,
            y: 0,
        };



    // Objects playable

    let Entity =
        {
            x: 0,
            y: 0,
            w: 50,
            h: 50,
            angle: 0,
            color: 'white',
            target: {x: 0, y: 0},
            update: function(){
            },
            draw: function(){
                context.fillStyle = this.color;
                context.save();
                context.translate(this.x, this.y);
                context.rotate(this.angle);
                context.fillRect(-this.w/2, -this.h/2, this.w, this.h);
                context.restore();
            },
            rotationObject: function(target){
                this.angle = Math.atan2( target.y - this.y, target.x - this.x) + TO_DEGREES;
            }
        };

    let player = cloneObject(Entity);
    let enemy = cloneObject(Entity);
    let bullet = cloneObject(Entity);
    let bulletArray = [];



    // Init entities variables

    bullet.w = 10;
    bullet.h = 10;
    bullet.target.x = 0;
    bullet.target.y = 0;


    // Override functions

    player.update = function ({target})
    {
        this.rotationObject(target);
        this.draw();
        this.keyListener();
        if (isShooting){
            bullet.x = this.x;
            bullet.y = this.y;
            bullet.target.x = target.x;
            bullet.target.y = target.y;
            bullet.angle = this.angle;
            bulletArray.push(bullet);
            isShooting = false;
        }
    };

    player.keyListener = function()
    {
        if (Keys.up){
            player.y -= MOVE_SPEED;
        }

        if (Keys.down){
            player.y += MOVE_SPEED;
        }

        if (Keys.left){
            player.x -= MOVE_SPEED;
        }

        if (Keys.right){
            player.x += MOVE_SPEED;
        }
    };

    bullet.update = function()
    {
        this.draw();
        this.moveBullet();
    };

    bullet.moveBullet = function ()
    {
        this.x -= (this.target.x - this.x) / 60;
        this.y -= (this.target.y - this.y) / 60;
    };


    // Init event listener to game

    function initEventListener()
    {
        canvas.addEventListener('mousemove', onMouseUpdate, false);
        canvas.addEventListener('mouseenter', onMouseUpdate, false);
        document.addEventListener('keydown', onKeyDownListener, false);
        document.addEventListener('keyup', onKeyUpListener, false);
        document.addEventListener('click', onMouseClick, false);
    }



    // Refresh canvas

    function refresh()
    {
        context.fillStyle = 'black';
        context.fillRect(1, 0, WINDOW_HEIGHT, WINDOW_HEIGHT);
    }



    // Center objects to center

    function centerObject(entity)
    {
        entity.y = WINDOW_HEIGHT / 2;
        entity.x = WINDOW_WIDTH / 2;
    }

    function cloneObject(src)
    {
        return Object.assign({}, src);
    }

    // Gameloop from the game

    function update(timeLapse = 0)
    {
        deltaTime = timeLapse - lastTime;
        lastTime = timeLapse;
        dropCounter += deltaTime;
        if (dropCounter >= deltaLimit / fpsInterval){
            refresh();
            player.update({target: mousePosition});
            bulletArray.forEach( (element) => {
                element.update();
            });
            dropCounter = 0;
        }



        // TODO: Enemy creation loop
        requestAnimationFrame(update);
    }



    // Listener functions

    function onMouseUpdate(e)
    {
        mousePosition.x = e.pageX;
        mousePosition.y = e.pageY;
    }

    function onKeyDownListener(e)
    {
        console.log(e.keyCode);
        if(e.keyCode === 65){
            Keys.left = true;
        }

        if(e.keyCode === 87){
            Keys.up = true;
        }

        if(e.keyCode === 68){
            Keys.right = true;
        }

        if(e.keyCode === 83){
            Keys.down = true;
        }

    }

    function onKeyUpListener(e)
    {
        if(e.keyCode === 65){
            Keys.left = false;
        }

        if(e.keyCode === 87){
            Keys.up = false;
        }

        if(e.keyCode === 68){
            Keys.right = false;
        }

        if(e.keyCode === 83){
            Keys.down = false;
        }
    }

    function onMouseClick()
    {
        isShooting = true;
    }

    initEventListener();
    centerObject(player);


    // Start gameloop
    window.onload = update();