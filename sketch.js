//preload 
let myFont;
let bubbleClickSound;

// setup 
let nameInput;

// must-be-global 
let bubbles = [];
let levelNumber;
let timeCounter;
const timeCountingStart = 10;
let nameText = '';
let nameArray = [];

// database 
let database;

// state 
let isGamePlaying = false;
let isGameOver = false;
let showTitleScreen = true;
let leaderboardPressed = false;

function preload() {
	myFont = loadFont('font2.ttf');
	bubbleClickSound = loadSound('pop.mp3');
}

function setup() {
	createCanvas(600, 400);

	const submitButton = select('#btnSubmit');
	submitButton.mousePressed(updateName);
	nameInput = select('#name-input');

	const leaderboardBtn = select('#btn-leaderboard');
	leaderboardBtn.mousePressed(() => {
		if(showTitleScreen)
		{
			leaderboardPressed = true;
			showTitleScreen = false;
		}
	});

	const newGameBtn = select('#btn');
	setInterval(timeUp, 1000);

	if (bubbles.length === 0) {
		newGameBtn.mousePressed(newGame);
	}

	// Your web app's Firebase configuration
	const myApiKey = "AIzaSyBs7_R_L5JHy1zDt8vCno1-W7u8Ecra2bs";
	let config = {
		apiKey: myApiKey,
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
	ref.orderByChild("score").limitToLast(5).on('value', gotData, errData);
}

// database
function gotData(data) {
	let scores = data.val();
	let keys = Object.keys(scores);

	nameArray.splice(0, nameArray.length);
	let namesWithScore = [];

	for (let j = 0; j < keys.length; j++) {
		let k = keys[j];
		let name = scores[k].name;
		let score = scores[k].score;
		namesWithScore.push({
			'name': name,
			'score': score
		})
	}

	namesWithScore.sort( (a, b) => {return b.score - a.score; });
	
	for (let i = 0; i < namesWithScore.length; i++) {
		let scoreText = namesWithScore[i].name + ': ' + namesWithScore[i].score + ' points';
		nameArray.push(scoreText);
	}

}

function errData(err) {
	console.log('Error!');
	console.log(err);
}

function submitScore() {
	let data = {
		name: nameText,
		score: levelNumber
	};

	let query = database.ref('scores').orderByChild('name').equalTo(data.name);

	query.once('value', (existingScoresSnapshot) => {
		const existingScores = existingScoresSnapshot.val();
		if (existingScores) {
			let keys = Object.keys(existingScores);
			if (existingScores[keys[0]].score < data.score) {
				database.ref("scores/" + keys[0]).update({ score: data.score });
			}
		} else {
			database.ref('scores').push(data);
		}
	});
}

// name 
function keyPressed(event) {
	if(keyCode === 13) {
		event.preventDefault();
		updateName();
	}
}

function updateName() {
	nameText = nameInput.value();
}

function nameOnscreen() {
	fill(255);
	textSize(20);
	text(nameText, width / 2 - 10, 40);
}

function draw() {
	// todo disable buttons when they cannot be clicked
	background(0);

	if (showTitleScreen) {
		firstScreen();
	}

	if(leaderboardPressed) {
		leaderboardScreen();
	}

	if (isGamePlaying) {
		drawGame();
		if (timeCounter === 0 && bubbles.length > 0) {
			if (nameText === '') {
				isGameOver = true;
				isGamePlaying = false;
			} else {
				isGameOver = true;
				isGamePlaying = false;
				submitScore();
			}
		}
	};

	if (isGameOver) {
		bubbles.splice(0, bubbles.length);
		gameOverScreen();
	}
}

// first screen
function firstScreen() {
	fill('#fabc60');
	textFont(myFont);
	textSize(60);
	const title = 'The bubble game';
	text(title, 80, 150);

	fill('#3a9679');
	textSize(20);
	const author = 'by paja jureckova';
	text(author, 365, 190);

	fill('#f9f9f9');
	textSize(20);
	const rules = 'Click on a bubble to make it disappear. \n Make sure all the bubbles are gone \n before the time runs out.';
	text(rules, 80, 250);

	nameOnscreen();
}

// time
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


// concerning bubbles
function newGame() {
	showTitleScreen = false;
	isGamePlaying = true;
	isGameOver = false;
	leaderboardPressed = false;

	// destroy if remaining bubbles
	if (bubbles.length > 0) {
		bubbles.splice(0, bubbles.length);
	}

	// set levelNumber and timeCounter
	levelNumber = 1;
	timeCounter = timeCountingStart;

	createBubbles();
}

function createBubbles() {
	for (var i = 0; i < levelNumber; i++) {
		bubbles[i] = new Bubble();
	}
}

function drawGame() {
	for (var i = 0; i < bubbles.length; i++) {
		bubbles[i].speed = 2;
		bubbles[i].show();
		bubbles[i].move();
		bubbles[i].bounce();
	}

	levelCounter();
	timerOnScreen();
	nameOnscreen();
}

function mousePressed() {
	for (var i = bubbles.length - 1; i >= 0; i--) {
		if (bubbles[i].rollover(mouseX, mouseY)) {
			bubbles.splice(i, 1);
			bubbleClickSound.play();
		}
		if (bubbles.length === 0) {
			nextlevel();
		}
	}
}

// levels
function levelCounter() {
	const level = 'Level ' + levelNumber;
	fill(255);
	textSize(30);
	text(level, 15, 40);
}

function nextlevel() {
	levelNumber++;
	timeCounter = timeCountingStart;
	createBubbles();
}

// the end
function gameOverScreen() {
	// todo show score of player
	timeCounter = '';
	isGameOver = true;
	let gameOverText = 'Game Over';
	fill(255, 0, 0);
	textFont(myFont);
	textSize(60);
	text(gameOverText, 120, 150);
	for (let i = 0; i < nameArray.length; i++) {
		let size = 15;
		let yDir = 200 + size * i;
		fill('#fff');
		textSize(size);
		text(nameArray[i], 120, yDir);
	}
}

function leaderboardScreen() {
	leaderboardPressed = true;
	let leaderboardText = 'Leaderboard'
	fill('#3a9679');
	textFont(myFont);
	textSize(60);
	text(leaderboardText, 120, 150);
	fill(255, 0, 0);
	textFont(myFont);
	textSize(60);
	for (let i = 0; i < nameArray.length; i++) {
		let size = 15;
		let yDir = 200 + size * i;
		fill('#fff');
		textSize(size);
		text(nameArray[i], 120, yDir);
	}
}


