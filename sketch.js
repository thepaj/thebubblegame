let bubbles = [];
let newGameBtn;
let levelNumber;
let level;
let firstScreenText = 'The bubble game';
let name = 'by thepaj';
let myFont;
let bubbleSpeed;
let pop;
let timer;
let timeCounter;
let gameplaying;
let isGameOver;

function preload() {
	myFont = loadFont('font2.ttf');
	pop = loadSound('pop.mp3');
}

function setup() {
	createCanvas(600, 400);
	newGameBtn = select('#btn');
	setInterval(timeUp, 1000);

	if (bubbles.length === 0) {
		newGameBtn.mousePressed(newGame);
	}


}

function timeUp() {

	if (timeCounter > 0) {
		timeCounter--;
	}

	console.log('timeup cALLED');
}

function timerOnScreen() {
	fill(255);
	textSize(30);
	text(timeCounter, width - 40, 40);
}

function newGame() {


	gameplaying = true;
	isGameOver = false;
	// destroy remaining bubbles
	if (bubbles.length > 0) {
		bubbles.splice(0, bubbles.length);
	}

	// set levelNumber and timeCounter
	firstScreenText = '';
	name = '';
	levelNumber = 1;
	timeCounter = 2;

	//bubbles.speed = 2;
	createBubbles();
}

function createBubbles() {
	for (var i = 0; i < levelNumber; i++) {
		bubbles[i] = new Bubble();
	}
}

function draw() {
	background(0);
	firstScreen();
	startGame();

	if (gameplaying) {
		if (timeCounter === 0 && bubbles.length > 0) {
			isGameOver = true;
			gameplaying = false;

		}
	};

	if (isGameOver) {
		bubbles.splice(0, bubbles.length);
		gameOverScreen();
	}


}

function firstScreen() {
	fill('#fabc60');
	textFont(myFont);
	textSize(60);
	text(firstScreenText, 80, 200);
	fill('#3a9679');
	textSize(20);
	text(name, 435, 230);
}

function startGame() {
	for (var i = 0; i < bubbles.length; i++) {
		//		levelCounter();
		//		timerOnScreen();

		bubbles[i].show();
		bubbles[i].move();
		bubbles[i].bounce();

	}
	if (gameplaying) {
		levelCounter();
		timerOnScreen();
	}
}

function levelCounter() {
	level = 'Level ' + levelNumber;
	fill(255);
	textSize(30);
	text(level, 15, 40);

}



function mousePressed() {
	for (var i = bubbles.length - 1; i >= 0; i--) {
		if (bubbles[i].rollover(mouseX, mouseY)) {
			bubbles.splice(i, 1);
			pop.play();
		}
		if (bubbles.length === 0) {
			nextlevel();
		}
	}

}

// + faster
function nextlevel() {
	levelNumber++;
	timeCounter = 2;
	createBubbles();
	//bubbles[i].speed = bubbles[i].speed + 10;
}





function gameOverScreen() {
	//level = '';
	timeCounter = '';
	isGameOver = true;
	let gameOverText = 'Game Over';
	fill(255, 0, 0);
	textFont(myFont);
	textSize(80);
	text(gameOverText, 120, 210);
	//gameplaying = false;

}
