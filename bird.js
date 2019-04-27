class Bird {
	constructor(brain) {
		this.x = 100;
		this.y = 100;
		this.yVel = 0;
		this.img = loadImage('img/bird.png');
		this.width = 30;
		this.height = 30;
		if (brain instanceof NeuralNetwork) {
			this.brain = new NeuralNetwork(brain);
		}
		else {
			this.brain = new NeuralNetwork(4, 4, 1);
		}

		this.score = 0;
		this.fitness = 0;
	}

	draw() {
		fill(0);
		image(this.img, this.x, this.y, this.width, this.height);
		this.update();
	}

	update() {
		this.score++;
		this.y += this.yVel;
		this.yVel += 0.2 * SPEED;
	}

	think(pipes) {
		let nextPipe = null;
		for (let i = 0; i < pipes.length; i++) {
			if (pipes[i].x > this.x + this.width) {
				nextPipe = pipes[i];
				break;
			}
		}

		if (nextPipe == null) {
			return;
		}
		let inputs = [];
		inputs.push(this.y / height);
		inputs.push(nextPipe.y / height);
		inputs.push((nextPipe.x - (this.x + this.width)) / width);
		inputs.push((nextPipe.y - nextPipe.gap) / height);

		if (this.brain.predict(inputs) > 0.5) {
			this.up();
		}
	}

	up() {
		this.yVel = -7.5;
	}

	mutate(rate) {
		const inputWeights = this.brain.inputWeights.dataSync();
		const outputWeights = this.brain.outputWeights.dataSync();
		const shapeIn = this.brain.inputWeights.shape;
		const shapeOut = this.brain.outputWeights.shape;
		inputWeights.forEach((weight) => {
			if (Math.random() < rate) {
				weight = Math.random() - 0.5;
			}
		});
		outputWeights.forEach((weight) => {
			if (Math.random() < rate) {
				weight += Math.random() - 0.5;
			}
		});
		tf.dispose(this.brain.inputWeights);
		tf.dispose(this.brain.outputWeights);
		this.brain.inputWeights = tf.tensor(inputWeights, shapeIn);
		this.brain.outputWeights = tf.tensor(outputWeights, shapeOut);
	}

	isDead(pipes) {
		if (this.y < 0) {
			return true;
		}
		if (this.y > height - this.width) {
			return true;
		}
		let flag = false;
		pipes.forEach((pipe) => {
			if (this.touchesPipe(pipe)) {
				flag = true;
			}
		});
		return flag;
	}

	touchesPipe(pipe) {
		if (
			this.x + this.width > pipe.x &&
			this.x < pipe.x + pipe.width &&
			(this.y + this.height > pipe.y || this.y < pipe.y - pipe.gap)
		) {
			return true;
		}
		return false;
	}
}
