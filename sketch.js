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
let timeCountingStart = 10;
let gameplaying;
let isGameOver;

let database;
let submitButton;
let nameInput;

function preload() {
	myFont = loadFont('font2.ttf');
	pop = loadSound('pop.mp3');
}

function setup() {
	createCanvas(600, 400);

	submitButton = select('#btnSubmit');
	submitButton.mousePressed(submitScore);
	nameInput = select('#nameInput');

	newGameBtn = select('#btn');
	setInterval(timeUp, 1000);

	if (bubbles.length === 0) {
		newGameBtn.mousePressed(newGame);
	}

	// Your web app's Firebase configuration
	let config = {
		apiKey: "AIzaSyBs7_R_L5JHy1zDt8vCno1-W7u8Ecra2bs",
		authDomain: "the-bubble-game-b87a4.firebaseapp.com",
		databaseURL: "https://the-bubble-game-b87a4.firebaseio.com",
		projectId: "the-bubble-game-b87a4",
		storageBucket: "the-bubble-game-b87a4.appspot.com",
		messagingSenderId: "741272445239",
		appId: "1:741272445239:web:cb485054595751e5e6fab2",
		measurementId: "G-1HX862FVX7"
	};
	// Initialize Firebase

	firebase.initializeApp(config);
	database = firebase.database();

	let ref = database.ref('scores');
	ref.on('value', gotData, errData);

}

function gotData(data) {
	let scorelistings = selectAll('.scorelisting');
	for (let i = 0; i < scorelistings.length; i++) {
		scorelistings[i].remove();
	}

	//console.log(data.val());
	let scores = data.val();
	let keys = Object.keys(scores);
	//console.log(keys);
	for (let j = 0; j < keys.length; j++) {
		let k = keys[j];
		let name = scores[k].name;
		let score = scores[k].score;
		//console.log(name, score);
		let li = createElement('li', name + ': ' + score);
		li.class('scorelisting');
		li.parent('scorelist');
	}
}

function errData(err) {
	console.log('Error!');
	console.log(err);
}

function submitScore() {

	let data = {
		name: nameInput.value(),
		score: levelNumber
	}
	console.log(data);
	let ref = database.ref('scores');

	ref.push(data);
}

function timeUp() {

	if (timeCounter > 0) {
		timeCounter--;
	}
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
	timeCounter = timeCountingStart;

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

		bubbles[i].speed = 2;
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
	timeCounter = timeCountingStart;
	createBubbles();
	bubbles[i].speed = bubbles[i].speed * 2;

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
