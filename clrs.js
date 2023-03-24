function DynamicPallete(id, selector, colors, c, directions){
    this.stylesheet = make("style#" + id).appendTo($(head));
    this.selector = selector;
    this.colors = colors;
    this.c = c; // current color

    this.buttons = colors.map((col, c) => paletteButton(this, c));
    this.palette = div(".tool", 
                    div("", directions),
                    div(".palette", this.buttons));    
    //let t = div("", make("input.test").handler("stylesheet", stylesheet));
    
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
            $(stylesheet.selector).css("background-color", stylesheet.colors[c]);
        })
        .handler("mouseleave", function(){
            $(stylesheet.selector).attr("style", "");
        })
        .css("background-color", stylesheet.colors[c]);
}