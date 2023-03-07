// Game Constants & Variables
let inputDir = {x: 0, y: 0}; 
let foodSound = new Audio('food.mp3');
let gameOverSound = new Audio('gameover.mp3');
let moveSound = new Audio('move.mp3');

let SnakeSpeed = prompt("Enter The Speed Of The Snake In Number: (Default Is 20)", 20) || 20;
var Difficulty = prompt("Enter The Difficulty Of The Game (easy -> {No Effect Of Wall & Body Hit}, medium -> {No Effect Of Wall, But Will Die For Body Hit}, hard -> {Will Die For Wall Hit & Body Hit}): (Default Is medium)", "medium") || "medium";
var bgcolor = prompt("Enter The Color Of The Snake (Color Name Or Hex Value): (Default Is #ff0)", "#ff0") || "#ff0";
var type = prompt("Enter The Body Type Of The Snake (Square or Circle): (Default Is Circle)", "Circle") || "50%";
var arr = prompt("Enter The Comma Separated Area Size (Row, Column): (Default Is 20, 20)", "20, 20") || [20, 20];
alert("USE ARROW KEYS TO MOVE THE SNAKE!!!");

arr = (arr)? ((arr.includes(","))? arr.split(","): [20, 20]) : [20, 20];

for(let g = 0; g < arr.length; g++){
    arr[g] = Number(arr[g]);
}

arr = (!(isNaN(arr[0])) && !(isNaN(arr[1])))? arr: [20, 20];

for(let g = 0; g < arr.length; g++){
    arr[g] = Number(arr[g]);
}

let Area = document.getElementById("board");

Area.style.gridTemplateRows = `repeat(${arr[0]}, 1fr)`;
Area.style.gridTemplateColumns = `repeat(${arr[1]}, 1fr)`;

if(type.toUpperCase() == "CIRCLE"){
    type = "50%";
}
else if(type.toUpperCase() == "SQUARE"){
    type = "0%";
}
else{
    type = "50%";
}

(isNaN(Difficulty))? ((Difficulty.toUpperCase() == "EASY")? Difficulty = "easy": ((Difficulty.toUpperCase() == "HARD")? Difficulty = "hard": Difficulty = "medium")) : Difficulty = "medium";

let speed = (!(isNaN(Number(SnakeSpeed))) && SnakeSpeed)? SnakeSpeed: 30;
let score = 0;
let lastPaintTime = 0;
let a = 2;
let b = (arr[0] < arr[1])? arr[0] - 1: arr[1] - 1;
let c = 4;
let d = (arr[0] < arr[1])? arr[0] - 3: arr[1] - 3;
let snakeArr = [
    {x: Math.round(c + (d-c)* Math.random()), y: Math.round(c + (d-c)* Math.random())}
];
var allowed = true;
var allowed2 = false;
var allowed3 = false;
var allowed4 = true;

for(let i = 1; i <= 3; i++){
snakeArr.push({x: snakeArr[0].x + 0, y: snakeArr[0].y + i});
}

for (;;) {

	var food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())};

	let isOverlap = 0;
	
	for (let i = 0; i < snakeArr.length; i++) {
	
        	if(snakeArr[i].x == food.x && snakeArr[i].y == food.y){

			isOverlap = 1;
			
			break;

        	}
    	}

		if(isOverlap == 0){

			break;

		}

	}

// Game Functions
function main(ctime) {
    window.requestAnimationFrame(main);
    // console.log(ctime)
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;

    gameEngine();
}

function isCollide(snake){
    if(Difficulty == "easy"){
        return;
    }
    // If you bump into yourself 
    if(Difficulty == "medium" || Difficulty == "hard"){
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x == snake[0].x && snake[i].y == snake[0].y){
            return true;
        }
    }
    }
    // If you bump into the wall
    if(Difficulty == "hard"){
    if(snake[0].x > arr[1] || snake[0].x <= 0|| snake[0].y > arr[0] || snake[0].y <= 0){
        return true;
    }
    }
        
    return false;
}

