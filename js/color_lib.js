function ColorLibrary() {
    this.standard_colors = {
        "DARK RED" : color(128, 0, 32),
        "RED" : color(210, 4, 45),
        "LIGHT RED" : color(255, 36, 0),
        "DARK ORANGE" : color(204, 85, 0),
        "ORANGE" : color(242, 140, 40),
        "LIGHT ORANGE" : color(255, 170, 51),
        "DARK YELLOW" : color(255, 192, 0),
        "YELLOW" : color(255, 215, 0),
        "LIGHT YELLOW" : color(252, 245, 95),
        "DARK GREEN" : color(53, 94, 59),
        "GREEN" : color(34, 139, 34),
        "LIGHT GREEN" : color(50, 205, 50),
        "DARK BLUE" : color(0, 71, 171),
        "BLUE" : color(0, 150, 255),
        "LIGHT BLUE" : color(135, 206, 235),
        "DARK PURPLE" : color(128, 0, 128),
        "PURPLE" : color(218, 112, 214),
        "LIGHT PURPLE" : color(248, 200, 220),
        "DARK BROWN" : color(110, 38, 14),
        "BROWN" : color(184, 115, 51),
        "LIGHT BROWN" : color(218, 160, 109),
        "DARK PINK" : color(227, 115, 131),
        "PINK" : color(255, 192, 203),
        "LIGHT PINK" : color(255, 182, 193),
        "DARK GRAY" : color(52),
        "GRAY" : color(120),
        "LIGHT GRAY" : color(200),
        "BLACK" : color(0),
        "WHITE" : color(255)
    };

    this.rainbow = {
        "RED" : color(210, 4, 45),
        "ORANGE" : color(242, 140, 40),
        "YELLOW" : color(255, 215, 0),
        "GREEN" : color(34, 139, 34),
        "BLUE" : color(0, 150, 255),
        "DARK BLUE" : color(0, 71, 171),
        "PURPLE" : color(218, 112, 214),
    };

    this.candy = {
        "ONE" : color("#2DDFFF"),
        "TWO" : color("#F5F474"),
        "THREE" : color("#E33CC7"),
        "FOUR" : color("#FFAA47"),
        "FIVE" : color("#F54D28")
    };

    this.stripes = {
        "ONE" : color("#FC3982"),
        "TWO" : color("#FDA6DB"),
        "THREE" : color("#EFEFEF"),
        "FOUR" : color("#53ADF3"),
        "FIVE" : color("#257EDC")
    };

    this.ice_cream = {
        "ONE" : color("#D4ABC5"),
        "TWO" : color("#EBB5C7"),
        "THREE" : color("#F2D6B6"),
        "FOUR" : color("#E8CAB0"),
        "FIVE" : color("#E2BA97"),
        "SIX" : color("#D1A38C")
    };

    this.getRandomColors = function(color_set, number) {
        let chosen = [];
        let keys = Object.keys(color_set);
        for(let i = 0; i < number; i++) {
            let choice = Math.floor(Math.random() * keys.length);
            chosen.push(
                color_set[keys[choice]]
            );
        }

        let set_of_chosen = new Set(chosen);
        if(set_of_chosen.size == number) {
            return chosen;
        }
        else {
            return this.getRandomColors(color_set, number);
        }
        
    };

}
