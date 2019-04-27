class Pipe {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.width = 75;
		this.height = 300;
		this.gap = 150;
		this.xVel = -7;
	}

	draw() {
		fill(color(0, 200, 0));
		rect(this.x, this.y, this.width, this.height);
		rect(this.x, this.y - this.height - this.gap, this.width, this.height);
	}

	update() {
		this.x += this.xVel;
	}
}
