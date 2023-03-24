function DynamicPallete(id, selector, colors, c, directions){
    this.stylesheet = make("style#" + id).appendTo($(head));
    this.selector = selector;
    this.colors = colors;
    this.c = c; // current color

    this.buttons = colors.map((col, c) => paletteButton(this, c));
    this.palette = div(".tool", div("", directions));
        let c = make("div.palette");
    
        for (let n = 0; n < this.buttons.length; n++){
            c.append(button);
            if (n == 7) {c.append("<br>")};
        };
    
        let t = make("div").append(make("input.test").data("stylesheet", stylesheet));
    
        return p.append(c).append(t);
    }
    
    this.changeColor = function(n){
        console.log(n);
        this.stylesheet.html(this.selector + "{background-color:" + colors[n] + ";}");
        this.buttons[this.c].removeClass("sel");
        this.buttons[n].addClass("sel");
        this.c = n;
    }
    this.changeColor(c);
    
    return this.palette;
}

function paletteButton(stylesheet, c){
    return toolButton("", ".palette", 
        function(){
            console.log(stylesheet);
            stylesheet.changeColor(c);
        })
        .handler("mouseover", function(){
            $(stylesheet.selector).css("background-color", COLORS[c]);
        })
        .handler("mouseleave", function(){
            $(stylesheet.selector).attr("style", "");
        })
        .css("background-color", COLORS[c]);
}