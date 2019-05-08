let nextGeneration = () => {
	calculateFitness();

	// console.log('before: ' + tf.memory().numTensors);
	for (let i = 0; i < POPSIZE - 1; i++) {
		population.push(pickOneT());
		population[i].score = 0;
	}

	for (let i = 1; i < POPSIZE - 1; i += 2) {
		if (Math.random() < 0.6) {
			cross(population[i], population[i - 1]);
		}
	}

	for (bird of population) {
		if (Math.random < 0.1) {
			bird.forget(0.5);
		}
	}

	for (bird of population) {
		bird.mutate(0.1);
	}

	pushBest();

	for (bird of savedPop) {
		bird.brain.clear();
	}
	savedPop = [];
	generationCount++;
	score = -1;
};

let pickOne = () => {
	//roulette
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

let pickOneT = () => {
	//Tournament
	let first = Math.floor(Math.random() * savedPop.length);
	let second = Math.floor(Math.random() * savedPop.length);
	//let third = Math.floor(Math.random())
	if (first.fitness > second.fitness) {
		return new Bird(first.brain);
	}
	else return new Bird(second.brain);
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
	let firstInput = first.brain.inputWeights.dataSync().slice();
	let firstOutput = first.brain.outputWeights.dataSync().slice();
	let secondInput = second.brain.inputWeights.dataSync().slice();
	let secondOutput = second.brain.outputWeights.dataSync().slice();
	let firstInShape = first.brain.inputWeights.shape;
	let firstOutShape = first.brain.outputWeights.shape;
	let secondInShape = second.brain.inputWeights.shape;
	let secondOutShape = second.brain.outputWeights.shape;

	let firstInputResult = [];
	let secondInputResult = [];

	//TODO in this for loops
	for (let i = 0; i < Math.floor(firstInput.length / 3); i++) {
		firstInputResult.push(firstInput[i]);
		secondInputResult.push(secondInput[i]);
	}
	for (let i = Math.floor(firstInput.length / 3); i < Math.floor(2 * firstInput.length / 3); i++) {
		firstInputResult.push(secondInput[i]);
		secondInputResult.push(firstInput[i]);
	}
	for (let i = Math.floor(2 * firstInput.length / 3); i < firstInput.length; i++) {
		firstInputResult.push(firstInput[i]);
		secondInputResult.push(secondInput[i]);
	}

	let firstOutputResult = [];
	let secondOutputResult = [];

	//TODO in this for loops
	for (let i = 0; i < Math.floor(firstOutput.length / 3); i++) {
		firstOutputResult.push(firstOutput[i]);
		secondOutputResult.push(secondOutput[i]);
	}
	for (let i = Math.floor(firstOutput.length / 3); i < Math.floor(2 * firstOutput.length / 3); i++) {
		firstOutputResult.push(secondOutput[i]);
		secondOutputResult.push(firstOutput[i]);
	}
	for (let i = Math.floor(2 * firstOutput.length / 3); i < firstOutput.length; i++) {
		firstOutputResult.push(firstOutput[i]);
		secondOutputResult.push(secondOutput[i]);
	}

	first.brain.clear();
	second.brain.clear();

	first.brain.inputWeights = tf.tensor(firstInputResult, firstInShape);
	first.brain.outputWeights = tf.tensor(firstOutputResult, firstOutShape);

	second.brain.inputWeights = tf.tensor(secondInputResult, secondInShape);
	second.brain.outputWeights = tf.tensor(secondOutputResult, secondOutShape);
};

let pushBest = () => {
	let max = 0;
	let pick;
	for (bird of savedPop) {
		if (bird.fitness > max) {
			max = bird.fitness;
			pick = bird;
		}
	}

	population.push(new Bird(pick.brain));
};
