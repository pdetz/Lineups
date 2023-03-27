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
    console.log(name);
    return name.charAt(0).toUpperCase() + name.slice(1);
}

function swimmerMatch(s1, s2){
    return s1.display == s2.display || s1.id == s2.id;
}

function compareNames(a, b){
    let [apellidoA, apellidoB] = [a, b].map(n => n.apellido.toUpperCase());
    let [nombreA, nombreB] = [a, b].map(n => n.nombre.toUpperCase());
    return apellidoA < apellidoB ? -1 : apellidoA > apellidoB ? 1 : nombreA < nombreB ? -1 : 1;
}