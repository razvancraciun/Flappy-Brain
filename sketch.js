let bird;
let pipes = [];
let score = 0;
let pipesCreator;
function setup() {
	createCanvas(800, 600);
	bird = new Bird(100, 100);
	pipes = [];
	clearInterval(pipesCreator);
	pipesCreator = setInterval(newPipe, 2000);
	score = 0;
}

function draw() {
	background(color(135, 206, 250));

	bird.draw();

	pipes.forEach((pipe) => {
		pipe.draw();
	});

	if (bird.isDead(pipes)) {
		setup();
	}

	loadPixels();
	console.log(pixels);
	noLoop();
	fill(0);
	textSize(30);
	text('Score: ' + score, 10, 40);
}

function keyPressed() {
	if (keyCode === 32) {
		bird.up();
	}
}

let newPipe = () => {
	pipes.push(new Pipe(width, height / 3 + Math.random() * height / 3));
	if (pipes.length >= 3) {
		score++;
		if (pipes.length > 3) {
			pipes.shift();
		}
	}
};
