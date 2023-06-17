class WaypointMovable {
    constructor(startX, startY, speed) {
        this.currentPos = createVector(startX, startY);
        this.waypointMovement = true;
        this.waypointCounter = 0;
        this.moveCounter = 0;
        this.speed = map(speed, 0, 10000, 0, 1, true);
        this.moving = false;
        this.target;
        this.option = "LOOP";
    }

    setWaypoints(points) {
        this.waypoints = points;
    }

    setMovementOption(option) {
        this.option = option;
    }

    moveReset() {
        if(this.option != null) {
            switch(this.option) {
                case "REVERSE":
                    this.waypoints.reverse();
                    this.waypointCounter = 0;
                    this.moveCounter = 0;
                    this.target = this.waypoints[this.waypointCounter];
                    this.moving = true;
                    break;
                case "SINGLE":
                    this.waypointCounter = 0;
                    this.moveCounter = 0;
                default:
                    this.waypointCounter = 0;
                    this.moveCounter = 0;
                    this.target = this.waypoints[this.waypointCounter];
                    this.moving = true;
                    break;
            }
        }
    }

    showSelf() {
        fill(0, 255, 255);
        noStroke();
        circle(this.currentPos.x, this.currentPos.y, 30);
    }

    showWaypoints() {
        fill(255, 0, 255);
        noStroke();
        this.waypoints.forEach(w => {
            circle(w.x, w.y, 10);
        });
    }

    startMoving() {
        this.target = this.waypoints[this.waypointCounter];
        this.moving = true;
    }

    update() {
        if(this.moving) {
            let u = this.currentPos.copy();
            let v = u.lerp(this.target, this.moveCounter);
            this.currentPos = v;
            this.moveCounter+= this.speed;
            if(dist(this.currentPos.x, this.currentPos.y, this.target.x, this.target.y) <= 0.1) {
                this.currentPos = this.target;
                this.waypointCounter += 1;
                this.moveCounter = 0;
            }
            if(this.waypointCounter > this.waypoints.length - 1) {
                this.moving = false;
            }
            else {
                this.target = this.waypoints[this.waypointCounter];
            }
        }
        else {
            this.moveReset();
        }
    }
}