function dynamicPalette(sheet, selector, colors, c, directions){
    
    const cssRules = (selector, color) => selector + "{background-color:" + color + "}";
    clr = (btn) => $(btn).css("background-color");

    make("style"+sheet).appendTo($(head)).html(cssRules(selector, colors[c]));

    let buttons = "button.palette";

    return tool(colors.map(col => make(buttons).css("background-color", col)), directions, ".palette")
    .on("mouseover", buttons, (e) => $(selector).css("background-color", clr(e.target)))
    .on("mouseleave", buttons, (e) => $(selector).css("background-color",""))
    .on("click", buttons, (e) => $(sheet).html(cssRules(selector, clr(e.target))));
}

$.fn.run = function(run="run"){return $(this).data(run).call()};