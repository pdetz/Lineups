function Bind(ev, selector, css, func, parent, ...args){
    this.ev = ev;
    this.selector = selector;
    this.parent = parent;
    this.args = args;

    this.upDater = function(parent, args){ 
        return make(selector + css).store(parent, args)
    };

    this.parent[ev] = function(args){
        return func(parent, args);
    }

    if (HANDLERS.indexOf(ev + selector) == -1){
        HANDLERS.push(ev + selector);
        $("#tools").on(ev, selector, function(e) {
            e.stopImmediatePropagation();
            let [parent, ...args] = $(this).read();
            parent[ev](args);
        });
    }
    return this.upDater;//, this.update];
}

function dynamicTool(parent, element, args){
    return make(element).store(parent, args);
}

function DynamicInput(element, css="", directions="") {
    this.element = $(element);

    this.newInput = new Bind("keyup", "input.dynamic", css, function(parent){
            parent.element.html(parent.input.val());
    }, this);

    this.input = this.newInput(this).val(this.element.html());

    return tool(this.input, directions);
}

function DynamicUpload(loadFunction, buttonLabel, buttonID, inputID, directions=""){
    this.loadFunction = loadFunction;

    this.newInput = new Bind("change", "input.upload", inputID, function(parent){
        let reader = new FileReader();
        reader.readAsText(parent.input.get(0).files[0]);
        reader.onload = function(){ 
            parent.loadFunction(reader.result); };
    }, this);

    this.newButton = new Bind("click", "button.tools", buttonID, function(parent){
        parent.input.click();
    }, this);

    this.input = this.newInput(this).attr("type", "file").attr("accept", ".hy3,.HY3");
    this.button = this.newButton(this).html(UPLOAD + " Upload " + buttonLabel);

    this.tool = tool([this.input, this.button], directions);
    
    return this.tool;
}

$.fn.read = function(){return $(this).data("args")};
$.fn.store = function(...args){ return $(this).data("args", [...args])};

function tool(tools, directions="", wrap=".center"){
    return div(".tool", div(".directions", directions), div(wrap, tools));
}