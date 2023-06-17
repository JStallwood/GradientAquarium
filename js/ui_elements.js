class Clickables {
    constructor() {
        this.clickables = [];
    }

    add(obj) {
        if(obj instanceof Clickable) {
            this.clickables.push(obj);
        }
    }

    show() {
        this.clickables.forEach(c => {
            c.show();
        });
    }

    updateClicks() {
        this.clickables.forEach(c => {
            c.click();
        });
    }

    updateSwitches() {
        this.clickables.forEach(c => {
            c.switch();
        });
    }

    updateHeld() {
        this.clickables.forEach(c => {
            c.hold();
        });
    }
}

class Clickable {

    constructor(x, y, w, h, ) {
        this.pos = createVector(x, y);
        this.dimensions = createVector(w, h);
        this.click_function;
        this.held_function;
        this.display_function;
        this.switch_bool = false;
        this.switch_function;
    }

    show(show_rect=false) {
        if(show_rect) {
            stroke(255, 0, 255);
            strokeWeight(2);
            noFill();
            rect(this.pos.x, this.pos.y, this.dimensions.x, this.dimensions.y);
        }
    }

    click() {
        if(
            mouseX >= this.pos.x && 
            mouseX <= this.pos.x + this.dimensions.x &&
            mouseY >= this.pos.y &&
            mouseY <= this.pos.y + this.dimensions.y &&
            this.click_function != null
          ) {
            this.click_function();
          }
    }

    hold() {
        if(
            mouseX >= this.pos.x && 
            mouseX <= this.pos.x + this.dimensions.x &&
            mouseY >= this.pos.y &&
            mouseY <= this.pos.y + this.dimensions.y &&
            this.held_function != null
          ) {
            this.held_function();
          }
    }

    switch() {
        if(this.switch_bool) {
            if(
                mouseX >= this.pos.x && 
                mouseX <= this.pos.x + this.dimensions.x &&
                mouseY >= this.pos.y &&
                mouseY <= this.pos.y + this.dimensions.y &&
                this.switch_function != null
              ) {
                this.switch_function();
              }
        }
    }

    setClickFunction(function_delegate) {
        this.click_function = function_delegate;
    }

    setSwitchFunction(function_delegate) {
        this.switch_bool = true;
        this.switch_function = function_delegate;
    }

    setHeldFunction(function_delegate) {
        this.held_function = function_delegate;
    }

    setDisplayFunction(function_delegate) {
        this.display_function = function_delegate;
    }

}

class Button extends Clickable {
    constructor(x, y, w, h) {
        super(x, y, w, h);
        this.button_text = "";
    }

    show(show_rect) {
        super.show(show_rect);
        if(this.display_function != null) {
            this.display_function();
        }
        this.displayText();
    }

    displayText() {
        fill(this.text_fill);
        noStroke();
        textSize(this.text_size);
        textAlign(CENTER);
        text(
                this.button_text,
                this.pos.x + (this.dimensions.x / 2),
                this.pos.y + (this.dimensions.y / 2)
            );
    }

    setButtonTextSize(text_size) {
        textSize(text_size);
        let default_width = textWidth(this.button_text);

        if(default_width > (this.dimensions.x * 0.8)) {
            let adjustedTextSize = 0;
            for(let i = 0; i <= height; i++) {
                textSize(i);
                let text_width = textWidth(this.button_text);
                if(text_width > (this.dimensions.x * 0.8)) {
                    adjustedTextSize = i - 1;
                    break;
                }
            }
            this.text_size = adjustedTextSize;
        }
        else {
            this.text_size = text_size;
        }
    }

    setButtonText(button_text) {
        this.button_text = button_text;
    }

    setTextColor(text_color) {
        this.text_fill = text_color;
    }

}