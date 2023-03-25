function colorPicker(){
    let div = make("div.tool.colorPicker")
            .append(demoTable())
            .append(colors());
    return div;
}

function demoTable(){
    let demo = make("div.demo").append(make("div#selectedRow"));
     //.append(make("div").html("Click here to change colors:"));

    let [table, tbody, tr] = make("table#demo.lineup");


    tr.addClass("headers").addTH("Table Header").addTH("IM");

    
    tbody.addTR("events").addTD("Event #s").addTD("#");
    [["Odd Rows", "odds"], ["Even Rows", "evens"], ["Alternate Odd Rows", "alts"]].forEach(row =>{
        tbody.addTR(row[1]).addTD(row[0]).addTD(BOLT);
    });

    return demo.append(table);
}

function colors() {
    //const COLORS = ['#f66', '#fc8', '#fe8', '#be8', '#6d9', '#9ee', '#def', '#a8e', '#f9e', '#000', '#fff', '#f23', '#fa0', '#ff0', '#bf0', '#7c0', '#8ff', '#6af', '#a2c', '#f4f', '#ddd', '#999'];
    let c = make("div.tool");

    c.append(palette("Choose your background color:", "background"));
    c.append(palette("Choose your text color:", "color"));
    
    return c;
}

function palette(directions, attr){
    let p = make("div.palette").append(make("div.#dir_" + attr).html(directions));
    let c = make("div.palette");

    COLORS.forEach((color, n) => {
        let button = paletteButton(color, attr, n);
        c.append(button);
        if (n == 10) {c.append("<br>")};
    });
    return p.append(c);
}

function paletteButton(color, attr, n){
    let button = make("button.tools.palette").css("background-color", "#" + color).html(n);
    button.data("color", color).data("attr", attr)
        .data("handler", changeStyle);
    return button;
}

function changeStyle(){
    const button = this;
    let el = "#" + $("#selectedRow").html();

    console.log(55, $("#headers"), $(el));
    const color = button.data("color");
    const attr = button.data("attr");

    const regEx = new RegExp(`${attr}:\\s*#([a-fA-F0-9]{3,6});`);

    let oldStyle =  $(el).html();

    console.log(oldStyle);

    // Replace each match with the new background and color values
    let newStyle = oldStyle.replace(regEx, `${attr}:#${color};`);
    $(el).html(newStyle);

    //let style = $("#" + el).html();
    console.log("new", newStyle);
}




function DynamicTool(html, css, func, directions=""){
    this.button = dynamicTool(this, css).html(html)
        .bind("click", func);
    return tool(this.button);
}

function dynamicTool(parent, selector, css="", ...args){
    return make(selector + css).store(parent, selector, args);
}

$.fn.bind = function(ev, func, css=""){
    let tool = $(this);
    let [parent, selector, args] = tool.read();
    parent[ev] = function(args){
        return func(parent, args);
    }
    if (HANDLERS.indexOf(ev + selector + css) == -1){
        HANDLERS.push(ev + selector + css);
        console.log(HANDLERS);
        $("#tools").on(ev, selector + css, function(e) {
            e.stopImmediatePropagation();
            let [parent, selector, ...args] = $(this).read();
            parent[ev](args);
        });
    }
    return tool;
}
