class Bubble {
    constructor(v) {
        this.pos = v;
        this.size = random(5, 10);
    }

    show() {
        stroke(255, 128);
        strokeWeight(2);
        noFill();
        circle(this.pos.x, this.pos.y, this.size);
    }

    update() {
        this.pos.add(
            random(-2, 2),
            -(10 / this.size)
        );

        if(this.pos.y < 0) {
            let index = bubbles.indexOf(this);
            bubbles.splice(index, 1);
        }
    }
}