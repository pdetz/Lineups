function loadTables(){
    $("#lineups").append([].concat(...AGE_GROUPS.map(ag => ["M", "F"].map(g => lineupTable(ag, g)))));
}

function lineupTable(ageGroup, gender){
    let [table, tbody, th] = make("table.lineup#" + gender + AGE_GROUPS.indexOf(ageGroup));
    th.addTH(ageGroup.name + " " + GENDERS[gender] + "<span class = 'count'> (3)</span>")
        .append(STROKES.map(stroke => make("th").html(stroke)));

    tbody.addTR("events").addTD("Event #s — Please learn")
        .append(ageGroup.eventNumbers.map(n => make("td").html(egn(n, gender))));
    tbody.addTR("swimmer").addTD("Regular age group swims are").addTD("", "swim").addTD("").addTD("").addTD("").addTD("")
    tbody.addTR("swimmer").addTD("marked with these emojis").addTD("").addTD("", "swim").addTD("").addTD("").addTD("")
    tbody.addTR("swimmer").addTD("Swim ups are marked", "indent").addTD("").addTD("").addTD("", "up").addTD("").addTD("");
    tbody.addTR("swimmer").addTD("with these emojis", "indent").addTD("").addTD("").addTD("").addTD("", "up").addTD("");
    tbody.addTR("swimmer").addTD("Good luck at the meet!").addTD("", "swim").addTD("", "up").addTD("", "swim").addTD("", "up").addTD("", "swim");
    
    return table;
}

function fillLineups(roster){
    $("tr.swimmer").remove();
    ["M", "F"].forEach(gender => {
        roster[gender].forEach((group, i) => {
            $("#" + gender + i)
                .append(group.map(swimmer => swimmerRow(swimmer)))
                .find("span.count").html(" (" + group.length + ")");
        });
    });
}

function swimmerRow(swimmer){
    swimmer.tr = make("tr#s" + swimmer.id + ".swimmer").addTD(swimmer.display, "name")
        .append(STROKES.map((stroke, i) => {
            let e = AGE_GROUPS[swimmer.ag].eventNumbers[i];
            return make("td." + stroke + ".event" + egn(e, swimmer.gender));
        }));
    return swimmer.tr;
}

function egn(n, g){
    return g === "F" ? n+1 : n;
}