function loadEntries(uploadedFile){

    let title = uploadedFile.slice(0,-1).split("\nB1")[1].slice(0, 40).trim();
    $("#meetTitle").html(make("input.dynamic").val(title));
    $("td>svg").remove();
    
    let athletes = uploadedFile.slice(0,-1).split("\nD1");
    athletes.slice(1).forEach(athlete =>{

        let entries = athlete.split('\n');
        let tr = findSwimmer( new Swimmer(entries.shift())).tr;

        //console.log(findSwimmer( new Swimmer(entries.shift())));

        if (tr) {
            entries.forEach(hy3Entry =>{
                let e = parseInt(hy3Entry.slice(39, 42).trim());
                td = tr.find("td." + STROKES[EVENTS[e-1].stroke]);
                let swimOrUp = e == tdEvent(td) ? "swim" : "up";
                td.addClass(swimOrUp).html($("button.sel."+swimOrUp).html());
                console.log(td);
            });
        }
    });
    $("#entries").siblings("button").html("Entries Loaded").addClass("completed").parent().children("span").slideUp();
}

function findSwimmer(swimmer){
    for (let rosterSwimmer of ROSTER[swimmer.gender][swimmer.ag]){
        if (swimmerMatch(swimmer, rosterSwimmer)) return rosterSwimmer;
    };
    return false;
}

function tdEvent(td){
    return parseInt(td[0].classList[1].replace("event", ""));
}