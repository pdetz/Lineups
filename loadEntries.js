function loadEntries(uploadedFile){
    let title = uploadedFile.slice(0,-1).split("\nB1")[1].slice(0, 40).trim();
    $("#meetTitle").html(title);
    $("#titleInput").val(title);
    $("td>svg").remove();
    
    let athletes = uploadedFile.slice(0,-1).split("\nD1");
    athletes.slice(1).forEach(athlete =>{

        let entries = athlete.split('\n');
        let id = entries.shift().slice(67, 81).trim().replace("*", "_");
        let tr = $("#s" + id);

        entries.forEach(hy3Entry =>{
            let e = parseInt(hy3Entry.slice(39, 41).trim());
            //if (e is an event number found in the athlete's age groups events array)
            td = tr.find("td." + STROKES[EVENTS[e-1].stroke]);
            td.append(e == tdEvent(td) ? BOLT : STAR);
        });
    });
    $("#entriesButton").addClass("completed");
}

function tdEvent(td){
    return parseInt(td[0].classList[1].replace("event", ""));
}