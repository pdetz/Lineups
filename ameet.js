function AgeGroup(name, ages, eventNumbers){
    this.name = name;
    this.ages = ages;
    this.eventNumbers = eventNumbers;
}

const AGEDATE = "06012022"

const _8U = new AgeGroup("8 & Under", [4, 5, 6, 7, 8], [1, 7, 17, 29, 39]);
const _9_10 = new AgeGroup("9-10", [9, 10], [1, 9, 19, 31, 41]);
const _11_12 = new AgeGroup("11-12", [11, 12], [1, 11, 21, 33, 43]);
const _13_14 = new AgeGroup("13-14", [13, 14], [3, 13, 23, 35, 45]);
const _15_18 = new AgeGroup("15-18", [15, 16, 17, 18], [5, 15, 25, 37, 47]);
const _12U = new AgeGroup("12&U", [4, 5, 6, 7, 8, 9, 10, 11, 12]);
const _OPEN = new AgeGroup("Open", [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]);

const AGE_GROUPS = [_8U, _9_10, _11_12, _13_14, _15_18]; //, _12U, _OPEN];

const STROKES = ["IM", "FR", "BK", "BR", "FL"];

const GENDERS = {"M": "Boys", "F": "Girls"};

const EVENTS = 
[{"n":"1","gender":"M","ageGroup":5,"distance":"100M","stroke":0},{"n":"2","gender":"F","ageGroup":5,"distance":"100M","stroke":0},{"n":"3","gender":"M","ageGroup":3,"distance":"100M","stroke":0},{"n":"4","gender":"F","ageGroup":3,"distance":"100M","stroke":0},{"n":"5","gender":"M","ageGroup":4,"distance":"100M","stroke":0},{"n":"6","gender":"F","ageGroup":4,"distance":"100M","stroke":0},{"n":"7","gender":"M","ageGroup":0,"distance":"25M","stroke":1},{"n":"8","gender":"F","ageGroup":0,"distance":"25M","stroke":1},{"n":"9","gender":"M","ageGroup":1,"distance":"50M","stroke":1},{"n":"10","gender":"F","ageGroup":1,"distance":"50M","stroke":1},{"n":"11","gender":"M","ageGroup":2,"distance":"50M","stroke":1},{"n":"12","gender":"F","ageGroup":2,"distance":"50M","stroke":1},{"n":"13","gender":"M","ageGroup":3,"distance":"50M","stroke":1},{"n":"14","gender":"F","ageGroup":3,"distance":"50M","stroke":1},{"n":"15","gender":"M","ageGroup":4,"distance":"100M","stroke":1},{"n":"16","gender":"F","ageGroup":4,"distance":"100M","stroke":1},{"n":"17","gender":"M","ageGroup":0,"distance":"25M","stroke":2},{"n":"18","gender":"F","ageGroup":0,"distance":"25M","stroke":2},{"n":"19","gender":"M","ageGroup":1,"distance":"25M","stroke":2},{"n":"20","gender":"F","ageGroup":1,"distance":"25M","stroke":2},{"n":"21","gender":"M","ageGroup":2,"distance":"50M","stroke":2},{"n":"22","gender":"F","ageGroup":2,"distance":"50M","stroke":2},{"n":"23","gender":"M","ageGroup":3,"distance":"50M","stroke":2},{"n":"24","gender":"F","ageGroup":3,"distance":"50M","stroke":2},{"n":"25","gender":"M","ageGroup":4,"distance":"100M","stroke":2},{"n":"26","gender":"F","ageGroup":4,"distance":"100M","stroke":2},{"n":"27","gender":"M","ageGroup":4,"distance":"50M","stroke":5},{"n":"28","gender":"F","ageGroup":4,"distance":"50M","stroke":5},{"n":"29","gender":"M","ageGroup":0,"distance":"25M","stroke":3},{"n":"30","gender":"F","ageGroup":0,"distance":"25M","stroke":3},{"n":"31","gender":"M","ageGroup":1,"distance":"25M","stroke":3},{"n":"32","gender":"F","ageGroup":1,"distance":"25M","stroke":3},{"n":"33","gender":"M","ageGroup":2,"distance":"50M","stroke":3},{"n":"34","gender":"F","ageGroup":2,"distance":"50M","stroke":3},{"n":"35","gender":"M","ageGroup":3,"distance":"50M","stroke":3},{"n":"36","gender":"F","ageGroup":3,"distance":"50M","stroke":3},{"n":"37","gender":"M","ageGroup":4,"distance":"100M","stroke":3},{"n":"38","gender":"F","ageGroup":4,"distance":"100M","stroke":3},{"n":"39","gender":"M","ageGroup":0,"distance":"25M","stroke":4},{"n":"40","gender":"F","ageGroup":0,"distance":"25M","stroke":4},{"n":"41","gender":"M","ageGroup":1,"distance":"25M","stroke":4},{"n":"42","gender":"F","ageGroup":1,"distance":"25M","stroke":4},{"n":"43","gender":"M","ageGroup":2,"distance":"50M","stroke":4},{"n":"44","gender":"F","ageGroup":2,"distance":"50M","stroke":4},{"n":"45","gender":"M","ageGroup":3,"distance":"50M","stroke":4},{"n":"46","gender":"F","ageGroup":3,"distance":"50M","stroke":4},{"n":"47","gender":"M","ageGroup":4,"distance":"50M","stroke":4},{"n":"48","gender":"F","ageGroup":4,"distance":"50M","stroke":4},{"n":"49","gender":"M","ageGroup":1,"distance":"175M","stroke":5},{"n":"50","gender":"F","ageGroup":1,"distance":"175M","stroke":5}];