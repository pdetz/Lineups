function iconPicker(i, u, icons=ICONS, css="icons"){
    return div(".b", 
        toggleButton("Regular Swims", "Swim Ups", "div.palette.icons"),
        picker(i, icons,
                (button, icon) => button.html(icon),
                el => $("td.swim").html(el.html()), "button.palette.swim", ".icons"),
        picker(u, icons.reverse(),
                (button, icon) => button.html(icon),
                el => $("td.up").html(el.html()), "button.palette.up", ".icons").hide()
    )
}

function toggleButton(html1, html2, toggledivs){
    return div(".toggle", div(".t", html1), div(".t.off", html2))
    .click(function(e){
        $("div.t").toggleClass("off");
        $(toggledivs).slideToggle();
    });
}

function colorPicker(style, selector, i, colors=COLORS, attr="background-color"){
    return picker(i, colors, 
        (button, col) => button.css(attr, col),
        el => $(style).html(selector + "{" + attr + ":" + $(el).css(attr) + "}"))
}

function picker(i, items, bFunction, pickFunction, btn="button.palette", css=""){
    return div(".palette"+css, items.map((item, it) => bFunction(make(btn + (it==i ? ".sel" : "")), item, i)))
        .on("click", btn, (e) =>  {
            pickFunction($(e.currentTarget));
            $(e.target).addClass("sel").siblings().removeClass("sel");
        }).children(btn).eq(i).click().parent();
}

function input(id, el) {
    return make("input.dynamic" + id).val($(el).html())
        .keyup( (e) => e.key === "Escape" ? e.target.blur() : $(el).html($(e.target).val())
    )
}

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

function tools(n){
    console.log($(".tool"));
    return $("div.tool").eq(n);
}

function div(css, ...contents){
    return make("div" + css).append(...contents);
}