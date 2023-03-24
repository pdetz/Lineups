function loadTools(){
    $("#tools").div(".editor",
        div(".tool",
            div("", "Upload your roster file first. <br> Then upload your meet entries.<br>Both files should be in the HY3 format."),
            div("", uploadButton(loadRoster, "Team Roster", "#rosterButton", "#rosterInput"), 
                    uploadButton(loadEntries, "Meet Entries", "#entriesButton.blocked", "#entriesInput"))
        ),
        div(".tool",
            div(".center", dynamicInput($("#meetTitle"), ".title"))
        ),
        new DynamicPallete("header", "th", COLORS, 5, "Choose your table header color:"),
        new DynamicPallete("row", "tr:nth-child(odd)", COLORS, 13, "Choose your row color:"),
        div(".tool", 
            toolButton(PRINT + " Print Lineups", "#printButton", window.print)
        )
    );
}

function toolButton(html, css, clickHandler){
    return make("button" + css + ".tools").append(html).handler("click", clickHandler);
}

function dynamicInput(el, css = "") {
    let dynIn = make("input" + css + ".dynamic").val(el.html());
    return dynIn.handler("keyup", function(){  el.html(dynIn.val()) });
}

function uploadButton(loadFunction, buttonLabel, buttonID, inputID) {
    return div(".uploader",
        toolButton(UPLOAD + " Upload " + buttonLabel, buttonID, function(){$(inputID).click()}),
        make("input.upload" + inputID).attr("type", "file").attr("accept", ".hy3,.HY3")
            .handler("change", function(){
                let reader = new FileReader();
                reader.readAsText($(inputID).get(0).files[0]);
                reader.onload = function(){ loadFunction(reader.result); };
            })
    );
}

function attachHandlers(){
    $("#tools")
        .activateHandler("click", "button.tools:not(.blocked)")
        .activateHandler("keyup", ".dynamic")
        .activateHandler("mouseover", "button.palette")
        .activateHandler("mouseleave", "button.palette")
        .activateHandler("change", "input.upload");
/*  
    .on("keyup", ".test", function(e) {
        e.stopImmediatePropagation();
        let input = $(this);
        input.data("stylesheet").changeColor(input.val());
    })*/

}

$.fn.activateHandler = function(ev, el) { //, func) {
    return $(this).on(ev, el, function(e) {
        e.stopImmediatePropagation();
        $(this).run(ev);
    });
}

$.fn.run = function(ev, ...args){
    return $(this).data(ev).call(...args);
}

$.fn.handler = function(handler="handler", func) {
    return $(this).data(handler, func);
}