let nextGeneration = () => {
	calculateFitness();

	let max = 0;
	let pick;
	for (bird of savedPop) {
		if (bird.fitness > max) {
			max = bird.fitness;
			pick = bird;
		}
	}

	population.push(new Bird(pick.brain));

	// console.log('before: ' + tf.memory().numTensors);
	for (let i = 0; i < POPSIZE - 1; i++) {
		population.push(pickOne());
		population[i].score = 0;
	}

	// for (let i = 1; i < POPSIZE; i += 2) {
	// 	if (Math.random() < 0.1) {
	// 		cross(population[i], population[i - 1]);
	// 	}
	// }

	for (bird of population) {
		bird.mutate(0.1);
	}

	for (bird of savedPop) {
		bird.brain.clear();
	}
	savedPop = [];
	// console.log('after: ' + tf.memory().numTensors);
};

let pickOne = () => {
	let chance = Math.random();
	let sum = 0;
	for (bird of savedPop) {
		sum += bird.fitness;
		if (sum > chance) {
			let result = new Bird(bird.brain);
			return result;
		}
	}
};

let calculateFitness = () => {
	let sum = 0;
	for (let bird of savedPop) {
		sum += bird.score;
	}
	for (let bird of savedPop) {
		bird.fitness = bird.score / sum;
	}
};

let cross = (first, second) => {
	let firstInput = first.brain.inputWeights.dataSync();
	let firstOutput = first.brain.outputWeights.dataSync();
	let secondInput = second.brain.inputWeights.dataSync();
	let secondOutput = second.brain.outputWeights.dataSync();
	let firstInShape = first.brain.inputWeights.shape;
	let firstOutShape = first.brain.outputWeights.shape;
	let secondInShape = second.brain.inputWeights.shape;
	let secondOutShape = second.brain.outputWeights.shape;

	for (let i = 0; i < firstInput.length; i++) {
		if (i % 2 == 0) {
			temp = firstInput[i];
			firstInput[i] = secondInput[i];
			secondInput[i] = temp[i];
		}
	}

	for (let i = 0; i < firstOutput.length; i++) {
		if (i % 2 == 0) {
			temp = firstOutput[i];
			firstOutput[i] = secondOutput[i];
			secondOutput[i] = temp[i];
		}
	}

	first.brain.clear();
	second.brain.clear();

	first.brain.inputWeights = tf.tensor(firstInput, firstInShape);
	first.brain.outputWeights = tf.tensor(firstOutput, firstOutShape);

	second.brain.inputWeights = tf.tensor(secondInput, secondInShape);
	second.brain.outputWeights = tf.tensor(secondOutput, secondOutShape);
};
