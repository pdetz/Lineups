function loadEntries(uploadedFile){
    let title = uploadedFile.slice(0,-1).split("\nB1")[1].slice(0, 40).trim();
    $("#meetTitle").html(title);
    $("input.title").val(title);
    $("td>svg").remove();
    
    let athletes = uploadedFile.slice(0,-1).split("\nD1");
    athletes.slice(1).forEach(athlete =>{

        let entries = athlete.split('\n');
        let id = entries.shift().slice(67, 81).trim().replace("*", "_");
        let tr = $("#s" + id);

        entries.forEach(hy3Entry =>{
            let e = parseInt(hy3Entry.slice(39, 41).trim());


            //if (e is an event number found in the athlete's age groups events array)
            let td = tr.find("td." + STROKES[EVENTS[e-1].stroke].abbr);
            if (td.length > 0) {
                if (e == tdEvent(td)){
                    td.append(BOLT);
                } else {
                    td.append(STAR);
                }
            } else {
                console.log(id, e);
                console.log(EVENTS[e-1]);
                console.log(hy3Entry);
            }
//          let t = parseFloat(hy3Entry.slice(44, 51).trim());
        });
    });
    $("#entriesButton").addClass("completed");
}

function tdEvent(td){
    let number = parseInt(td[0].classList[1].replace("event", ""));
    return number;
}