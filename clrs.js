function colorPicker() {
    //const COLORS = ['#f66', '#fc8', '#fe8', '#be8', '#6d9', '#9ee', '#def', '#a8e', '#f9e', '#000', '#fff', '#f23', '#fa0', '#ff0', '#bf0', '#7c0', '#8ff', '#6af', '#a2c', '#f4f', '#ddd', '#999'];
    return make("div")
            .append(palette("Choose your table header color:", new DynamicStyleSheet("header", "table.lineup tr:nth-child(1)", 5)))
            .append(palette("Choose your row color:", new DynamicStyleSheet("row", "tr:nth-child(odd)", 13)));
}

function DynamicStyleSheet(id, selector, colors){
    this.stylesheet = make("style#" + id).appendTo($(head));
    this.id = id;
    this.selector = selector;

    this.buttons = COLORS.map(c => paletteButton(this, n));
    console.log(buttons);
    
    this.changeColor = function(c){
        this.stylesheet.html(this.selector + "{background-color:" + c + ";}");
    }
    this.changeColor(COLORS[color]);
    
    return this;
}

function palette(directions, stylesheet){
    let p = make("div.tool").append(make("div").html(directions));
    let c = make("div.palette");

    for (let n = 0; n < COLORS.length; n++){
        let button = paletteButton(stylesheet, n);
        c.append(button);
        if (n == 7) {c.append("<br>")};
    };

    let t = make("div").append(make("input.test").data("stylesheet", stylesheet));

    return p.append(c).append(t);
}

function paletteButton(stylesheet, n){
    let button = toolButton("", ".palette", 
        function(){
            stylesheet.changeColor(n);
            $(this).addClass("sel");
        });
    return button
        .handler("mouseover", function(){
            $(stylesheet.selector).css("background-color", COLORS[n]);
        })
        .handler("mouseleave", function(){
            $(stylesheet.selector).attr("style", "");
        })
        .css("background-color", COLORS[n]);
}