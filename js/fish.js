class Fish extends WaypointMovable {
    constructor(x, y, speed, colors) {
        super(x, y, speed);
        this.colors = colors;
        this.circle_size = random(10, 50);
        this.triangle_base = this.circle_size;
        this.triangle_height = this.circle_size * random(1.5, 3);
        this.triangle_angle = random(PI/16, PI/8);
    }

    resetBodyDimension(newCircleSize) {
        this.circle_size = newCircleSize;
        this.triangle_base = this.circle_size;
        this.triangle_height = this.circle_size * random(1.5, 3);
    }

    display(animate=false) {
        fill(this.colors[0]);
        noStroke();
        beginShape();
        vertex(this.currentPos.x, this.currentPos.y);
        vertex(this.currentPos.x, this.currentPos.y - this.triangle_height);
        if(this.target.x < this.currentPos.x) {
            vertex(this.currentPos.x - (this.circle_size * 0.7), this.currentPos.y);
            endShape();
            gradientTriangleAngle(this.currentPos.x, this.currentPos.y, this.triangle_base, this.triangle_height, this.colors, this.triangle_angle);
            gradientTriangleAngle(this.currentPos.x, this.currentPos.y, this.triangle_base, this.triangle_height, this.colors, -this.triangle_angle);
            gradientCircle(this.currentPos.x, this.currentPos.y, this.circle_size, 1000, this.colors, PI);
        }
        else {
            vertex(this.currentPos.x + (this.circle_size * 0.7), this.currentPos.y);
            endShape();
            gradientTriangleAngle(this.currentPos.x, this.currentPos.y, this.triangle_base, -this.triangle_height, this.colors, this.triangle_angle);
            gradientTriangleAngle(this.currentPos.x, this.currentPos.y, this.triangle_base, -this.triangle_height, this.colors, -this.triangle_angle);
            gradientCircle(this.currentPos.x, this.currentPos.y, this.circle_size, 1000, this.colors, 0);
        }
        fill(255);
        noStroke();
        circle(this.currentPos.x, this.currentPos.y, this.circle_size / 2);
        fill(0);
        circle(this.currentPos.x, this.currentPos.y, this.circle_size / 3);

        if(animate && frameCount % 10 == 0) {
            this.triangle_angle = random(PI/16, PI/8);
        }
    }
}

function makeFish(color_lib, fish_collection) {
    let fishColors = color_lib.getRandomColors(color_lib.candy, 2);
    let wp = [];
    for(let i = 0 ; i < 5; i++) {
        let p = createVector(random(width * 0.1, width * 0.9), random(height * 0.1, height * 0.9));
        wp.push(p);
    } 
    let fish = new Fish(wp[0].x, wp[0].y, 3, fishColors);
    fish.setWaypoints(wp);
    fish.startMoving();
    fish_collection.push(fish);
}

function breedFish(color_lib, fish_collection) {
    let p = random(fish_collection);
    let q = random(fish_collection);

    let wp = [];
    for(let i = 0 ; i < 5; i++) {
        let p = createVector(random(width * 0.1, width * 0.9), random(height * 0.1, height * 0.9));
        wp.push(p);
    } 

    let n = new Fish(wp[0].x, wp[0].y, 3, [p.colors[0], q.colors[1]]);

    let sel = random(1, 100);
    if(sel <= 20) {
        n.colors = color_lib.getRandomColors(color_lib.candy, 2);
    }
    else {
        if(sel % 2 == 0) {
            n.colors = q.colors;
            n.resetBodyDimension(p.circle_size);
        }
        else {
            n.colors = p.colors;
            n.resetBodyDimension(q.circle_size);
        }
    }
    
    n.setWaypoints(wp);
    n.startMoving();
    fish_collection.push(n);
}