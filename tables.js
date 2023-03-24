function loadTables(){
    for (let i = 0; i < 5; i++){
        ["M", "F"].forEach(gender => {
            $("#flex").append(lineupTable(i, gender));
        });
    }
}

function lineupTable(ag, gender){
    let ageGroup = AGE_GROUPS[ag];

    let [table, tbody, th] = make("table#" + gender + ag + ".lineup");
    th.addTH(ageGroup.name + " " + GENDERS[gender] + "<span class = 'count'> (3)</span>")
        .addTH("IM").addTH("FR").addTH("BK").addTH("BR").addTH("FL");

    let eventNumbersRow = tbody.addTR("events").addTD("Event #s — Please learn");
    ageGroup.eventNumbers.forEach(n => {
        eventNumbersRow.addTD(egn(n, gender));
    });

    ["Swimmer 1", "Swimmer 2", "Swimmer 3"].forEach(swimmer =>{
        tbody.addTR("swimmer").addTD(swimmer).addTD().addTD().addTD().addTD().addTD();
    });
    return table;
}

function fillLineups(roster){
    $("tr.swimmer").remove();
    for (let i = 0; i < 5; i++){
        ["M", "F"].forEach(gender => {
            let table = $("#" + gender + i);
            table.find("span.count").html(" (" + roster[gender][i].length + ")");
            roster[gender][i].forEach(swimmer => {
                table.append(swimmerRow(swimmer));
            });
        });
    }
}

function swimmerRow(swimmer){
    let tr = make("tr#s" + swimmer.id + ".swimmer").addTD(swimmer.display(), "name");
    for (let i = 0; i < 5; i++){
        let e = AGE_GROUPS[swimmer.ag].eventNumbers[i];
        tr.addTD("", STROKES[i].abbr + ".event" + egn(e, swimmer.gender));
    }
    return tr;
}

function egn(n, g){
    return g === "F" ? n+1 : n;
}