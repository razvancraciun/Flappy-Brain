class NeuralNetwork {
	constructor(inputNodes, hiddenNodes, outputNodes) {
		this.inputNodes = inputNodes;
		this.hiddenNodes = hiddenNodes;
		this.outputNodes = outputNodes;

		this.inputWeights = tf.randomNormal([ this.inputNodes, this.hiddenNodes ]);
		this.outputWeights = tf.randomNormal([ this.hiddenNodes, this.outputNodes ]);
	}

	predict(input) {
		let output;
		tf.tidy(() => {
			//
		});
	}
}
