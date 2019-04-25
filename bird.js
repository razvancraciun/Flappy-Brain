class Bird {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.yVel = 0;
		this.img = loadImage('img/bird.png');
		this.width = 40;
		this.height = 40;
	}

	draw() {
		bird.update();
		fill(0);
		image(this.img, this.x, this.y, this.width, this.height);
	}

	update() {
		this.y += this.yVel;
		this.yVel += 0.3;
	}

	up() {
		this.yVel = -10;
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