function gameEngine(){
    
    var spFoodID = document.getElementById("spFoodID");

    // Part 1: Updating the snake array & Food
    if(isCollide(snakeArr)){
	scoreBox.innerHTML = "Score: 0";
        gameOverSound.play();
        inputDir =  {x: 0, y: 0}; 
        alert("Game Over. You Just Hit Somthing!!!!!! Press 'ENTER' Key Or Click 'OK' To Play Again!");
        snakeArr = [{x: Math.round(c + (d-c)* Math.random()), y: Math.round(c + (d-c)* Math.random())}];
	for(let i = 1; i <= 3; i++){
		snakeArr.push({x: snakeArr[0].x + 0, y: snakeArr[0].y + i});
	}

        score = 0; 
    }

    // If you have eaten the food, increment the score and regenerate the food
    if(snakeArr[0].y == food.y && snakeArr[0].x == food.x){
        foodSound.play();
        score += 1;
        
        let scoreNum =document.getElementById("scoreNum");
        scoreNum.innerHTML = "";
        scoreNum.classList.remove("anime");
        scoreNum.style.left = Math.round(-5 + (70 - (-5))* Math.random()) + "%";
        scoreNum.style.top = Math.round(70* Math.random()) + "%";
        scoreNum.innerHTML = "+1";
        scoreNum.classList.add("anime");
        
        setTimeout(function(){
            
            scoreNum.innerHTML = "";
            scoreNum.classList.remove("anime");
            
        }, 500);
        
        if(score>hiscoreval){
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "HiScore: " + hiscoreval;
        }
        scoreBox.innerHTML = "Score: " + score;

        //snakeArr.push({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
        
        if(inputDir.x == -1){
  
                snakeArr.push({x: snakeArr[snakeArr.length - 1].x + 1, y: snakeArr[snakeArr.length - 1].y + 0});
                
            }
            else if(inputDir.x == 1){
  
                snakeArr.push({x: snakeArr[snakeArr.length - 1].x - 1, y: snakeArr[snakeArr.length - 1].y + 0});
                
            }
            else if(inputDir.y == -1){
  
                snakeArr.push({x: snakeArr[snakeArr.length - 1].x + 0, y: snakeArr[snakeArr.length - 1].y + 1});
                
            }
            else{
                
                snakeArr.push({x: snakeArr[snakeArr.length - 1].x + 0, y: snakeArr[snakeArr.length - 1].y - 1});
                
            }

        for (;;) {

	food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())};

	let isOverlap = 0;
	
	if(spFoodID){
	
	if(spFood.x == food.x && spFood.y == food.y){
	    
	    isOverlap = 1;
	    continue;
	}
	    
	}
	
	for (let i = 0; i < snakeArr.length; i++) {
	
        	if(snakeArr[i].x == food.x && snakeArr[i].y == food.y){

			isOverlap = 1;
			
			break;

        	}
    	}

		if(isOverlap == 0){

			break;

		}

	}

    }

    // changing the co-ords values of the snake
    if(inputDir.x || inputDir.y){
  	for (let i = snakeArr.length - 2; i >= 0; i--) { 
       	 	snakeArr[i+1]= {...snakeArr[i]};
    	}
    }

   //This Will Let The Snake To Move Freely In The PlayGround & Without Hitting Any Wall
   
   if(Difficulty == "hard"){
        snakeArr[0].x += inputDir.x;
        snakeArr[0].y += inputDir.y;
   }
else{
   var xPos = (snakeArr[0].x + inputDir.x) % arr[1];
   var yPos = (snakeArr[0].y + inputDir.y) % arr[0];

   if(!(inputDir.y == 0 && inputDir.x == 0)){

	if(yPos == 0){

		yPos = arr[0];

	}

	if(xPos == 0){

		xPos = arr[1];

	}

   }

    snakeArr[0].x = xPos;
    snakeArr[0].y = yPos;
}


    // Part 2: Display the snake and Food
    
        board.innerHTML = "";
        
        // Display spFood
    
    if(allowed){

        	setTimeout(function(){
	    
	for (;;) {

	spFood = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())};

	let isOverlap = 0;
	/*
	if(spFoodID){
	
	if(spFood.x == food.x && spFood.y == food.y){
	    
	    isOverlap = 1;
	    continue;
	}
    
	}
	*/
	for (let i = 0; i < snakeArr.length; i++) {
	
        	if(snakeArr[i].x == spFood.x && snakeArr[i].y == spFood.y){

			isOverlap = 1;
			
			break;

        	}
    	}

		if(isOverlap == 0){

			break;

		}

	}

    
    allowed = true;
    allowed2 = true;
    allowed3 = true;
    allowed4 = true;
	
	}, (Difficulty == "easy")? 10000: ((Difficulty == "hard")? 15000: 10000));
    
    allowed = false;

    }
    
    
    
    if(allowed2 && allowed4){
        // Display the specialFood
   
        spfoodElement = document.createElement('div');
        spfoodElement.style.gridRowStart = spFood.y;
        spfoodElement.style.gridColumnStart = spFood.x;
        spfoodElement.id = "spFoodID";
        board.appendChild(spfoodElement);
    }
    
    if(spFoodID && allowed3){
        
        setTimeout(function(){
          
            spFood.y = -2;
            spFood.x = -2;
            allowed4 = false;
            
        }, (Difficulty == "easy")? 7000: ((Difficulty == "hard")? 3000: 5000));
        
        allowed3 = false;
    }
    
    // If you have eaten the spfood, increment the score and regenerate the spfood
    if(spFoodID){
    if(snakeArr[0].y == spFood.y && snakeArr[0].x == spFood.x){
        foodSound.play();
        spFood.y = -2;
            spFood.x = -2;
            allowed4 = false;
        score += 10;
        
        let scoreNum =document.getElementById("scoreNum");
        scoreNum.innerHTML = "";
        scoreNum.classList.remove("anime");
        scoreNum.style.left = Math.round(-10 + (40-(-10))* Math.random()) + "%";
        scoreNum.style.top = Math.round(65* Math.random()) + "%";
        scoreNum.style.textShadow = "5px 5px 12px black";
        scoreNum.style.fontSize = "1000%";
        scoreNum.innerHTML = "+10";
        scoreNum.classList.add("anime");
        
        setTimeout(function(){
            
            scoreNum.innerHTML = "";
            scoreNum.style.fontSize = "500%";
            scoreNum.classList.remove("anime");
            scoreNum.style.textShadow = "5px 5px 12px black";
            
        }, 500);
        
        if(score>hiscoreval){
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "HiScore: " + hiscoreval;
        }
        scoreBox.innerHTML = "Score: " + score;
        
        if(Difficulty == "easy"){
        
        for(let i = 1; i <= 5; i++){
            
            //snakeArr.push({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
            
            if(inputDir.x == -1){
  
                snakeArr.push({x: snakeArr[snakeArr.length - 1].x + 1, y: snakeArr[snakeArr.length - 1].y + 0});
                
            }
            else if(inputDir.x == 1){
  
                snakeArr.push({x: snakeArr[snakeArr.length - 1].x - 1, y: snakeArr[snakeArr.length - 1].y + 0});
                
            }
            else if(inputDir.y == -1){
  
                snakeArr.push({x: snakeArr[snakeArr.length - 1].x + 0, y: snakeArr[snakeArr.length - 1].y + 1});
                
            }
            else{
                
                snakeArr.push({x: snakeArr[snakeArr.length - 1].x + 0, y: snakeArr[snakeArr.length - 1].y - 1});
                
            }
            
        }
        
        }
        else{
            for(let i = 1; i <= 3; i++){
            
           if(inputDir.x == -1){
  
                snakeArr.push({x: snakeArr[0].x + inputDir.x + 2, y: snakeArr[0].y + inputDir.y});
                
            }
            else if(inputDir.x == 1){
  
                snakeArr.push({x: snakeArr[0].x + inputDir.x - 2, y: snakeArr[0].y + inputDir.y});
                
            }
            else if(inputDir.y == -1){
  
                snakeArr.push({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y + 2});
                
            }
            else if(inputDir.y == 1){
                
                snakeArr.push({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y - 2});
                
            }
            
        }
        }
     
    }
    }
    
    // Display & moving the snake
    
    snakeArr.forEach((e, index)=>{

        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if(index === 0){
            snakeElement.classList.add('head');
            
        }
        else{
            snakeElement.classList.add('snake');
            if(bgcolor == "#ff0"){
                snakeElement.style.backgroundColor = bgcolor;
                snakeElement.style.boxShadow = "2px 2px 5px .05px #000, inset 1px 4px 10px #0B8A00";
                snakeElement.style.borderRadius = type;
            }
            else{
                snakeElement.style.backgroundColor = bgcolor;
                snakeElement.style.boxShadow = "2px 2px 5px .05px #000, inset 1px 1px 5px black";
                snakeElement.style.borderRadius = type;
            }
        }
        board.appendChild(snakeElement);
    });
    // Display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}


