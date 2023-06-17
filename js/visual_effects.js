function gradientRectHorizontal(x, y, w, h, colors, outline=false, outline_size=0, outline_color=colors[2]) {
    let start = x;
    let end = x + w;
    let top = y;
    let bottom = y + h;

    for(let i = start; i <= end; i++) {
        let increment = map(i, start, end, 0, 1);
        let col = lerpColor(colors[0], colors[1], increment);
        stroke(col);
        strokeWeight(1);
        line(i, top, i, bottom);
    }

    if(outline) {
        strokeWeight(outline_size);
        stroke(outline_color);
        noFill();
        rect(x, y, w, h);
    }
}

function gradientTrapezoidVertical(x, y, w1, w2, h, colors) {
    let start = y;
    let end = y + h;
    
    for(let i = start; i <= end; i++) {
        let line_width;
        if(w1 > w2) {
            line_width = map(i, start, end, w2, w1);
        } 
        else {
            line_width = map(i, start, end, w1, w2);
        }

        let lerp_inc = map(i, start, end, 0, 1);
        let col = lerpColor(colors[0], colors[1], lerp_inc);

        stroke(col);
        strokeWeight(1);
        push();
        translate(w1/2, i);
        line(0, 0, -line_width, 0);
        line(0, 0, line_width, 0);
        pop();
    }
}

function gradientRectVertical(x, y, w, h, colors, outline=false, outline_size=0, outline_color=colors[2]) {
    let start = y;
    let end = y + h;
    let left = x;
    let right = x + w;

    for(let i = start; i <= end; i++) {
        let increment = map(i, start, end, 0, 1);
        let col = lerpColor(colors[0], colors[1], increment);
        stroke(col);
        strokeWeight(1);
        line(left, i, right, i);
    }

    if(outline) {
        strokeWeight(outline_size);
        stroke(outline_color);
        noFill();
        rect(x, y, w, h);
    }
}

function gradientCircle(x, y, circle_size, quotient, colors, angle_shift=0) {
    let increment = TWO_PI / quotient;

    for(let i = 0; i <= TWO_PI; i += increment) {
        let lerp_inc = map(i, 0, TWO_PI, 0, 1);
        let col = lerpColor(colors[0], colors[1], lerp_inc);
        stroke(col);
        strokeWeight(1);
        line(
                x,
                y,
                x + circle_size * Math.cos(i + angle_shift),
                y + circle_size * Math.sin(i + angle_shift)
        );
    }
}

function gradientTriangleSide(x, y, b, h, colors) {
    let start = x;
    let end = x + h;
    if(start < end) {
        for(let i = start; i <= end; i++) {
            let lerpInc = map(i, start, end, 0, 1);
            let col = lerpColor(colors[0], colors[1], lerpInc);
            let top = y - ((b / 2) * (1 - lerpInc));
            let bottom = y + ((b / 2) * (1 - lerpInc));
            strokeWeight(1);
            stroke(col);
            line(i, top, i, bottom);
        }
    }
    else {
        for(let i = start; i >= end; i--) {
            let lerpInc = map(i, start, end, 0, 1);
            let col = lerpColor(colors[0], colors[1], lerpInc);
            let top = y - ((b / 2) * (1 - lerpInc));
            let bottom = y + ((b / 2) * (1 - lerpInc));
            strokeWeight(1);
            stroke(col);
            line(i, top, i, bottom);
        }
    }
}

function gradientTriangleAngle(x, y, b, h, colors, angle) {
    push();
    translate(x, y);
    rotate(angle);
    gradientTriangleSide(0, 0, b, h, colors);
    pop();
}