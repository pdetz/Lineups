function lineupTable(ageGroup, gender){
    let [table, tbody, th] = make("table.lineup#" + gender + AGE_GROUPS.indexOf(ageGroup));
    th.addTD(ageGroup.name + " " + GENDERS[gender] + "<span class = 'count'> (3)</span>")
        .append(STROKES.map(stroke => make("td").html(stroke)));

    tbody.addTR("events").addTD("Event #s — Please learn", "right")
        .append(ageGroup.eventNumbers.map(n => make("td").html(egn(n, gender))));
    tbody.addTR("swimmer").addTD("Regular age group swims are =>", "right").addTD("").addTD("", "swim").addTD("").addTD("", "swim").addTD("");
    tbody.addTR("swimmer").addTD("marked with these emojis =>", "right").addTD("", "swim").addTD("").addTD("", "swim").addTD("").addTD("", "swim");
    tbody.addTR("swimmer").addTD("<div>Good luck at the meet!</div>", "secret").addTD("").addTD("").addTD("").addTD("").addTD("");
    tbody.addTR("swimmer").addTD("Swim ups are marked =>", "right").addTD("").addTD("", "up").addTD("").addTD("", "up").addTD("");
    tbody.addTR("swimmer").addTD("with these emojis =>", "right").addTD("", "up").addTD("").addTD("", "up").addTD("").addTD("", "up");
    //tbody.addTR("swimmer").addTD("Good luck at the meet!").addTD("", "swim").addTD("", "up").addTD("", "swim").addTD("", "up").addTD("", "swim");
    
    return table;
}

function loadRoster(uploadedFile){
    ROSTER = new Roster();
    let athletes = uploadedFile.split("\nD1");

    athletes.slice(1).forEach(
        athlete => ROSTER.addSwimmer(new Swimmer(athlete.split("\n")[0]))
    );
    fillLineups(ROSTER);
    $("#roster").siblings("button").addClass("completed").html("Roster Loaded")
        .siblings("span").slideUp();
    $("#entries").parent().slideDown();
}

function fillLineups(roster){
    $("tr.swimmer").remove();
    ["M", "F"].forEach(gender => {
        roster[gender].forEach((group, i) => {
            $("#" + gender + i)
                .append(group.map(swimmer => 
                    swimmer.tr = make("tr#s" + swimmer.id + ".swimmer").addTD(swimmer.display, "name")
                    .append(STROKES.map((stroke, i) => {
                        let e = AGE_GROUPS[swimmer.ag].eventNumbers[i];
                        return make("td." + stroke + ".event" + egn(e, swimmer.gender));
                    return swimmer.tr;
                }))))
                .find("span.count").html(" (" + group.length + ")");
        });
    });
}

function egn(n, g){
    return g === "F" ? n+1 : n;
}

function Roster(){
    this.M = [[], [], [], [], []];
    this.F = [[], [], [], [], []];
    this.addSwimmer = (swimmer) => this[swimmer.gender][swimmer.ag].push(swimmer);
}

function Swimmer(athleteInfo){
    this.gender = athleteInfo.slice(0, 1);
    this.dob = athleteInfo.slice(86, 94).trim();
    this.age = age(this.dob, AGEDATE);
    this.display = uc(athleteInfo.slice(6, 26).trim()) + ", " + uc(athleteInfo.slice(26, 66).trim().split(/\s+/).slice(-1)[0]) + " " + this.age;
    this.ag = Math.min(Math.max(Math.floor((this.age - 7) / 2), 0), 4);
    this.id = parseInt(athleteInfo.slice(66, 86).trim());
    this.tr;
}

function age(dob, date){
    let yy = parseInt(date.slice(4,8)) - parseInt(dob.slice(4,8));
    if (parseInt(date.slice(0,4)) < parseInt(dob.slice(0,4))){yy--}
    return yy;
}

function uc(name){
    return name.charAt(0).toUpperCase() + name.slice(1);
}

function swimmerMatch(s1, s2){
    return s1.display == s2.display;
}

function compareNames(a, b){
    let [apellidoA, apellidoB] = [a, b].map(n => n.apellido.toUpperCase());
    let [nombreA, nombreB] = [a, b].map(n => n.nombre.toUpperCase());
    return apellidoA < apellidoB ? -1 : apellidoA > apellidoB ? 1 : nombreA < nombreB ? -1 : 1;
}