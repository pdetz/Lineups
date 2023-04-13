function Roster(groups){
    this.groups = groups.map(group => {
        return {...group, swimmers: []};
    });
    this.addSwimmer = (swimmer) => {
        let currentSwimmers = this.groups[swimmer.ag].swimmers;
        let foundSwimmer = currentSwimmers.find(s => swimmerMatch(s, swimmer));
        if (foundSwimmer){
            if (swimmer.entries.length > 0) foundSwimmer.entries = [...swimmer.entries];
        } else {
            currentSwimmers.push(swimmer);
        }
    }
    this.alphabetize = () => {
        this.groups.forEach(group => group.swimmers.sort(compareNames));
        return this;
    }
}

function Swimmer(hy3Data){
    let data = hy3Data.split("\n");
    let athleteInfo = data.shift();;

    this.gender = athleteInfo.slice(0, 1);
    this.dob = athleteInfo.slice(86, 94).trim();
    this.age = age(this.dob, AGEDATE);
    this.apellido = uc(athleteInfo.slice(6, 26).trim());
    this.nombre = uc(athleteInfo.slice(26, 46).trim());
    this.display = this.apellido + ", " + uc(athleteInfo.slice(26, 66).trim().split(/\s+/).slice(-1)[0]) + " " + this.age;
    this.ag = 2 * Math.min(Math.max(Math.floor((this.age - 7) / 2), 0), 4) + (this.gender == 'F' ? 1 : 0);
    this.id = parseInt(athleteInfo.slice(66, 86).trim());
    this.key = this.nombre + this.apellido + this.dob;
    
    this.entries = data.filter(line => line.startsWith("E1")).map(
        entry => new Entry(parseInt(entry.slice(39, 42).trim()), parseFloat(entry.slice(53, 59).trim()))
    );
}

function Entry(event, time){
    this.event = event;
    this.time = time;
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
    return s1.key == s2.key;
}

function compareNames(a, b){
    let [apellidoA, apellidoB] = [a, b].map(n => n.apellido.toUpperCase());
    let [nombreA, nombreB] = [a, b].map(n => n.nombre.toUpperCase());
    return apellidoA < apellidoB ? -1 : apellidoA > apellidoB ? 1 : nombreA < nombreB ? -1 : 1;
}

function demoRoster(groups){
    let roster = new Roster(groups);
    let dob = [...DOB];
    let names = [...NAMES];
    names.sort(compareNames);

    names.forEach(s => {
        const d = dob.splice(Math.floor(Math.random() * dob.length), 1)[0]; // remove the chosen dob from the array
        const a = age(d, AGEDATE);
        const ag = 2 * Math.min(Math.max(Math.floor((a - 7) / 2), 0), 4) + (s.gender == 'F' ? 1 : 0);
        const currentAG = roster.groups[ag];

        let entries = [];
        let n = currentAG.swimmers.length;

        if (n == 0 || n == 2) entries = [0, 2, 4].map(i => new Entry(currentAG.eventNumbers[i], 60));
        if (n == 1) entries = [1, 3].map(i => new Entry(currentAG.eventNumbers[i], 60));
        if (ag < 8){
            if (n == 3 || n == 5) entries = [1, 3].map(i => new Entry(currentAG.eventNumbers[i] + 2, 60));
            if (n == 4) entries = [0, 2, 4].map(i => new Entry(currentAG.eventNumbers[i] + 2, 60));
        }

        roster.addSwimmer({
            gender: s.gender,
            dob: d,
            age: a,
            apellido: s.apellido,
            nombre: s.nombre,
            display: s.apellido + ", " + s.nombre + " " + a,
            ag: ag,
            key: s.nombre + s.apellido + d,
            entries: entries
        });
    });
    return roster;
}