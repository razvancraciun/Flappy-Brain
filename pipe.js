class Pipe {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.width = 90;
		this.height = 1000;
		this.gap = 200;
		this.xVel = -3;
	}

	draw() {
		fill(color(0, 200, 0));
		rect(this.x, this.y, this.width, this.height);
		rect(this.x, this.y - this.height - this.gap, this.width, this.height);
		this.update();
	}

	update() {
		this.x += this.xVel;
	}
}
