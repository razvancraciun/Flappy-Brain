let POPSIZE = 250;
let population = [];
let savedPop = [];
let pipes = [];
let counter = 0;
let SPEED = 3;
let generationCount;

function setup() {
	generationCount = 0;
	createCanvas(600, 400);
	tf.setBackend('cpu');
	population = [];
	for (let i = 0; i < POPSIZE; i++) {
		population.push(new Bird());
	}
	pipes = [];
	frameRate(30);
}

function draw() {
	background(color(135, 206, 250));
	pipes.forEach((pipe) => {
		pipe.draw();
	});

	for (let i = population.length - 1; i >= 0; i--) {
		if (population[i].isDead(pipes)) {
			savedPop.push(population.splice(i, 1)[0]);
		}
	}

	population.forEach((bird) => {
		bird.think(pipes);
		bird.draw();
	});

	if (population.length == 0) {
		counter = 0;
		pipes = [];
		nextGeneration();
	}

	if (counter % Math.floor(100 / SPEED) == 0) {
		newPipe();
	}
	counter++;
}

/*
function keyPressed() {
	if (keyCode === 32) {
		bird.up();
	}
} */

let newPipe = () => {
	pipes.push(new Pipe(width, height / 3 + Math.random() * height / 3));
	if (pipes.length >= 3) {
		if (pipes.length > 3) {
			pipes.shift();
		}
	}
};
