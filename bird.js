class Bird {
	constructor(brain) {
		this.x = 100;
		this.y = 100;
		this.yVel = 0;
		this.img = birdImg;
		this.width = 30;
		this.height = 30;
		if (brain instanceof NeuralNetwork) {
			this.brain = new NeuralNetwork(brain);
		}
		else {
			this.brain = new NeuralNetwork(4, 6, 1);
		}

		this.score = 0;
		this.fitness = 0;
	}

	draw() {
		fill(0);
		image(this.img, this.x, this.y, this.width, this.height);
	}

	update() {
		this.score++;
		this.y += this.yVel;
		this.yVel += 0.3;
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
		inputs.push(this.yVel / 10);
		inputs.push((nextPipe.y - nextPipe.gap / 2) / height);
		inputs.push((nextPipe.x - (this.x + this.width)) / width);

		if (this.brain.predict(inputs) > 0.5) {
			this.up();
		}
	}

	up() {
		this.yVel = -6;
	}

	mutate(rate) {
		const inputWeights = this.brain.inputWeights.dataSync().slice();
		const outputWeights = this.brain.outputWeights.dataSync().slice();
		const shapeIn = this.brain.inputWeights.shape;
		const shapeOut = this.brain.outputWeights.shape;
		inputWeights.forEach((weight) => {
			if (Math.random() < rate) {
				weight += Math.random() / 5 - 0.1;
			}
		});
		outputWeights.forEach((weight) => {
			if (Math.random() < rate) {
				weight += Math.random() / 5 - 0.1;
			}
		});
		tf.dispose(this.brain.inputWeights);
		tf.dispose(this.brain.outputWeights);
		this.brain.inputWeights = tf.tensor(inputWeights, shapeIn);
		this.brain.outputWeights = tf.tensor(outputWeights, shapeOut);
	}

	forget(rate) {
		const inputWeights = this.brain.inputWeights.dataSync().slice();
		const outputWeights = this.brain.outputWeights.dataSync().slice();
		inputWeights.forEach((weight) => {
			if (Math.random < rate) {
				weight = 0;
			}
		});
		outputWeights.forEach((weight) => {
			if (Math.random < rate) {
				weight = 0;
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
