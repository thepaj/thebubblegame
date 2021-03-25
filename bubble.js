// the bubble object
class Bubble {
	constructor() {
		this.r = random(40, 50);
		this.x = random(this.r, width - this.r);
		this.y = random(this.r, height - this.r);
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
		if (this.x < this.r || this.x > width - this.r) {
			this.speed = this.speed * -1;
		}
		if (this.y < this.r || this.y > height - this.r) {
			this.speed = this.speed * -1;
		}
	}
	move() {
		this.x = this.x + random(-this.speed, this.speed);
		this.y = this.y + random(-this.speed, this.speed);
	}
	rollover(x, y) {
		var d = dist(x, y, this.x, this.y);
		if (d < this.r / 2) {
			return true;
		} else {
			return false;
		}
	}
}