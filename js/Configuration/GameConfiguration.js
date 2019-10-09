export default{

    canvas: document.querySelector("#canvas"),
    context: canvas.getContext("2d"),
    deltaTime: 0,
    deltaLimit: 1000,
    fpsInterval: 60,
    lastTime: 0,
    dropCounter: 0,
    isShooting: false,

    BACKGROUND_COLOR: 'black',
    WINDOW_WIDTH: window.innerWidth,
    WINDOW_HEIGHT: window.innerHeight,
    MOVE_SPEED: 3,
    TO_DEGREES: Math.PI / 180,

    mousePosition:
        {
            x: 0,
            y: 0,
        },

    Keys:
        {
            keyUp: false,
            keyDown: false,
            keyLeft: false,
            keyRight: false,
        },

};
