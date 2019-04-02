// the bubble object
class Bubble {
	constructor() {
		this.x = random(10, width - 10);
		this.y = random(10, height - 10);
		this.r = random(40, 50);
		this.rcolor = random(255);
		this.bcolor = random(255);
		this.gcolor = random(255);
		this.speed = 2;
	}
	show() {
		fill(this.gcolor, this.bcolor, this.rcolor);
		ellipse(this.x, this.y, this.r, this.r)
	}
	bounce() {
		if (this.x < 40 || this.x > width - 40) {
			this.speed = this.speed * -1;
		}
		if (this.y < 40 || this.y > height - 40) {
			this.speed = this.speed * -1;
		}
	}
	move() {
		this.x = this.x + random(-this.speed, this.speed);
		this.y = this.y + random(-this.speed, this.speed);
	}
	//	secondMove() {
	//		this.x = this.x + random(-10, 10);
	//		this.y = this.y + random(-10, 10);
	//	}
	rollover(x, y) {
		var d = dist(x, y, this.x, this.y);
		if (d < this.r / 2) {
			return true;
		} else {
			return false;
		}
	}
}