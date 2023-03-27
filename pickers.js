function iconPicker(i, u, icons=ICONS, css=""){
    return div(".b", 
        toggleButton("Regular Swims", "Swim Ups", "div.palette.icons"+css),
        picker(i, icons,
                (button, icon) => button.html(icon),
                el => $("td.swim").html(el.html()), "button.palette.swim", ".icons"+css),
        picker(u, icons,
                (button, icon) => button.html(icon),
                button => $("td.up").html(button.html()), "button.palette.up", ".icons"+css).hide()
    )
}

function colorPicker(selector, i, colors=COLORS, attr="background-color"){
    return picker(i, colors, 
        (button, col) => button.css(attr, col),
        button => $(selector).css(attr, button.css(attr)))
}

function picker(i, items, buttons, pickFunction, btn="button.palette", css=""){
    return  div(".palette"+css, 
                items.map(item => buttons(make(btn), item)))
            .on("click", btn, (e) =>  {
                pickFunction($(e.currentTarget));
                $(e.target).addClass("sel").siblings().removeClass("sel");
            }).children(btn).eq(i).click().parent();
}

function toggleButton(html1, html2, toggledivs){
    return div(".toggle", div(".t", html1), div(".t.off", html2))
    .click(function(e){
        $("div.t").toggleClass("off");
        $(toggledivs).slideToggle();
    });
}