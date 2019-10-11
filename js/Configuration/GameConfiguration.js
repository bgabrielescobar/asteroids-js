export default{

    canvas: document.querySelector("#canvas"),
    context: canvas.getContext("2d"),
    deltaTime: 0,
    deltaLimit: 1000,
    fpsInterval: 60,
    lastTime: 0,
    dropCounter: 0,

    BACKGROUND_COLOR: 'black',
    WINDOW_WIDTH: window.innerWidth,
    WINDOW_HEIGHT: window.innerHeight,
    TO_DEGREES: Math.PI / 180,

};
