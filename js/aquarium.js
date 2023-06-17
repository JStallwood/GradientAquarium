let fishes = [];
let waterColors;
let bubbles = [];
let breedButton;
let buttonColors;

function setup() {
    let canvas = createCanvas(1200, 600);
    canvas.parent("game_div");
    
    color_lib = new ColorLibrary();

    for(let i = 0; i < 100; i++) {
        bubbles.push(new Bubble(createVector(random(width), random(height))));
    }

    for(let i = 0; i < 5; i++) {
        makeFish(color_lib, fishes);
    }

    waterColors = [
        color_lib.standard_colors["LIGHT BLUE"],
        color_lib.standard_colors["BLUE"],
        color_lib.standard_colors["DARK BLUE"]
    ];

    setInterval(() => {
        for(let i = 0; i < 10; i++) {
            bubbles.push(new Bubble(createVector(random(width), random(height * 0.8, height))));
        }
    }, 1000);

    buttonColors = color_lib.getRandomColors(color_lib.stripes, 2);
    breedButton = new Button(width - 200, 20, 150, 75);
    breedButton.setButtonText("Make a Baby Fish");
    breedButton.setButtonTextSize(40);
    breedButton.setTextColor(color(255));
    breedButton.setDisplayFunction(() => {
        gradientRectVertical(breedButton.pos.x, breedButton.pos.y, breedButton.dimensions.x, breedButton.dimensions.y, buttonColors, true, 4, buttonColors[1]);
    });
    breedButton.setClickFunction(() => {
        if(fishes.length < 10) {
            breedFish(color_lib, fishes);
        }
        else {
            let out_fish = random(fishes);
            let out_fish_i = fishes.indexOf(out_fish);
            fishes.splice(out_fish_i, 1);
            breedFish(color_lib, fishes);
        }
    });
    
}

function draw() {
    drawTank();

    fishes.forEach(fish => {
        fish.update();
        fish.display(true);
    });

    bubbles.forEach(bubble => {
        bubble.show();
        bubble.update();
    });

    breedButton.show();
}

function drawTank() {
    gradientRectVertical(0, 0, width, height/2, [waterColors[0], waterColors[1]]);
    gradientRectVertical(0, height/2, width, height, [waterColors[1], waterColors[2]]);
    noStroke();
    fill(waterColors[2]);
    rect(0, 0, width/4, height);
    fill(waterColors[0]);
    rect(width - (width/4), 0, width/4, height);
    gradientTrapezoidVertical(width/2, height * 0.9, width, width/4, height/4, [waterColors[2], waterColors[1]]);
}

function mousePressed() {
    breedButton.click();
}