// Main logic starts here

let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "HiScore: " + hiscore;
}

window.requestAnimationFrame(main);

var allowKey = true;

let setTime = (30 / speed) * 30;

window.addEventListener('keydown', e =>{
    
    if(allowKey == true){
        
    allowKey = false;
	setTimeout(function(){ allowKey = true; }, setTime);

    moveSound.play();
    
    switch (e.key) {
        case "ArrowUp":
	    if(inputDir.y == 0){
            inputDir.x = 0;
            inputDir.y = -1;
	    }

            break;

        case "ArrowDown":
	    if(inputDir.y == 0 && !(inputDir.y == 0 && inputDir.x == 0)){
            inputDir.x = 0;
            inputDir.y = 1;
	    }
	 
            break;

        case "ArrowLeft":
	    if(inputDir.x == 0){
            inputDir.x = -1;
            inputDir.y = 0;
	    }

            break;

        case "ArrowRight":
	    if(inputDir.x == 0){
            inputDir.x = 1;
            inputDir.y = 0;
	    }

            break;
        default:
            break;
    }
    
    }

});

var startingX , startingY , movingX , movingY;

window.addEventListener('touchstart', evt =>{

	startingX = evt.touches[0].clientX ;
	startingY = evt.touches[0].clientY ;

});

window.addEventListener('touchmove', evt =>{

	movingX = evt.touches[0].clientX ;
	movingY = evt.touches[0].clientY ;

});

window.addEventListener('touchend', () =>{

	moveSound.play();
	
	if(allowKey == true){
        
    allowKey = false;
	setTimeout(function(){ allowKey = true; }, setTime);

	if(startingX+100 < movingX){
		if(inputDir.x == 0){
            inputDir.x = 1;
            inputDir.y = 0;
	    }
	} 

	else if(startingX-100 > movingX){
		if(inputDir.x == 0){
            inputDir.x = -1;
            inputDir.y = 0;
	    }
	}
					 
	if(startingY+100 < movingY){
		if(inputDir.y == 0 && !(inputDir.y == 0 && inputDir.x == 0)){
            inputDir.x = 0;
            inputDir.y = 1;
	    }
	} 

	else if(startingY-100 > movingY){
		if(inputDir.y == 0){
            inputDir.x = 0;
            inputDir.y = -1;
	    }
	}

	startingX = startingY = movingX = movingY = 0;
	
    }

});