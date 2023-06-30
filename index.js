let inputDir = {x:0,y:0};
let score = 0;
let speed = 3;
let lastPaintTime = 0;
let foodSound = new Audio('food.mp3')
let gameOverSound = new Audio('gameover.mp3');
let moveSound = new Audio('move.mp3');
let musicSound = new Audio('music.mp3');
let snakeArr = [ {x:2, y:1} ];
let board = document.getElementById('board');
let food = {x:4, y:4};




function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}


function isCollapse(snake){
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y)
        {
            return true;
        }
    }

    if(snake[0].x <= 0 || snake[0].x >= 10 || snake[0].y >= 10 || snake[0].y <= 0){
        return true
    }
}


function gameEngine(){
    //
    if(isCollapse(snakeArr)){
        // gameOverSound.play();
        // musicSound.pause();
        inputDir = {x:0,y:0};
        alert("Game Over!");
        snakeArr = [{x:2, y:1}];
        // musicSound.pause();
        score = 0;
    }

    //
    if(snakeArr[0].y == food.y && snakeArr[0].x == food.x){
        snakeArr.unshift({x:snakeArr[0].x+inputDir.x , y:snakeArr[0].x + inputDir.y });
        let a = 1;
        let b = 10;
        food = {x: Math.round(a+(b-1)*Math.random()), y: Math.round(a+(b-1)*Math.random())}
    }

    //
    for(let i = snakeArr.length - 2; i >= 0; i--){
        snakeArr[i+1] = {...snakeArr[i]};
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;
    //

    board.innerHTML = "";
    snakeArr.forEach((e,index)=>{
        headElement = document.createElement('div');
        headElement.style.gridRowStart = e.y;
        headElement.style.gridColumnStart = e.x;
        if(index === 0){
            headElement.classList.add('snakeHead');
        }
        else{
            headElement.classList.add('snakeBody');
        }
        board.appendChild(headElement);
    })
   
   
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}


window.requestAnimationFrame(main);
window.addEventListener("keypress", event => {
    inputDir = {x:0,y:1};
    // moveSound.play()
    if (event.key === "w") {
        inputDir.x = 0;
        inputDir.y = -1;
    }
    else if(event.key === "a") {
        inputDir.x = -1;
        inputDir.y = 0;
    }
    else if(event.key === "s") {
        inputDir.x = 0;
        inputDir.y = 1;
    }
    else if(event.key === "d") {
        inputDir.x = 1;
        inputDir.y = 0;
    }
});