function loadRoster(uploadedFile){
    let roster = new Roster();
    let athletes = uploadedFile.split("\nD1");

    athletes.slice(1).forEach(athlete =>{
        let athleteInfo = athlete.split("\n")[0];
        roster.addSwimmer(new Swimmer({
            gender : athleteInfo.slice(0, 1),
            apellido : upperCaseName(athleteInfo.slice(6, 26).trim()),
            nombre : upperCaseName(athleteInfo.slice(26, 46).trim()),
            nickname : upperCaseName(athleteInfo.slice(46, 66).trim()),
            id : athleteInfo.slice(66, 86).trim().replace("*", "_"),
            dob : athleteInfo.slice(86, 94).trim(),
        }));
    });
    fillLineups(roster);
    $("#entriesButton").removeClass("blocked");
    $("#rosterButton").addClass("completed");
}

function Roster(){
    this.M = [[], [], [], [], []];
    this.F = [[], [], [], [], []];
}

Roster.prototype.addSwimmer = function(swimmer){
    this[swimmer.gender][swimmer.ag].push(swimmer);
}

function Swimmer(swimmer){
    this.dob = swimmer.dob;
    this.nombre = swimmer.nombre;
    this.apellido = swimmer.apellido;
    this.preferredName = swimmer.nickname == "" ? this.nombre : swimmer.nickname;
    this.gender = swimmer.gender;
    this.id = swimmer.id.slice(-14);

    this.age = age(this.dob, "06012022");
    this.ag = Math.min(Math.max(Math.floor((this.age - 7) / 2), 0), 4);

    this.display = function(){
        return disp = this.apellido + ", " + this.preferredName + " " + this.age;
    }
}

function age(dob, date){
    let yy = parseInt(date.slice(4,8)) - parseInt(dob.slice(4,8));
    if (parseInt(date.slice(0,4)) < parseInt(dob.slice(0,4))){yy--}
    return yy;
}

function upperCaseName(name){
    return name.charAt(0).toUpperCase() + name.slice(1);
}

function compareNames(a, b){
    let apellidoA = a.apellido.toUpperCase();
    let apellidoB = b.apellido.toUpperCase();
    let nombreA = a.nombre.toUpperCase();
    let nombreB = b.nombre.toUpperCase();
    if (apellidoA < apellidoB){
        return -1;
    }
    if (apellidoA > apellidoB){
        return 1;
    }
    if(apellidoA == apellidoB){
        if (nombreA < nombreB){
            return -1;
        }
        else {
            return 1;
        }
    }
}