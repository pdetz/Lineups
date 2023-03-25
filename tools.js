function iconPicker(i, u, icons=ICONS){
    let swim = picker(i, icons,
                (button, icon) => button.html(icon),
                el => $("td.swim").html(el.html()), "button.palette.swim");
    let up = picker(u, icons.reverse(),
                (button, icon) => button.html(icon),
                el => $("td.up").html(el.html()), "button.palette.up").hide();
    toggle = toggleButtons("Regular", "Swim Up", swim, up);

    return [toggle, div(".b", swim, up)]
}

function toggleButtons(html1, html2, el1, el2){
    return div(".toggle", 
    make("button.tools.toggle").html(html1),
    make("button.tools.toggle.off").html(html2))
    .click(function(e){
        $("button.toggle").toggleClass("off");
        el1.slideToggle(); el2.slideToggle();
    });
}

function colorPicker(style, selector, i, colors=COLORS, attr="background-color"){
    let stylesheet = $("#" + selector);
    return picker(i, colors, 
        (button, col) => button.css(attr, col),
        el => $(style).html(selector + "{" + attr + ":" + $(el).css(attr) + "}"))
}

function picker(i, items, bFunction, pickFunction, btn="button.palette"){
    return div(".palette", items.map((item, it) => bFunction(make(btn + (it==i ? ".sel" : "")), item, i)))
        .on("click", btn, (e) =>  {
            pickFunction($(e.currentTarget));
            $(e.target).addClass("sel").siblings().removeClass("sel");
        });
}

function input(id, el) {
    return make("input.dynamic" + id).val($(el).html())
        .keyup( (e) => e.key === "Escape" ? e.target.blur() : $(el).html($(e.target).val())
    )
}

function uploadFile(html, loadFunction, id){
    return div("flex", upload = make("input.upload" + id).attr("type", "file").attr("accept", ".hy3,.HY3")
        .on("change", function(e){
            let reader = new FileReader();
            reader.readAsText($(id).get(0).files[0]);
            reader.onload = function() { loadFunction(reader.result)};
        }),
        button(html, function(){$(id).click()}));
}

function printButton(){
    return button(PRINT + "Print Lineups", () => window.print())
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