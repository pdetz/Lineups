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
    $("#roster").siblings("button").addClass("completed").html("Roster Loaded")
        .siblings("span").slideUp();
    $("#entries").parent().slideDown();
}

function Roster(){
    this.M = [[], [], [], [], []];
    this.F = [[], [], [], [], []];
    this.addSwimmer = (swimmer) => this[swimmer.gender][swimmer.ag].push(swimmer);
}

function Swimmer(swimmer){
    this.dob = swimmer.dob;
    this.nombre = swimmer.nombre;
    this.apellido = swimmer.apellido;
    this.preferredName = swimmer.nickname == "" ? this.nombre : swimmer.nickname;
    this.gender = swimmer.gender;
    this.id = swimmer.id.slice(-14);
    this.age = age(this.dob, "06012022");
    this.display = disp = this.apellido + ", " + this.preferredName + " " + this.age;
    this.ag = Math.min(Math.max(Math.floor((this.age - 7) / 2), 0), 4);
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
    let [apellidoA, apellidoB] = [a, b].map(n => n.apellido.toUpperCase());
    let [nombreA, nombreB] = [a, b].map(n => n.nombre.toUpperCase());
    return apellidoA < apellidoB ? -1 : apellidoA > apellidoB ? 1 : nombreA < nombreB ? -1 : 1;
}