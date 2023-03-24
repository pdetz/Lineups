function DynamicPallete(id, selector, colors, c, directions){
    this.stylesheet = make("style#" + id).appendTo($(head));
    this.selector = selector;
    this.colors = colors;
    this.c = c; // current color

    this.newPaletteButton = new Bind("mouseover", "button.tools", ".palette", function(parent, n){
        parent.stylesheet.html(parent.selector + "{background-color:" + parent.colors[n] + ";}");
    }, parent, c);

    this.buttons = this.colors.map((col, c) => this.newPaletteButton(this, c)
                .css("background-color", this.colors[c]));
    this.palette = tool(this.buttons, directions, ".palette");    
    //let t = div("", make("input.test").handler("stylesheet", stylesheet));
    

    this["click"] = function(n){
        this["mouseover"](n);
        this.buttons[this.c].removeClass("sel");
        this.buttons[n].addClass("sel");
        this.c = n;
    }
    this["mouseover"] = function(n){
        
    }
    this["mouseleave"] = function(){
        this.stylesheet.html(this.selector + "{background-color:" + this.colors[this.c] + ";}");
    }
    this["click"](c);
    return this.palette;
}

function paletteButton(stylesheet, c){
    return toolButton(stylesheet, "", ".palette", c) //, function(){  stylesheet.changeColor(c) })
        .handler2("mouseover", "button.palette")
        .handler2("mouseleave", "button.palette")
}