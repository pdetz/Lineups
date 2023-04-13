function uploadFile(html, loadFunction, id){
    return div(".upload", button(html, function(){$(id).click()}),
    make("input.upload" + id).attr("type", "file").attr("accept", ".hy3,.HY3")
        .on("change", function(e){
            let reader = new FileReader();
            reader.readAsText($(id).get(0).files[0]);
            reader.onload = function() { loadFunction(reader.result)};
        }));
}

function printButton(){
    return button(PRINT + " Print Lineups", () => window.print())
}

function button(html, handler) {
    return make("button.tools").html(html)
        .click(handler)
}

function tool(text, ...tools){
    return div(".tool", make("span").append(text), ...tools)
}

function div(css, ...contents){
    return make("div" + css).append(...contents);
}