let POPSIZE = 100;
let population = [];
let savedPop = [];
let pipes = [];
let counter = 0;
let SPEED;
let slider;
let generationCount;
let score;
let birdImg;
let bestScore = 0;

function setup() {
	generationCount = 0;
	createCanvas(600, 400);
	tf.setBackend('cpu');
	birdImg = loadImage('img/bird.png');
	population = [];
	for (let i = 0; i < POPSIZE; i++) {
		population.push(new Bird());
	}
	pipes = [];
	score = -1;
	slider = document.createElement('input');
	slider.id = 'slider';
	slider.type = 'range';
	slider.value = 2;
	slider.min = 1;
	slider.max = 5;
	let label = document.createElement('label');
	label.innerText = 'Speed: ';
	label.for = 'slider';
	SPEED = slider.value;
	slider.onchange = () => {
		SPEED = slider.value;
	};
	let body = document.getElementsByTagName('body')[0];
	body.appendChild(document.createElement('br'));
	body.appendChild(label);
	body.appendChild(document.createElement('br'));
	document.getElementsByTagName('body')[0].appendChild(slider);

	frameRate(30);
}

function draw() {
	background(color(135, 206, 250));
	for (let calc = 0; calc < SPEED; calc++) {
		pipes.forEach((pipe) => {
			pipe.update();
		});

		for (let i = population.length - 1; i >= 0; i--) {
			if (population[i].isDead(pipes)) {
				savedPop.push(population.splice(i, 1)[0]);
			}
		}

		population.forEach((bird) => {
			bird.think(pipes);
			bird.update();
		});

		if (population.length == 0) {
			counter = 0;
			pipes = [];
			nextGeneration();
		}

		if (counter % 50 == 0) {
			newPipe();
		}
		counter++;
	}

	for (bird of population) {
		bird.draw();
	}
	for (pipe of pipes) {
		pipe.draw();
	}

	if (score > bestScore) {
		bestScore = score;
	}

	textSize(15);
	fill(255);
	text('Generation: ' + generationCount, 10, 15);
	text('Best: ' + bestScore, 10, 30);
	text('Score: ' + score, width - 100, 30);
	text('Alive: ' + population.length, width - 100, 15);
}

/*
function keyPressed() {
	if (keyCode === 32) {
		bird.up();
	}
} */

let newPipe = () => {
	score++;
	pipes.push(new Pipe(width, 7 * height / 8 - Math.random() * height / 3));
	if (pipes.length >= 3) {
		if (pipes.length > 3) {
			pipes.shift();
		}
	}
};
