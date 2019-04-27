class NeuralNetwork {
	constructor(inputNodes, hiddenNodes, outputNodes) {
		if (inputNodes instanceof NeuralNetwork) {
			this.inputNodes = inputNodes.inputNodes;
			this.hiddenNodes = inputNodes.hiddenNodes;
			this.outputNodes = inputNodes.outputNodes;

			this.inputWeights = tf.clone(inputNodes.inputWeights);
			this.outputWeights = tf.clone(inputNodes.outputWeights);
		}
		else {
			this.inputNodes = inputNodes;
			this.hiddenNodes = hiddenNodes;
			this.outputNodes = outputNodes;

			this.inputWeights = tf.randomNormal([ this.inputNodes, this.hiddenNodes ]);
			this.outputWeights = tf.randomNormal([ this.hiddenNodes, this.outputNodes ]);
		}
	}

	predict(input) {
		let output;
		tf.tidy(() => {
			let inputLayer = tf.tensor(input, [ 1, this.inputNodes ]);
			let hiddenLayer = inputLayer.matMul(this.inputWeights).tanh();
			let outputLayer = hiddenLayer.matMul(this.outputWeights).tanh();
			output = outputLayer.dataSync()[0];
		});
		return output;
	}

	clone() {
		let other = new NeuralNetwork(this.inputNodes, this.hiddenNodes, this.outputNodes);
		other.clear();
		other.inputWeights = tf.clone(this.inputWeights);
		other.outputWeights = tf.clone(this.outputWeights);
		return other;
	}

	clear() {
		tf.dispose(this.inputWeights);
		tf.dispose(this.outputWeights);
	}
}
