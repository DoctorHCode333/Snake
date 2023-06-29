let direction = {x:0,y:0};
let inputDir = {x:0,y:0};
let score = 0;
let speed = 4;
let lastPaintTime = 0;
let foodSound = new Audio('food.mp3')
let gameOverSound = new Audio('gameover.mp3');
let moveSound = new Audio('move.mp3');
let musicSound = new Audio('music.mp3');
let snakeArr = [ {x:2, y:1} ];
let snakeElement = document.getElementById(""+(snakeArr[0].x)+(snakeArr[0].y));
let food = {x:4, y:4};
let foodContainer = document.getElementById(""+(food.x)+(food.y));



function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}


function isCollapse(){
    for (let i = 0; i < array.length; i++) {
        if(snakeArr[i].x === snakeArr[0].x && snakeArr[i].y === snakeArr[0].y){
            return true;
        }
    }

    if(snakeArr[0].x <= 0 || snakeArr[0].x >= 10 && snakeArr[0].y >= 0 || snakeArr[0].y <= 0){
        return True
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
        let a = 0;
        let b = 9;
        food = {x: Math.round(a+(b-1)*Math.random()), y: Math.round(a+(b-1)*Math.random())}
    }

    //
    for(let i = snakeArr.length - 2;i>=0;i--){
        snakeArr[i+1] = {...snakeArr[i]};
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;
    //
    snakeElement.innerHTML = "";
    foodContainer.innerHTML = "";
    snakeArr.forEach((e,index)=>{
        snakeElement = document.getElementById(""+(e.x)+(e.y));
        headElement = document.createElement('div');
        if(index === 0){
            headElement.classList.add('snakeHead');
        }
        else{
            headElement.classList.add('snakeBody');
        }
        snakeElement.appendChild(headElement);
    })

    foodElement = document.createElement('div');
    foodContainer = document.getElementById(""+(food.x)+(food.y));
    foodElement.classList.add('food');
    foodContainer.appendChild(foodElement);
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